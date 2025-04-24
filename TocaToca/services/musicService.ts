import { Music } from "../models/music";
import { MusicGenre } from "../models/musicGenre";
import { getArtistById } from "./artistService";

// Exportada a variável musics para permitir acesso em outros módulos.
export let musics: Music[] = [
  { id: 1, name: "Faint", artistId: 1, genre: MusicGenre.ROCK, duration: 180 },
  { id: 2, name: "These Days", artistId: 2, genre: MusicGenre.ROCK, duration: 240 },
  { id: 3, name: "Under the Bridge", artistId: 3, genre: MusicGenre.ROCK, duration: 210 },
];

export function createMusic(
  name: string,
  artistId: number,
  genre: MusicGenre,
  duration: number
): Music {
  const artist = getArtistById(artistId);
  if (!artist) {
    throw new Error("Artist does not exist");
  }
// ERRO: Corrigido o a mensagem de erro, estava retornando erro de Artista, trocado agora para o Genre.
  const possibleGenres = Object.values(MusicGenre) as string[];
  if (!possibleGenres.includes(genre)) {
    throw new Error(`Invalid Genre: ${genre}`);
  }
  // antes era nemMusic, agora newMusic
  const typed = genre as MusicGenre;
  const newId = Math.max(...musics.map(m => m.id), 0) + 1;
  const newMusic: Music = { id: newId, name, artistId, genre: typed, duration };
  musics.push(newMusic);
  return newMusic;
}

export function getAllMusics(): Music[] {
  return musics;
}
//Adicionada a função getMusicsByGenre, que filtra músicas pelo gênero especificado.
export function getMusicsByGenre(genre: MusicGenre): Music[] {
  return musics.filter(m => m.genre === genre);
}