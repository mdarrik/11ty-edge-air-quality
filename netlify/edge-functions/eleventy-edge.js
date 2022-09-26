import {
  EleventyEdge,
  precompiledAppData,
} from "./_generated/eleventy-edge-app.js";
export default async (request, context) => {
  try {
    const geocodeUrl = new URL("https://geocode.maps.co/search");
    geocodeUrl.searchParams.append("city", context.geo.city);
    geocodeUrl.searchParams.append("country", context.geo.country.code);
    if (context.geo.subdivision?.code) {
      geocodeUrl.searchParams.append("state", context.geo.subdivision.code);
    }
    const geocodedData = await fetch(geocodeUrl).then((res) => res.json());
    const { lat, lon: long } = geocodedData?.[0];
    const aqiUrl = new URL(
      `https://api.waqi.info/feed/geo:${lat};${long}/?token=${Deno.env.get(
        "AQICN_TOKEN"
      )}`
    );
    const aqiData = await fetch(aqiUrl).then((res) => res.json());

    let edge = new EleventyEdge("edge", {
      request,
      context,
      precompiled: precompiledAppData,

      // default is [], add more keys to opt-in e.g. ["appearance", "username"]
      cookies: [],
    });

    edge.config((eleventyConfig) => {
      // Add some custom Edge-specific configuration
      // e.g. Fancier json output
      eleventyConfig.addFilter("json", obj => JSON.stringify(obj, null, 2));
      eleventyConfig.addGlobalData("localAqi", aqiData);
      eleventyConfig.addFilter("getAqiColor", getAqiColor);
    });

    return await edge.handleResponse();
  } catch (e) {
    console.error("ERROR", { e });
    return context.next(e);
  }
};

function getAqiColor(aqi) {
  if (aqi <= 50) {
    return "green";
  } else if (aqi <= 100) {
    return "yellow";
  } else if (aqi <= 150) {
    return "orange";
  } else if (aqi <= 200) {
    return "red";
  } else if (aqi <= 300) {
    return "purple";
  } else {
    return "maroon";
  }
}
