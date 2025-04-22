import express from 'express';
import { Funko } from './funko.js';
import { FunkoManager } from './funkoManager.js';

const app = express();
const port = 3000;
app.use(express.json());

// Ruta principal
app.get("/", (req, res) => {
  res.json({ message: "Bienvenido a la API de Funkos" });
});

// Obtener todos los funkos o un funko específico
app.get("/funkos", async (req, res) => {
  const userName = req.query.user as string;
  const { instance, response } = await FunkoManager.initialize(userName);
  if (!req.query.ID) {
    const serverResponse = await instance.printAll();
    res.json(serverResponse);
  } else {
    const funkoID = Number(req.query.ID);
    const serverResponse = await instance.print(funkoID);
    res.json(serverResponse);
  }
});
// Añadir un nuevo funko
app.post("/funkos", async (req, res) => {
  const userName = req.query.user as string;
  const funko = req.body as Funko;
  const { instance, response } = await FunkoManager.initialize(userName);
  const serverResponse = await instance.add(funko);
  res.json(serverResponse);
});

// Eliminar un funko
app.delete("/funkos", async (req, res) => {
  const userName = req.query.user as string;
  const funkoID = Number(req.query.ID);
  const { instance, response } = await FunkoManager.initialize(userName);
  const serverResponse = await instance.remove(funkoID);
  res.json(serverResponse);
});

// Actualizar un funko
app.patch("/funkos", async (req, res) => {
  const userName = req.query.user as string;
  const funko = req.body as Funko;
  const { instance, response } = await FunkoManager.initialize(userName);
  const serverResponse = await instance.update(funko);
  res.json(serverResponse);
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

export { app };