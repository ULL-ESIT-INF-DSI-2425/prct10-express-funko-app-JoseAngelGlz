import { describe, test, expect } from "vitest";
import { coordinatesInfoPromises } from "../src/promises_test.js";

describe("Asynchronous function coordinatesInfoPromises", () => {
  test("coordinatesInfoPromises should get weather information", () => {
    return coordinatesInfoPromises("Tenerife, Spain").then((data) => {
      expect(data.body.features[0].geometry.coordinates).to.be.eql([
        -13.670858, 28.920507,
      ]);
    });
  });

  test("weatherInfoPromises should provide an error", () => {
    return coordinatesInfoPromises("12wherever").catch((err) => {
      expect(err).to.be.equal("Mapbox API error: no location found");
    });
  });
});