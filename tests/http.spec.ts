import { describe, expect, test } from "vitest";
import { coordinatesInfo, weatherInfo } from "../src/http.js";

describe("Asynchronous function weatherInfo tests", () => {
  test("weatherInfo should get weather information", () =>
    new Promise<void>((done) => {
      weatherInfo("Tenerife, Spain", (_, data) => {
        if (data) {
          expect(data.body.location.name).to.be.equal("Tenerife");
          done();
        }
      });
    }));

  test("weatherInfo should provide an error", () =>
    new Promise<void>((done) => {
      weatherInfo("12wherever", (error) => {
        if (error) {
          expect(error).to.be.equal("Weatherstack API error: request_failed");
          done();
        }
      });
    }));
});

describe("Asynchronous function coordinatesInfo tests", () => {
  test("coordinatesInfo should get coordinates information", () =>
    new Promise<void>((done) => {
      coordinatesInfo("Tenerife, Spain", (_, data) => {
        if (data) {
          expect(data.body.features[0].geometry.coordinates).to.be.eql([-13.670858, 28.920507]);
          done();
        }
      });
    }));

  test("coordinatesInfo should provide an error", () =>
    new Promise<void>((done) => {
      coordinatesInfo("12wherever", (error) => {
        if (error) {
          expect(error).to.be.equal("Mapbox API error: no location found");
          done();
        }
      });
    }));
});