import * as bcrypt from 'bcrypt';

export class SeederUtils {
  /**
   * Encripta una contraseña usando bcrypt
   */
  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  /**
   * Verifica si un elemento ya existe en la base de datos
   */
  async checkIfExists<T>(
    model: any, 
    filter: any, 
    itemName: string
  ): Promise<T | null> {
    const existing = await model.findOne(filter);
    if (existing) {
      console.log(`✅ ${itemName} ya existe`);
      return existing;
    }
    return null;
  }
}