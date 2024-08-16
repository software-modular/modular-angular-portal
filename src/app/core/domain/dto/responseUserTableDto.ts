import { ResponseClientDto } from "./responseClientDto";

export interface ResponseUserTableDto {
  count?: Number,
  next?: string,
  previous?: string,
  results: ResponseClientDto[]
}
