import request from "request";

export const coordinatesInfo = (
  location: string,
  callback: (
    err: string | undefined,
    data: request.Response | undefined,
  ) => void,
) => {
  const url = `http://api.mapbox.com/search/geocode/v6/forward?q=${encodeURIComponent(location)}&access_token=pk.eyJ1Ijoiam9zZWFuZ2VsZ2x6IiwiYSI6ImNtOXJmdHU5dDFtdGkyb3M5cWR2eWFiMXQifQ.mcNM_0Dyxdl4UFyp1_tmcQ&limit=1`;

  request({ url: url, json: true }, (error: Error, response) => {
    if (error) {
      callback(`Mapbox API is not available: ${error.message}`, undefined);
    } else if (response.body.features.length === 0) {
      callback(`Mapbox API error: no location found`, undefined);
    } else {
      callback(undefined, response);
    }
  });
};

export const weatherInfo = (
  location: string,
  callback: (
    err: string | undefined,
    data: request.Response | undefined,
  ) => void,
) => {
  const url = `http://api.weatherstack.com/current?access_key=d567721a8efa495822d4c38ea0912133&query=${encodeURIComponent(location)}&units=m`;

  request({ url: url, json: true }, (error: Error, response) => {
    if (error) {
      callback(
        `Weatherstack API is not available: ${error.message}`,
        undefined,
      );
    } else if (response.body.error) {
      callback(
        `Weatherstack API error: ${response.body.error.type}`,
        undefined,
      );
    } else {
      callback(undefined, response);
    }
  });
};

coordinatesInfo(process.argv[2], (coordErr, coordData) => {
  if (coordErr) {
    console.log(coordErr);
  } else if (coordData) {
    const longitude: number =
      coordData.body.features[0].geometry.coordinates[0];
    const latitude: number = coordData.body.features[0].geometry.coordinates[1];
    weatherInfo(`${latitude},${longitude}`, (weatherErr, weatherData) => {
      if (weatherErr) {
        console.log(weatherErr);
      } else if (weatherData) {
        console.log(
          `Currently, the temperature is ` +
            `${weatherData.body.current.temperature} degrees in ` +
            `${weatherData.body.location.name}`,
        );
      }
    });
  }
});