import { ResponseDataDto } from "./responseDataDto";

export interface ResponseLoginDto{
  message?: string,
  code?: Number,
  data?: ResponseDataDto
}
