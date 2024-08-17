import { ProjectDto } from "../dto/projectDto";

export const projectList: ProjectDto[] = [
  {
    code_project: 3,
    name: "Cultivo café",
    description: "Este es un cultivo de prueba",
    allow_prepurcharse: true,
    crop: {
      code_crop: 6,
      country: "CO",
      department: "VAC",
      municipality: "CAL",
      address: "Cr 1J # adfadf",
      type_of_ground: "CAL",
      number_of_hectares: 7,
      number_of_plants: 5550,
      vegetative_period: 12,
      productive_period: 12,
      cultivation_start_date: "2024-01-01",
      estimated_harvest_date: "2025-01-01",
      owner: {
        code_crop_owner: 6,
        wompi_public_key: "xxxx",
        wompi_private_key: "xxxx",
        user: {
          document_id: "125432735",
          type_ide: "CC",
          type_user: "CO",
          profile_picture: "",
          name: "Elcul Tivador",
          email: "elcul@gmail.com",
          phone: "3045678790",
          address: "cualquier lugar del mundo",
          date_of_birth: "2000-01-01",
          is_active: true
        }
      }
    },
    invesment: {
      code_investment: 13,
      estimated_rate: 20.5,
      tir: 16.7,
      minimum_investment_amount: 10000000,
      maximum_investment_amount: 15000000,
      total_expected_investment: 15000000,
      start_date: "2024-02-02",
      end_date: "2025-03-03"
    },
    pre_purcharse: undefined,
    video_url: "",
    photo_1: "",
    photo_2: "",
    photo_3: "",
    photo_4: "",
    photo_5: "",
    state: "ACT",
    start_date: "2024-02-02",
    end_date: "2025-02-02"
  },
  {
    code_project: 3,
    name: "Cultivo de Papa",
    description: "Este es un cultivo de prueba",
    allow_prepurcharse: true,
    crop: {
      code_crop: 6,
      country: "CO",
      department: "VAC",
      municipality: "CAL",
      address: "Cr 1J # adfadf",
      type_of_ground: "CAL",
      number_of_hectares: 7,
      number_of_plants: 5550,
      vegetative_period: 12,
      productive_period: 12,
      cultivation_start_date: "2024-01-01",
      estimated_harvest_date: "2025-01-01",
      owner: {
        code_crop_owner: 6,
        wompi_public_key: "xxxx",
        wompi_private_key: "xxxx",
        user: {
          document_id: "125432735",
          type_ide: "CC",
          type_user: "CO",
          profile_picture: "",
          name: "Elcul Tivador",
          email: "elcul@gmail.com",
          phone: "3045678790",
          address: "cualquier lugar del mundo",
          date_of_birth: "2000-01-01",
          is_active: true
        }
      }
    },
    invesment: {
      code_investment: 13,
      estimated_rate: 20.5,
      tir: 16.7,
      minimum_investment_amount: 10000000,
      maximum_investment_amount: 15000000,
      total_expected_investment: 15000000,
      start_date: "2024-02-02",
      end_date: "2025-03-03"
    },
    pre_purcharse: undefined,
    video_url: "",
    photo_1: "",
    photo_2: "",
    photo_3: "",
    photo_4: "",
    photo_5: "",
    state: "ACT",
    start_date: "2024-02-02",
    end_date: "2025-02-02"
  },

];
