import { ResponseUserDto } from "../dto/responseUserDto";
import { TypeModalMode } from "../enum/TypeModalMode";

export interface InputUserModal {
  mode: TypeModalMode,
  data: ResponseUserDto
}
