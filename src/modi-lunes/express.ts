import express from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { readNote } from "./notes.js";

const app = express();

const __dirname = join(dirname(fileURLToPath(import.meta.url)), '../public');
app.use(express.static(__dirname));

app.get('', (_, res) => {
  res.send('<h1>My application</h1>');
});

app.get('', (_, res) => {
  res.send('<h1>My application</h1>');
});

app.get("/notes", async (req, res) => {
  try {
    const data = await readNote(req.query.title as string);
    res.send({
      notes: data.notes,
    });
  } catch (err) {
    res.send({
      error: `Error reading note: ${(err as Error).message}`,
    });
  }
});

app.get('/info', (_, res) => {
  res.send('Information');
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});