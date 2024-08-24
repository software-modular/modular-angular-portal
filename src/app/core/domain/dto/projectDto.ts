export interface ProjectDto {
  code_project?: Number,
  name?: string,
  description?: string,
  allow_prepurcharse?: Boolean,
  crop?: {
    code_crop?: Number,
    country?: string,
    department?: string,
    municipality?: string,
    address?: string,
    type_of_ground?: string,
    number_of_hectares?: Number,
    number_of_plants?: Number,
    vegetative_period?: Number,
    productive_period?: Number,
    cultivation_start_date?: string,
    estimated_harvest_date?: string,
    google_maps_ubication?: string,
    owner?: {
      code_crop_owner?: Number,
      user?: {
        document_id?: string,
        type_ide?: string,
        type_user?: string,
        profile_picture?: string,
        name?: string,
        email?: string,
        phone?: string,
        address?: string,
        date_of_birth?: string,
        is_active?: Boolean
      }
    }
  },
  invesment?: {
    code_investment?: Number,
    estimated_rate?: Number,
    tir?: Number,
    minimum_investment_amount?: Number,
    maximum_investment_amount?: Number,
    total_expected_investment?: Number,
    start_date?: string,
    end_date?: string
  },
  pre_purcharse?: {
    units?: string,
    minimum_amount?: Number,
    maximum_amount?: Number,
    total_pre_purcharse?: Number,
    start_date?: string,
    end_date?: string,
    unit_price?: Number
  },
  video_url?: string,
  photo_1?: string,
  photo_2?: string,
  photo_3?: string,
  photo_4?: string,
  photo_5?: string,
  state?: string,
  start_date?: string,
  end_date?: string
}
