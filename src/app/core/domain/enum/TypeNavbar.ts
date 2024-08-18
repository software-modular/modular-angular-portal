export enum TypeNavbar {
  DEFAULT = "DEFAULT",
  CUSTOM = "CUSTOM",
  CUSTOM_2 = "CUSTOM_2"
}

export function getTypeNavbarByName(name: string): TypeNavbar {
  switch (name) {
    case TypeNavbar.CUSTOM:
      return TypeNavbar.CUSTOM;
    case TypeNavbar.CUSTOM_2:
      return TypeNavbar.CUSTOM_2;
    case TypeNavbar.DEFAULT:
      return TypeNavbar.DEFAULT;
    default:
      return TypeNavbar.DEFAULT;
  }
}
