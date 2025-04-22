import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { Funko } from './funko.js';
import { ResponseType } from './types.js';
import { promises } from 'dns';

/**
 * Directorio de los funkos
 */
export const __dirname = path.join(path.dirname(fileURLToPath(import.meta.url)), "../../funkos");

/**
 * Clase FunkoManager
 */
export class FunkoManager {
  private readonly path: string;
  private readonly user: string;

  /**
   * Constructor privado para evitar instanciación directa
   * @param user - Nombre del usuario
   */
  private constructor(user: string) {
    this.user = user;
    this.path = path.join(__dirname, this.user);
  }

  /**
   * Método estático para inicializar la clase FunkoManager
   * @param user - Nombre del usuario
   * @returns Una promesa que resuelve una instancia de FunkoManager
   */
  public static async initialize(user: string): Promise<{ instance: FunkoManager; response: ResponseType }> {
    const instance = new FunkoManager(user);

    // Directorio ya creado
    try {
      await fs.promises.access(instance.path);
      return {
        instance,
        response: {
          type: 'path',
          success: true,
          message: `El directorio ${instance.path} ya existe.`,
        },
      };

    // Directorio no creado, se intenta crear
    } catch {

      // Se crea el directorio
      try {
        await fs.promises.mkdir(instance.path, { recursive: true });
        console.log(chalk.green(`Directorio ${instance.path} creado correctamente`));
        return {
          instance,
          response: {
            type: 'path',
            success: true,
            message: `Directorio ${instance.path} creado correctamente.`,
          },
        };

      // Error al crear el directorio
      } catch (err) {
        console.error(chalk.red(`Error al crear el directorio ${instance.path}}`));
        return {
          instance,
          response: {
            type: 'path',
            success: false,
            message: `Error al crear el directorio ${instance.path}`,
          },
        };
      }
    }
  }

  /**
   * Añade un funko
   * @param funko - Funko a añadir
   */
  public async add(funko: Funko): Promise<ResponseType> {
    const fileName = path.join(this.path, `${funko.ID}.json`);

    // Verifica si el funko ya existe
    try {
      await fs.promises.access(fileName);
      console.log(chalk.red(`El funko ${funko.name} ya existe para el usuario ${this.user}`));
      return {
        type: 'add',
        success: false,
        message: `El funko ${funko.name} ya existe para el usuario ${this.user}`,
      };

    // El funko no existe, se puede crear
    } catch {
      
      // Se crea el funko
      try {
        await fs.promises.writeFile(fileName, JSON.stringify(funko, null, 2));
        console.log(chalk.green(`Funko ${funko.name} añadido correctamente`));
        return {
          type: 'add',
          success: true,
          message: `Funko ${funko.name} añadido correctamente`,
        };

      // Error al crear el funko
      } catch (err) {
        console.error(chalk.red(`Error al añadir el funko ${funko.name}`));
        return {
          type: 'add',
          success: false,
          message: `Error al añadir el funko ${funko.name}`,
        };
      }
    }
  }

  /**
   * Elimina un funko
   * @param ID - Identificador del funko
   */
  public async remove(ID: number): Promise<ResponseType> {
    const fileName = path.join(this.path, `${ID}.json`);

    // Verifica si el funko existe
    try {
      await fs.promises.access(fileName);

      // Elimina el funko
      try {
        await fs.promises.unlink(fileName);
        console.log(chalk.green(`Funko con ID ${ID} eliminado correctamente`));
        return {
          type: 'remove',
          success: true,
          message: `Funko con ID ${ID} eliminado correctamente`,
        };

      // Error al eliminar el funko
      } catch (err) {
        console.error(chalk.red(`Error al eliminar el funko con ID ${ID}`));
        return {
          type: 'remove',
          success: false,
          message: `Error al eliminar el funko con ID ${ID}`,
        };
      }
    
    // El funko no existe
    } catch {
      console.log(chalk.red(`El funko con ID ${ID} no existe para el usuario ${this.user}`));
      return {
        type: 'remove',
        success: false,
        message: `El funko con ID ${ID} no existe para el usuario ${this.user}`,
      };
    }
  }

