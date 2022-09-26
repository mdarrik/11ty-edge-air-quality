const { EleventyEdgePlugin } = require("@11ty/eleventy");

/**
 * @typedef {import('@11ty/eleventy/src/UserConfig')} EleventyConfig
 * @typedef {ReturnType<import('@11ty/eleventy/src/defaultConfig')>} EleventyReturnValue
 * @type {(eleventyConfig: EleventyConfig) => EleventyReturnValue}
 */
module.exports = function (eleventyConfig) {
  eleventyConfig.addGlobalData("layout", "layout.njk");
  eleventyConfig.addWatchTarget("./src/css/");
  eleventyConfig.addPlugin(EleventyEdgePlugin);
  return {
    markdownTemplateEngine: "njk",
    dir: {
      input: "src",
      output: "_site",
    },
  };
};
