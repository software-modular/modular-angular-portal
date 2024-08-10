import { TypeAuthenticator } from "../domain/enum/TypeAuthenticator";

export class TypeAuthenticatorUtils {
  static getAutheticatorTypeByName(name: string): TypeAuthenticator {
    switch (Number(name)) {
      case TypeAuthenticator.DEFAULT: {
        return TypeAuthenticator.DEFAULT;
      }
      default:
        return TypeAuthenticator.DEFAULT;
    }
  }
}

