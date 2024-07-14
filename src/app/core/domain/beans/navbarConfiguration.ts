import { NavbarOption } from "./navbarOption";
import { TypeNavbar } from '../enum/TypeNavbar';

export interface NavbarConfiguration {
  title?: string,
  srcLogo?: string,
  altLogo?: string,
  logoRedirect?: boolean,
  urlLogoRedirect?: string,
  typeNavbar?: TypeNavbar,
  options?: NavbarOption[]
}
