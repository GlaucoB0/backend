import { response } from "express";
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

export const getAll = async (request, response) => {
  const page = parseInt(request.query.page) || 1;
  const limit = parseInt(request.query.limit) || 10;
  const offset = (page - 1) * 10;
  try {
    const postagens = await Postagem.findAndCountAll({
      limit,
      offset,
    });
    const totalPaginas = Math.ceil(postagens.count / limit);
    response.status(200).json({
      totalPostagens: postagens.count,
      totalPaginas,
      paginaAtual: page,
      itemsPorPagina: limit,
      proximaPagina:
        totalPaginas === 0
          ? null
          : `http://localhost:3333/postagens?page=${page + 1}`,
      postagens: postagens.rows,
    });
  } catch (error) {
    console.error(error);
    response.status(500).json({ msg: "Erro ao buscar postagens" });
  }
};

export const getPostagem = async (request, response) => {
  const { id } = request.params;

  try {
    const postagem = await Postagem.findByPk(id);
    if (postagem === null) {
      response.status(404).json({ msg: "Postagem não encontrada" });
      return;
    }
    response.status(200).json(postagem);
  } catch (error) {
    response.status(500).json({ err: "Erro ao buscar postagens" });
  }
};

export const updatePostagem = async (request, response) => {
  const { id } = request.params;
  const { titulo, conteudo, imagem } = request.body;

  const postagemAtualizada = {
    titulo,
    conteudo,
    imagem,
  };
  try {
    const [linhasAfetadas] = await Postagem.update(postagemAtualizada, {
      where: { id },
    });
    if (linhasAfetadas === 0) {
      response.status(404).json({ msg: "Postagem não encontrada" });
      return;
    }
    response.status(200).json({ msg: "Postagem Atualizada" });
  } catch (error) {
    response.status(500).json({ msg: "Erro ao atualizar Postagem" });
  }
};

export const deletePostagem = async (request, response) => {
  const { id } = request.params;

  try {
    const [linhasAfetadas] = await Postagem.destroy({
      where: { id },
    });
    if (linhasAfetadas === 0) {
      response.status(404).json({ msg: "Postagem não encontrada" });
      return;
    }
    response.status(200).json({ msg: "Postagem deletada" });
  } catch (error) {
    console.error(error)
    response.status(500).json({ msg: "Erro ao deletar Postagem" });
  }
};
