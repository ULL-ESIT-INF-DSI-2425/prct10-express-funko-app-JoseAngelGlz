import { describe, test, expect, vi, beforeEach } from "vitest";
import fs from "fs/promises";
import { readNote } from "../src/modi-lunes/notes.js";
import { Note } from "../src/modi-lunes/types.js";



describe("readNote", () => {
  test("should read a note successfully", async () => {
    const mockData = JSON.stringify([
      { title: "Test Note", content: "This is a test note." },
    ]);
    vi.spyOn(fs, "readFile").mockResolvedValue(mockData);

    const result = await readNote("Test Note");

    expect(result).toEqual({
      type: "read",
      success: true,
      notes: [{ title: "Test Note", content: "This is a test note." }],
    });
  });

  test("should return an error when the note is not found", async () => {
    const mockData = JSON.stringify([
      { title: "Another Note", content: "This is another note." },
    ]);
    vi.spyOn(fs, "readFile").mockResolvedValue(mockData);

    const result = await readNote("Nonexistent Note");

    expect(result).toEqual({
      type: "read",
      success: false,
      notes: undefined,
    });
  });
});