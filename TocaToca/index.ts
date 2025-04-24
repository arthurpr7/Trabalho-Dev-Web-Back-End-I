import cors from "cors";
import express from "express";
import router from "./routes";

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Rotas
app.use(router);

// Porta
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`TocaToca server running at http://localhost:${PORT}`);
});
