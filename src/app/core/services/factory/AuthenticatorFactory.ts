import { inject } from "@angular/core";
import { TypeAuthenticator } from "../../domain/enum/TypeAuthenticator";
import { Authenticator } from "../../domain/contracts/Authenticator";
import { AuthenticatorDefaultService } from "./authenticators/authenticator-default.service";

export class AuthenticatorFactory {

  constructor() { }

  getAutenticator(typeAuthenticator: TypeAuthenticator): Authenticator {
    switch (typeAuthenticator) {
      case TypeAuthenticator.DEFAULT: {
        return inject(AuthenticatorDefaultService);
      }
      default: { }
        return inject(AuthenticatorDefaultService);
    }
  }
}
