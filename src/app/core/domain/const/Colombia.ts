import { OptionInput } from "../beans/OptionInput";

export const countries: OptionInput[] = [
  {
    value: "CO",
    label: "Colombia"
  }];
export const deparments: OptionInput[] = [
  { value: 'AMA', label: 'Amazonas' },
  { value: 'ANT', label: 'Antioquia' },
  { value: 'ARA', label: 'Arauca' },
  { value: 'ATL', label: 'Atlántico' },
  { value: 'BOL', label: 'Bolívar' },
  { value: 'BOY', label: 'Boyacá' },
  { value: 'CAL', label: 'Caldas' },
  { value: 'CAQ', label: 'Caquetá' },
  { value: 'CAS', label: 'Casanare' },
  { value: 'CAU', label: 'Cauca' },
  { value: 'CES', label: 'Cesar' },
  { value: 'CHO', label: 'Chocó' },
  { value: 'COR', label: 'Córdoba' },
  { value: 'CUN', label: 'Cundinamarca' },
  { value: 'GUA', label: 'Guainía' },
  { value: 'GUV', label: 'Guaviare' },
  { value: 'HUI', label: 'Huila' },
  { value: 'LAG', label: 'La Guajira' },
  { value: 'MAG', label: 'Magdalena' },
  { value: 'MET', label: 'Meta' },
  { value: 'NAR', label: 'Nariño' },
  { value: 'NSA', label: 'Norte de Santander' },
  { value: 'PUT', label: 'Putumayo' },
  { value: 'QUI', label: 'Quindío' },
  { value: 'RIS', label: 'Risaralda' },
  { value: 'SAP', label: 'San Andrés y Providencia' },
  { value: 'SAN', label: 'Santander' },
  { value: 'SUC', label: 'Sucre' },
  { value: 'TOL', label: 'Tolima' },
  { value: 'VAC', label: 'Valle del Cauca' },
  { value: 'VAU', label: 'Vaupés' },
  { value: 'VIC', label: 'Vichada' },
];

export const cities: OptionInput[] = [
  { value: 'LET', label: 'Leticia' },
  { value: 'MED', label: 'Medellín' },
  { value: 'ENV', label: 'Envigado' },
  { value: 'ITA', label: 'Itagüí' },
  { value: 'ARA', label: 'Arauca' },
  { value: 'BAR', label: 'Barranquilla' },
  { value: 'SOL', label: 'Soledad' },
  { value: 'CAR', label: 'Cartagena' },
  { value: 'MAG', label: 'Magangué' },
  { value: 'TUN', label: 'Tunja' },
  { value: 'DUI', label: 'Duitama' },
  { value: 'MAN', label: 'Manizales' },
  { value: 'VIL', label: 'Villamaría' },
  { value: 'FLO', label: 'Florencia' },
  { value: 'PAU', label: 'El Paujil' },
  { value: 'YOP', label: 'Yopal' },
  { value: 'TAU', label: 'Tauramena' },
  { value: 'POP', label: 'Popayán' },
  { value: 'SAN', label: 'Santander de Quilichao' },
  { value: 'VAL', label: 'Valledupar' },
  { value: 'PAZ', label: 'La Paz' },
  { value: 'QUI', label: 'Quibdó' },
  { value: 'IST', label: 'Istmina' },
  { value: 'MON', label: 'Montería' },
  { value: 'LOR', label: 'Lorica' },
  { value: 'BOG', label: 'Bogotá' },
  { value: 'SOA', label: 'Soacha' },
  { value: 'INI', label: 'Inírida' },
  { value: 'SAN', label: 'San José del Guaviare' }, // Se repite el código SAN
  { value: 'NEI', label: 'Neiva' },
  { value: 'PIT', label: 'Pitalito' },
  { value: 'RIO', label: 'Riohacha' },
  { value: 'MAI', label: 'Maicao' },
  { value: 'STA', label: 'Santa Marta' },
  { value: 'CIE', label: 'Ciénaga' },
  { value: 'VIL', label: 'Villavicencio' }, // Se repite el código VIL
  { value: 'ACA', label: 'Acacías' },
  { value: 'PAS', label: 'San Juan de Pasto' },
  { value: 'IPA', label: 'Ipiales' },
  { value: 'CUC', label: 'San José de Cúcuta' },
  { value: 'OCA', label: 'Ocaña' },
  { value: 'MOC', label: 'Mocoa' },
  { value: 'PUA', label: 'Puerto Asís' },
  { value: 'ARM', label: 'Armenia' },
  { value: 'CAL', label: 'Calarcá' }, // Se repite el código CAL
  { value: 'PER', label: 'Pereira' },
  { value: 'DOS', label: 'Dosquebradas' },
  { value: 'SAN', label: 'San Andrés' }, // Se repite el código SAN
  { value: 'BUC', label: 'Bucaramanga' },
  { value: 'BAR', label: 'Barrancabermeja' }, // Se repite el código BAR
  { value: 'SIN', label: 'Sincelejo' },
  { value: 'COR', label: 'Corozal' },
  { value: 'IBA', label: 'Ibagué' },
  { value: 'ESP', label: 'Espinal' },
  { value: 'CAL', label: 'Cali' }, // Se repite el código CAL
  { value: 'PAL', label: 'Palmira' },
  { value: 'MIT', label: 'Mitú' },
  { value: 'PUC', label: 'Puerto Carreño' },
];


export function getCityByCode(code: string) {
  let city = cities.find(city => city.value === code);
  return city?.label ?? '';
}

export function getDepartmentByCode(code: string) {
  let deparment = deparments.find(deparment => deparment.value === code);
  return deparment?.label ?? '';
}
