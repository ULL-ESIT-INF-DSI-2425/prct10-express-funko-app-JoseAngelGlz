import { Funko } from './funko.js';

/**
 * Tipo de un funko
 */
export type FunkoType = 'Pop!' | 'Pop! Rides' | ' Vynil Soda' | 'Vynil Gold';

/**
 * Género de un funko
 */
export type Gender = 'Animación' | 'Películas y TV' | 'Videojuegos' | 'Deportes' | 'Música' | 'Ánime';

/**
 * Franquicia de un funko
 */
export type Franchise = 'The Big Bang Theory' | 'Game of Thrones' | 'Sonic The Hedgehog' | 'Marvel: Guardians of the Galaxy';

/**
 * Respuesta
 */
export type ResponseType = {
  type: "path" | "add" | "remove" | "update" | "list" | "print";
  success: boolean;
  message: string;
  funkos?: Funko[];
}