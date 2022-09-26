# 11ty-edge-air-quality

Gets your local air quality data using 11ty edge rendering. 

## Functional Overview

- Uses 11ty on top of Netlify's edge functions for building/rendering pages. 
- Only uses the location provided to Netlify's edge handlers (city, country, state/region) to create a rough latitutde and longitude via [Map Maker's geocode api](https://geocode.maps.co/). 
- Uses the [World Air Quality Index Project](https://waqi.info) to get your local Air Quality data.
