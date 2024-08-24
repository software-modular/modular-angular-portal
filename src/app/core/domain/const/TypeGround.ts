import { OptionInput } from "../beans/OptionInput";

export const typeGrounds: OptionInput[] = [
  {
    label: "Suelos arenosos: Tienen partículas grandes y sueltas, lo que proporciona un buen drenaje pero baja retención de agua y nutrientes. Son adecuados para cultivos que no requieren mucha agua.",
    value: "ARE"
  },
  {
    label: "Suelos arcillosos: Tienen partículas muy pequeñas y compactas, lo que resulta en una buena retención de agua y nutrientes pero a menudo tienen problemas de drenaje y aireación. Son adecuados para cultivos que toleran el agua estancada.",
    value: "ARC"
  },
  {
    label: "Suelos limosos: Son una mezcla equilibrada de arena, arcilla y materia orgánica. Tienen una buena estructura que permite un buen drenaje y retención de agua, siendo adecuados para una amplia variedad de cultivos.",
    value: "LIM"
  },
  {
    label: "Suelos calcáreos: Tienen un alto contenido de carbonato de calcio. Pueden tener problemas de pH elevado, lo que afecta la disponibilidad de ciertos nutrientes para las plantas. Son adecuados para cultivos que toleran suelos alcalinos.",
    value: "CAL"
  },

  {
    label: "Suelos ácidos: Tienen un pH bajo debido a un bajo contenido de carbonato de calcio y pueden ser deficientes en ciertos nutrientes como calcio y magnesio. Son adecuados para cultivos que prefieren suelos ácidos, como arándanos y algunos tipos de frutales.",
    value: "ACI"
  },

  {
    label: "Suelos orgánicos: Son ricos en materia orgánica descompuesta y suelen tener una textura ligera y esponjosa. Proporcionan una buena retención de agua y nutrientes, así como una estructura favorable para el crecimiento de raíces. Son adecuados para una amplia gama de cultivos.",
    value: "ORG"
  },

  {
    label: "Suelos salinos: Contienen altas concentraciones de sales solubles que pueden ser perjudiciales para muchas plantas. Requieren prácticas especiales de manejo para ser adecuados para cultivos, como el uso de sistemas de drenaje y la aplicación de enmiendas.",
    value: "SAL"
  }
];


export function getTypeGroundByCode(code: string) {
  let ground = typeGrounds.find(ground => ground.value === code);
  return ground?.label ?? '';
}
