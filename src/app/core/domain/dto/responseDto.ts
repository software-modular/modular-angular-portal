import { ResponseDataDto } from './responseDataDto';
export interface ResponseDto {
  message: string,
  code: Number,
  data: ResponseDataDto
}
