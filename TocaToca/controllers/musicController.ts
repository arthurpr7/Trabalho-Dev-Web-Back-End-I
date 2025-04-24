import { Request, Response } from "express";
import { MusicGenre } from "../models/musicGenre";
import {
  createMusic,
  getAllMusics,
  getMusicsByGenre
} from "../services/musicService";

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

export function getAllMusicsController(req: Request, res: Response): void {
  const list = getAllMusics();
  res.status(200).json(list);
}
// Adicionado o controlador getMusicsByGenreController, que valida o parâmetro genre
// (deve ser string e estar no enum MusicGenre) e retorna as músicas filtradas.
export function getMusicsByGenreController(req: Request, res: Response): void {
  const { genre } = req.query;
  if (!genre || typeof genre !== "string") {
    res.status(400).json({ error: "Genre is required and must be a string" });
    return;
  }
  const possibleGenres = Object.values(MusicGenre) as string[];
  if (!possibleGenres.includes(genre)) {
    res.status(400).json({ error: `Invalid genre. Must be one of ${possibleGenres.join(", ")}` });
    return;
  }
  const musics = getMusicsByGenre(genre as MusicGenre);
  res.status(200).json(musics);
}
