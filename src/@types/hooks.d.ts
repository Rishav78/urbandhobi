export type FormField = "email" | "password" | "phoneno" | "number" | "string";

export type Data = {[key: string]: FieldData};
export type FieldsValue = { [key: string]: any };
export interface FieldData {
  name: string;
  type: FormField;
  validate?: boolean;
  validator?: (field: string, fields: FieldsValue) => boolean;
  send?: boolean;
}
