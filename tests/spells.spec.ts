import { describe, test, expect } from "vitest";
import { findSpell } from "../src/modi/spells.js";

describe("Spells", () => {
  test("Sin argumentos", () => {
    return findSpell()
    .then((data) => {
      expect(data).toBeDefined();
      expect(data.body).toBeDefined();
      expect(data.body.length).toBeGreaterThan(0);
      expect(data.body[0].id).toBe('fbd3cb46-c174-4843-a07e-fd83545dce58');
    })
  });

  test("Primer argumento", () => {
    return findSpell("Opening Charm", undefined, undefined)
    .then((data) => {
      expect(data).toBeDefined();
      expect(data.body).toBeDefined();
      expect(data.body[0].id).toBe('fbd3cb46-c174-4843-a07e-fd83545dce58');
      expect(data.body[0].name).toBe('Opening Charm');
    })
  });

  test("Segundo argumento", () => {
    return findSpell(undefined, "Spell", undefined)
    .then((data) => {
      expect(data).toBeDefined();
      expect(data.body).toBeDefined();
      expect(data.body.length).toBe(4);
    })
  });

  test("Tercer argumento", () => {
    return findSpell(undefined, undefined, "Anteoculatia")
    .then((data) => {
      expect(data).toBeDefined();
      expect(data.body).toBeDefined();
      expect(data.body[0].id).toBe('0a11bbf5-702c-45ab-bdd6-20debf00ed39');
    })
  });

  test("Todos los argumentos", () => {
    return findSpell("Anteoculatia", "DarkCharm", "Anteoculatia")
    .then((data) => {
      expect(data).toBeDefined();
      expect(data.body).toBeDefined();
      expect(data.body[0].id).toBe('0a11bbf5-702c-45ab-bdd6-20debf00ed39');
    })
  });

  test("Argumentos erroneos", () => {
    return findSpell(undefined, undefined, "loquesea").catch((err) => {
      expect(err).to.be.equal("Spells API error: no spell found");
    });
  });
});