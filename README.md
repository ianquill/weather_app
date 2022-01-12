# Todo
CURRENTLY: getting location to carry over from geocoding. going to have to reverse geocode the browser's geolocation as well

[x] - parse search input
    [x] - updates existing fields, doesn't create new ones unless they don't currently exist
        [x] - fetch icons from weather data
    [ ] - if manually entered, use location name from geocodio instead of from weather API
    [ ] - if found automatically, reverse geocode to get a location name
[x] - switch to one-call API?
    [x] - get location via location API 
    [x] - geocodio API convert to lat lon
    [ ] - hourly and daily fields
[ ] - add AQI API call
[ ] - animate color change of background for weather changes?
[x] - front end design
    [ ] - implement css
[ ] - build proper timeline, start with search bar, wait until everything is loaded before presenting it to the user