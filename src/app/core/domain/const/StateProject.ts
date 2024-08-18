import { OptionInput } from "../beans/OptionInput";

export const statesProject: OptionInput[] = [
  {
    label: "Activo",
    value: "ACT"
  },
  {
    label: "Inactivo",
    value: "INA"
  },
  {
    label: "Finalizado",
    value: "FIN"
  },
  {
    label: "Cancelado",
    value: "CAN"
  },
];

export function getStateProjectByCode(code: string) {
  let state = statesProject.find(state => state.value === code);
  return state?.label ?? '';
}

