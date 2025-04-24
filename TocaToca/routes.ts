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

router.post("/artist", createArtistController);
router.get("/artist", getAllArtistsController);
router.get("/artist/:id", getArtistByIdController); // ERRO : antes estava assim: router.delete("/artist/:id", getArtistByIdController);
 // Adicionada a rota DELETE /artist/:id associada ao controlador deleteArtistController.
router.delete("/artist/:id", deleteArtistController);
// Adicionada a rota GET /artist/more-than-five-musics associada ao controlador getArtistsWithMoreThanFiveMusicsController.
router.get("/artist/more-than-five-musics", getArtistsWithMoreThanFiveMusicsController);


router.post("/music", createMusicController);
router.get("/music", getAllMusicsController);
//  Adicionada a rota get /music/genre associada ao controlador getMusicsByGenreController.
router.get("/music/genre", getMusicsByGenreController);

export default router; 