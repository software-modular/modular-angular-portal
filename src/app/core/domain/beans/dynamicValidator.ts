import { TypeDynamicValidator } from "../enum/typeDynamicValidators";

export interface DynamicValidator {
  type?: TypeDynamicValidator,
  minLength?: Number,
  maxLength?: Number
}


export function requiredValidator(): DynamicValidator {
  return {
    type: TypeDynamicValidator.REQUIRED
  };
}

export function emailValidator(): DynamicValidator {
  return {
    type: TypeDynamicValidator.EMAIL
  };
}

export function minLengthValidator(value: Number): DynamicValidator {
  return {
    type: TypeDynamicValidator.MIN_LENGTH,
    minLength: value,
  };
}

export function maxLengthValidator(value: Number): DynamicValidator {
  return {
    type: TypeDynamicValidator.MIN_LENGTH,
    maxLength: value,
  };
}
