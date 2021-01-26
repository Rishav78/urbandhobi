export type FormField = "email" | "password" | "phoneno" | "number" | "string";

export type Data = {[key: string]: any};

export interface FieldData {
  name: string;
  type: FormField;
  value: any;
  validate?: boolean;
  validator?: (field: any) => boolean;
}