  /**
   * Actualiza un funko
   * @param funko - Funko a actualizar
   */
  public async update(funko: Funko): Promise<ResponseType> {
    const fileName = path.join(this.path, `${funko.ID}.json`);

    // Verifica si el funko existe
    try {
      await fs.promises.access(fileName);

      // Actualiza el funko
      try {
        await fs.promises.writeFile(fileName, JSON.stringify(funko, null, 2));
        console.log(chalk.green(`Funko ${funko.name} actualizado correctamente`));
        return {
          type: 'update',
          success: true,
          message: `Funko ${funko.name} actualizado correctamente`,
        };

      // Error al actualizar el funko
      } catch (err) {
        console.error(chalk.red(`Error al actualizar el funko ${funko.name}`));
        return {
          type: 'update',
          success: false,
          message: `Error al actualizar el funko ${funko.name}`,
        };
      }

    // El funko no existe
    } catch {
      console.log(chalk.red(`El funko ${funko.name} no existe para el usuario ${this.user}`));
      return {
        type: 'update',
        success: false,
        message: `El funko ${funko.name} no existe para el usuario ${this.user}`,
      };
    }
  }

  /**
   * Imprime los funkos
   */
  public async printAll(): Promise<ResponseType> {

    // Verifica si el directorio existe
    try {
      const files = await fs.promises.readdir(this.path);
      if (files.length === 0) { // Si no hay funkos
        console.log(chalk.red(`No hay funkos para imprimir para el usuario ${this.user}`));
        return {
          type: 'list',
          success: false,
          message: `No hay funkos para imprimir para el usuario ${this.user}`,
        };
      }

      // Imprime los funkos
      const funkosList: Funko[] = [];
      console.log(`Listado de Funkos para el usuario ${this.user}:`);
      for (const file of files) {
        const fileName = path.join(this.path, file);

        // Lee el funko
        try {
          const data = await fs.promises.readFile(fileName, 'utf-8');
          const funko: Funko = JSON.parse(data);
          funko.print();
          funkosList.push(funko);

        // Error al leer el funko
        } catch (err) {
          console.error(chalk.red(`Error al leer el archivo ${fileName}`));
        }
      }
      return {
        type: 'list',
        success: true,
        message: `Listado de funkos impreso correctamente para el usuario ${this.user}`,
        funkos: funkosList,
      };

    // Error al leer el directorio
    } catch (err) {
      console.error(chalk.red(`Error al leer el directorio ${this.path}`));
      return {
        type: 'list',
        success: false,
        message: `Error al leer el directorio ${this.path}`,
      };
    }
  }

  /**
   * Imprime un funko
   * @param ID - Identificador del funko
   */
  public async print(ID: number): Promise<ResponseType> {
    const fileName = path.join(this.path, `${ID}.json`);
  
    try {
      // Verifica si el archivo existe
      await fs.promises.access(fileName);
  
      // Lee el archivo y procesa el Funko
      const data = await fs.promises.readFile(fileName, 'utf-8');
      try {
        const funko: Funko = JSON.parse(data);
        funko.print();
        return {
          type: 'print',
          success: true,
          message: `Funko con ID ${ID} impreso correctamente`,
          funkos: [funko],
        };
      } catch (err) {
        console.error(chalk.red(`Error al parsear el archivo del funko con ID ${ID}: ${(err as Error).message}`));
        return {
          type: 'print',
          success: false,
          message: `Error al parsear el archivo del funko con ID ${ID}`,
        };
      }
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code === 'ENOENT') {
        console.log(chalk.red(`El funko con ID ${ID} no existe para el usuario ${this.user}`));
        return {
          type: 'print',
          success: false,
          message: `El funko con ID ${ID} no existe para el usuario ${this.user}`,
        };
      } else if ((err as NodeJS.ErrnoException).code === 'EACCES') {
        console.error(chalk.red(`Permiso denegado para leer el archivo del funko con ID ${ID}`));
        return {
          type: 'print',
          success: false,
          message: `Permiso denegado para leer el archivo del funko con ID ${ID}`,
        };
      } else {
        console.error(chalk.red(`Error al leer el archivo del funko con ID ${ID}: ${(err as Error).message}`));
        return {
          type: 'print',
          success: false,
          message: `Error al leer el archivo del funko con ID ${ID}`,
        };
      }
    }
  }
}