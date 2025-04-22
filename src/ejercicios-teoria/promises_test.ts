import request from "request";

export const coordinatesInfoPromises = (location: string) => {
  const url = `http://api.mapbox.com/search/geocode/v6/forward?q=${encodeURIComponent(location)}&access_token=pk.eyJ1Ijoiam9zZWFuZ2VsZ2x6IiwiYSI6ImNtOXJmdHU5dDFtdGkyb3M5cWR2eWFiMXQifQ.mcNM_0Dyxdl4UFyp1_tmcQ&limit=1`;
  return new Promise<request.Response>((resolve, reject) => {
    request(
      { url: url, json: true },
      (error: Error, response: request.Response) => {
        if (error) {
          reject(error.message);
        } else if (response.body.features.length === 0) {
          reject("Mapbox API error: no location found");
        } else {
          resolve(response);
        }
      },
    );
  });
};