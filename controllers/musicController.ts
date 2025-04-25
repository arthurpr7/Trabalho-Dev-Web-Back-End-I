import { Request, Response } from "express";
import { MusicGenre } from "../models/musicGenre";
import {
  createMusic,
  getAllMusics,
  getMusicsByGenre
} from "../services/musicService";

/**
 * Cria uma nova música com base nos dados fornecidos.
 * Valida a presença dos campos obrigatórios e repassa ao serviço.
 * 
 * @param req Requisição contendo os dados: name, artistId, genre e duration
 * @param res Resposta com a música criada ou erro de validação/lógica
 */
export function createMusicController(req: Request, res: Response): void {
  const { name, artistId, genre, duration } = req.body;

  if (!name || !artistId || !genre || duration === undefined) {
    res.status(400).json({ error: "Missing fields in request body" });
    return;
  }

  try {
    const newMus = createMusic(name, artistId, genre, duration);
    res.status(201).json(newMus);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
}

/**
 * Retorna todas as músicas cadastradas.
 * Útil para exibição geral ou navegação por catálogo completo.
 */
export function getAllMusicsController(req: Request, res: Response): void {
  const list = getAllMusics();
  res.status(200).json(list);
}

/**
 * Retorna músicas filtradas por um gênero específico.
 * Valida se o parâmetro fornecido está entre os valores permitidos do enum MusicGenre.
 * 
 * @param req Requisição com query param `genre` (string)
 * @param res Resposta com as músicas filtradas ou erro de validação
 */
export function getMusicsByGenreController(req: Request, res: Response): void {
  const { genre } = req.query;

  if (!genre || typeof genre !== "string") {
    res.status(400).json({ error: "Genre is required and must be a string" });
    return;
  }

  const possibleGenres = Object.values(MusicGenre) as string[];
  if (!possibleGenres.includes(genre)) {
    res.status(400).json({
      error: `Invalid genre. Must be one of ${possibleGenres.join(", ")}`
    });
    return;
  }

  const musics = getMusicsByGenre(genre as MusicGenre);
  res.status(200).json(musics);
}
