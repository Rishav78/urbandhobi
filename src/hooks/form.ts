import { useState, useCallback, useRef } from "react";
import { ReqMethod } from "../@types";
import { FieldData, Data } from "../@types";
import { getValidator } from "../lib/helpers/validator";
import { getFetchWrapper } from "../lib/utils";

export interface UseFormProps {
  action: string;
  method: ReqMethod;
  fields: Array<FieldData>;
}
type FieldsValue={[key: string]: any};

export const useForm = ({
  action,
  method,
  fields,
}: UseFormProps) => {
  const [data] = useState(() => {
    const newState: Data = {};
    fields.forEach(field => {
      newState[field.name] = field;
    });
    return newState;
  });

  const [fieldValue, setFieldValue] = useState<FieldsValue>(() => {
    const newState: FieldsValue = {};
    fields.forEach(field => (newState[field.name] = field.value));
    return newState;
  });

  const fieldValueRef = useRef(fieldValue);
  fieldValueRef.current = fieldValue;

  const validate = useCallback(() => {
    const d = fieldValueRef.current;
    const validator = getValidator();
    fields.forEach(field => {
      if (field.validate === false) {return;}
      if (field.validator) {
        field.validator(d[field.name], d);
      }
      else {
        validator.validate(d[field.name], field.type);
      }
    });
  }, [data]);

  const setValue = useCallback(<Value=any>(name: string, value: Value, checkValidation: boolean = false): boolean | undefined => {
    setFieldValue(prevState => ({...prevState, [name]: value}));
    if (checkValidation) {
      try {
        getValidator().validate(value, fieldValueRef.current![name].type);
        return true;
      }
      catch (error) {
        return false;
      }
    }
  }, []);

  const submit = useCallback(async <Res = any>() => {
    // validate all the value
    validate();
    const res = await getFetchWrapper<any, Res>(action, method)
      .setData(fieldValueRef.current)
      .send();
    return res;
  }, [action, method]);

  return {
    setValue,
    submit,
    fieldValue,
  };
};
