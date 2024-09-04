import "dotenv/config";
import express from "express";
import cors from "cors";
import conn from "./config/conn.js";
import postagensRouter from "./routes/postagensRouter.js"

// Importação dos models
import "./models/postagensModel.js";

const PORT = process.env.PORT || 3333;

const app = express();

// Middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Conexão com o banco
conn
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log("🛵 Servidor rodando na port:", PORT);
    });
  })
  .catch((err) => console.error(err));

// Utilizando Rotas
app.use("/postagens", postagensRouter);

app.use((request, response) => {
  response.status(404).json({ msg: "Rota não encontrada" });
});
