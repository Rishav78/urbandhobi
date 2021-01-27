export type FormField = "email" | "password" | "phoneno" | "number" | "string";

export type Data = {[key: string]: FieldData};

export type ValidationFn = Function;
export type CustomValidationFn = (field: any, fields: Data) => boolean;

export interface FieldData {
  name: string;
  type: FormField;
  value: any;
  validate?: boolean;
  validator?: (field: string, fields: Data) => boolean;
  send?: boolean;
}
