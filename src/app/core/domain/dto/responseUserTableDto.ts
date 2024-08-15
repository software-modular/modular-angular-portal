import { ResponseClientDto } from "./responseClientDto";

export interface ReesponseUserTableDto {
  count?: Number,
  next?: Number,
  previous?: Number,
  results: ResponseClientDto[]
}
