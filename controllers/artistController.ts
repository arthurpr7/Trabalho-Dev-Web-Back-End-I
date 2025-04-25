import { Request, Response } from "express";
import {
  createArtist,
  deleteArtist,
  getAllArtists,
  getArtistById,
  getArtistsWithMoreThanFiveMusics
} from "../services/artistService";

/**
 * Cria um novo artista com base no nome fornecido no corpo da requisição.
 * @param req Requisição HTTP contendo o campo 'name'
 * @param res Resposta HTTP com o artista criado ou erro de validação
 */
export function createArtistController(req: Request, res: Response): void {
  const { name } = req.body;

  if (!name) {
    res.status(400).json({ error: "Name is required" });
    return;
  }

  const artist = createArtist(name);
  res.status(201).json(artist);
}

/**
 * Retorna todos os artistas cadastrados.
 * Útil para exibir a lista completa sem filtros.
 */
export function getAllArtistsController(req: Request, res: Response): void {
  const list = getAllArtists();
  res.status(200).json(list);
}

/**
 * Busca e retorna um artista pelo seu ID.
 * @param req Deve conter o parâmetro de rota `id`
 * @param res Resposta com o artista correspondente ou erro 404
 */
export function getArtistByIdController(req: Request, res: Response): void {
  const id = parseInt(req.params.id);
  const artist = getArtistById(id);

  if (!artist) {
    res.status(404).json({ error: "Artist not found" });
    return;
  }

  res.json(artist);
}

/**
 * Exclui um artista pelo ID, desde que ele exista e não tenha músicas associadas.
 * @param req Deve conter o parâmetro de rota `id`
 * @param res Status 204 se deletado, 404 se não encontrado, 400 se inválido
 */
export function deleteArtistController(req: Request, res: Response): void {
  const id = parseInt(req.params.id);

  if (isNaN(id) || id <= 0) {
    res.status(400).json({ error: "Invalid ID. Must be a positive integer" });
    return;
  }

  try {
    const deleted = deleteArtist(id);

    if (!deleted) {
      res.status(404).json({ error: "Artist not found" });
      return;
    }

    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
}

/**
 * Retorna artistas que possuem mais de cinco músicas cadastradas.
 * Útil para filtros ou recomendações baseadas em volume de produção.
 */
export function getArtistsWithMoreThanFiveMusicsController(req: Request, res: Response): void {
  const artists = getArtistsWithMoreThanFiveMusics();
  res.status(200).json(artists);
}