export enum TypeNavbar {
  DEFAULT = "DEFAULT",
  CUSTOM = "CUSTOM"
}

export function getTypeNavbarByName(name: string): TypeNavbar {
  switch (name) {
    case TypeNavbar.CUSTOM:
      return TypeNavbar.CUSTOM;
    case TypeNavbar.DEFAULT:
      return TypeNavbar.DEFAULT;
    default:
      return TypeNavbar.DEFAULT;
  }
}
