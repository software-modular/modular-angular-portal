import { ProjectDto } from "../dto/projectDto";
import { TypeModalMode } from "../enum/TypeModalMode";

export interface InputProjectModal {
  mode: TypeModalMode,
  data: ProjectDto
}
