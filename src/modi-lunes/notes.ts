import fs from "fs/promises";
import { Note, ResponseType } from "./types.js";

export const readNote = async (title: string): Promise<ResponseType> => {
  try {
    const data = await loadNotes();
    const notes: Note[] = JSON.parse(data);
    const foundNote = notes.find((note) => note.title === title);

    return {
      type: "read",
      success: foundNote ? true : false,
      notes: foundNote ? [foundNote] : undefined,
    };
  } catch (err) {
    throw new Error(`Error reading note: ${(err as Error).message}`);
  }
};

const loadNotes = async (): Promise<string> => {
  try {
    const data = await fs.readFile("public/notes/notes.json", "utf-8");
    return data;
  } catch (err) {
    throw new Error(`Error reading notes file: ${(err as Error).message}`);
  }
};