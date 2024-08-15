import { ResponseClientDto } from "./responseClientDto";

export interface ReesponseUserTableDto {
  count?: Number,
  next?: string,
  previous?: string,
  results: ResponseClientDto[]
}
