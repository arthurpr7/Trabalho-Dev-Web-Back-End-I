import { Router } from "express";
import {
  createArtistController,
  deleteArtistController,
  getAllArtistsController,
  getArtistByIdController,
  getArtistsWithMoreThanFiveMusicsController
} from "./controllers/artistController";
import {
  createMusicController,
  getAllMusicsController,
  getMusicsByGenreController
} from "./controllers/musicController";

const router = Router();

/**
 * Rota para criação de um novo artista.
 * Espera corpo da requisição com campo 'name'.
 */
router.post("/artist", createArtistController);

/**
 * Rota para listagem de todos os artistas cadastrados.
 */
router.get("/artist", getAllArtistsController);

/**
 * Rota para busca de um artista específico pelo ID.
 * O ID deve ser passado como parâmetro na URL.
 * Exemplo: /artist/1
 */
router.get("/artist/:id", getArtistByIdController);

/**
 * Rota para deletar um artista por ID.
 * O artista só será excluído se não houver músicas associadas.
 */
router.delete("/artist/:id", deleteArtistController);

/**
 * Rota para listar artistas que possuem mais de cinco músicas cadastradas.
 */
router.get("/artist/more-than-five-musics", getArtistsWithMoreThanFiveMusicsController);

/**
 * Rota para criação de uma nova música.
 * Espera corpo da requisição com os campos: name, artistId, genre e duration.
 */
router.post("/music", createMusicController);

/**
 * Rota para listagem de todas as músicas cadastradas.
 */
router.get("/music", getAllMusicsController);

/**
 * Rota para buscar músicas por gênero.
 * O parâmetro 'genre' deve ser enviado na query string.
 * Exemplo: /music/genre?genre=ROCK
 */
router.get("/music/genre", getMusicsByGenreController);

export default router;
