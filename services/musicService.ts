import { Music } from "../models/music";
import { MusicGenre } from "../models/musicGenre";
import { getArtistById } from "./artistService";

// Exportada a variável musics para permitir acesso em outros módulos.
export let musics: Music[] = [
  { id: 1, name: "Faint", artistId: 1, genre: MusicGenre.ROCK, duration: 180 },
  { id: 2, name: "These Days", artistId: 2, genre: MusicGenre.ROCK, duration: 240 },
  { id: 3, name: "Under the Bridge", artistId: 3, genre: MusicGenre.ROCK, duration: 210 },
];

/**
 * Cria uma nova música e a adiciona à lista existente.
 * Valida se o artista existe e se o gênero é válido.
 * 
 * @param name Nome da música
 * @param artistId ID do artista associado
 * @param genre Gênero da música (deve ser um valor válido do enum MusicGenre)
 * @param duration Duração da música em segundos
 * @returns A música criada com ID gerado automaticamente
 * @throws Erro se o artista não existir ou se o gênero for inválido
 */
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

  const possibleGenres = Object.values(MusicGenre) as string[];
  if (!possibleGenres.includes(genre)) {
    throw new Error(`Invalid Genre: ${genre}`);
  }

  const typed = genre as MusicGenre;
  const newId = Math.max(...musics.map(m => m.id), 0) + 1;
  const newMusic: Music = { id: newId, name, artistId, genre: typed, duration };
  musics.push(newMusic);
  return newMusic;
}

/**
 * Retorna todas as músicas cadastradas.
 * 
 * @returns Lista completa de músicas
 */
export function getAllMusics(): Music[] {
  return musics;
}

/**
 * Filtra e retorna as músicas de um gênero específico.
 * 
 * @param genre Gênero da música (deve ser um valor do enum MusicGenre)
 * @returns Lista de músicas que pertencem ao gênero informado
 */
export function getMusicsByGenre(genre: MusicGenre): Music[] {
  return musics.filter(m => m.genre === genre);
}
