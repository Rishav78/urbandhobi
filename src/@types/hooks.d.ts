export type FormField = "email" | "password" | "phoneno" | "number" | "string";

export type Data = {[key: string]: FieldData};

export interface FieldData {
  name: string;
  type: FormField;
  value?: any;
  validate?: boolean;
  validator?: (field: string, fields: Data) => boolean;
  send?: boolean;
}
