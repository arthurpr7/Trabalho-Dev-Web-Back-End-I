import { Request, Response } from "express";
import { createArtist, deleteArtist, getAllArtists, getArtistById, getArtistsWithMoreThanFiveMusics } from "../services/artistService";

export function createArtistController(req: Request, res: Response): void {
  const { name } = req.body;
  if (!name) {
    res.status(400).json({ error: "Name is required" });
    return;
  }
  const artist = createArtist(name);
  res.status(201).json(artist);
}

export function getAllArtistsController(req: Request, res: Response): void {
  const list = getAllArtists();
  res.status(200).json(list);
}

export function getArtistByIdController(req: Request, res: Response): void {
  const id = parseInt(req.params.id);
  const artist = getArtistById(id);
  if (!artist) {
    res.status(404).json({ error: "Artist not found" });
    return;
  }
  res.json(artist);
}

// Adicionado o controlador deleteArtistController, que valida o ID, chama deleteArtist, e
// retorna status 204 (sucesso), 404 (não encontrado), ou 400 (erros como músicas associadas).
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
//Adicionado o controlador getArtistsWithMoreThanFiveMusicsController, que chama
// a função do serviço e retorna o resultado.
export function getArtistsWithMoreThanFiveMusicsController(req: Request, res: Response): void {
  const artists = getArtistsWithMoreThanFiveMusics();
  res.status(200).json(artists);
}