import { z } from "zod";
import Postagem from "../models/postagensModel.js";

export const create = async (request, response) => {
  const { titulo, conteudo, autor, imagem } = request.body;

  if (!titulo) {
    response.status(400).json({ err: "O titulo é obirgatoria" });
    return;
  }
  if (!conteudo) {
    response.status(400).json({ err: "O conteudo é obirgatoria" });
    return;
  }
  if (!autor) {
    response.status(400).json({ err: "O autor é obirgatoria" });
    return;
  }

  const novaPostagem = {
    titulo,
    conteudo,
    autor,
    imagem,
  };

  try {
    await Postagem.create(novaPostagem);
    response.status(201).json({ msg: "Postagem Cadastrada" });
  } catch (error) {
    console.error(error);
    response.status(500).json({ err: "Erro ao cadastrar postagem" });
  }
};
