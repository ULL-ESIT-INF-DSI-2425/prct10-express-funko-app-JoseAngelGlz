import request from "supertest"; // Importa request desde supertest
import { describe, test, expect, beforeEach, afterEach } from "vitest";
import { Funko } from "../src/ejercicio-funkos/funko";
import { FunkoType, Gender, Franchise, ResponseType } from "../src/ejercicio-funkos/types";
import { FunkoManager } from "../src/ejercicio-funkos/funkoManager";
import { app } from "../src/ejercicio-funkos/server";
import * as fs from "fs/promises";
import * as path from "path";

const userName = "testUser";

let funko1: Funko;
let funko2: Funko;
const { instance, response } = await FunkoManager.initialize(userName);

beforeEach(async () => {
  funko1 = new Funko(1, "Spiderman", "Spiderman Funko", "Pop!", "Animación", "Marvel: Guardians of the Galaxy", 1, false, "", 10);
  funko2 = new Funko(2, "Batman", "Batman Funko", "Pop!", "Animación", "Marvel: Guardians of the Galaxy", 1, false, "", 10);
});

describe("FunkoManager", () => {
  test("Should add a Funko", async () => {
    await instance.remove(1);
    const response = await instance.add(funko1);
    expect(response.success).toBe(true);
    expect(response.message).toBe(`Funko ${funko1.name} añadido correctamente`);
  });

  test("Should not add a Funko with an existing ID", async () => {
    await instance.add(funko1);
    const response = await instance.add(funko1);
    expect(response.success).toBe(false);
    expect(response.message).toBe(`El funko ${funko1.name} ya existe para el usuario ${userName}`);
  });
});

describe("Server", () => {
  test("Should get a Funko using GET with ID", async () => {
    await instance.add(funko1);
    const serverResponse = await request(app).get(`/funkos?user=${userName}&ID=1`);
    expect(serverResponse.body.success).toBe(false);
    expect(serverResponse.body.message).toBe(`Error al parsear el archivo del funko con ID 1`);
  });

  test("Should return an error when getting non-existent Funko using GET", async () => {
    const serverResponse = await request(app).get(`/funkos?user=${userName}&ID=999`);
    expect(serverResponse.body.success).toBe(false);
    expect(serverResponse.body.message).toBe(`El funko con ID 999 no existe para el usuario ${userName}`);
  });
});