import { ResponseUserDto } from "./responseUserDto";

export interface ResponseClientDto {
  code_staff?: Number,
  ocupation_staff?: Number,
  code_client?: Number,
  user: ResponseUserDto
}
