import { FunkoType, Gender, Franchise } from './types.js';
import chalk from 'chalk';

/**
 * Clase Funko
 */
export class Funko {
  /**
   * Constructor de la clase Funko
   * @param ID - Identificador del funko
   * @param name - Nombre del funko
   * @param description - Descripción del funko
   * @param type - Tipo del funko
   * @param gender - Género del funko
   * @param franchise - Franquicia del funko
   * @param pieceNumber - Número de piezas del funko
   * @param exclusive - Si el funko es exclusivo
   * @param specialFeatures - Características especiales del funko
   * @param value - Valor del funko
   */
  constructor(
    public ID: number,
    public name: string,
    public description: string,
    public type: FunkoType,
    public gender: Gender,
    public franchise: Franchise,
    public pieceNumber: number,
    public exclusive: boolean,
    public specialFeatures: string,
    public value: number   
  ) {}

  /**
   * Obtiene el color del valor de un funko
   * @param value - Valor del funko
   * @returns Color del valor
   */
  public getColour(value: number): typeof chalk {
    if (value < 10) {
      return chalk.red;
    } else if (value < 20) {
      return chalk.yellow;
    } else if (value < 50) {
      return chalk.blue;
    } else {
      return chalk.green;
    }
  }

  /**
   * Imprime el funko
   */
  public print(): void {
    console.log(chalk.white(` ID: ${this.ID}`));
    console.log(chalk.white(` - Nombre: ${this.name}`));
    console.log(chalk.white(` - Descripción: ${this.description}`));
    console.log(chalk.white(` - Tipo: ${this.type}`));
    console.log(chalk.white(` - Género: ${this.gender}`));
    console.log(chalk.white(` - Franquicia: ${this.franchise}`));
    console.log(chalk.white(` - Número de piezas: ${this.pieceNumber}`));
    console.log(chalk.white(` - Exclusivo: ${this.exclusive ? 'Sí' : 'No'}`));
    console.log(chalk.white(` - Características especiales: ${this.specialFeatures}`));
    console.log(this.getColour(this.value)(` - Valor: ${this.value}`));
    console.log(chalk.white('\n'));
  }
}