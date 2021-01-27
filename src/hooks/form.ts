import { useState, useCallback, useRef } from "react";
import { FieldsValue, ReqMethod } from "../@types";
import { FieldData, Data } from "../@types";
import { getValidator } from "../lib/helpers/validator";
import { getFetchWrapper } from "../lib/utils";

export interface UseFormProps {
  action: string;
  method: ReqMethod;
  fields: Array<FieldData>;
}

export interface FormError {
  error: boolean;
  message?: string | null;
}


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

  const [error, setError] = useState<FormError>({ error: true });

  const [fieldValue, setFieldValue] = useState<FieldsValue>(() => {
    const newState: FieldsValue = {};
    fields.forEach(field => (newState[field.name] = field.value));
    return newState;
  });

  const fieldValueRef = useRef(fieldValue);
  fieldValueRef.current = fieldValue;

  const validate = useCallback(() => {
    const d = fieldValueRef.current;
    console.log(d)
    const validator = getValidator();
    for (const field of fields) {
      if (field.validate === false) { return; }
      try {
        if (field.validator) {
          field.validator(d[field.name], d);
        }
        else {
          validator.validate(d[field.name], field.type);
        }
      }
      catch (err) {
        setError({error: true, message: err.message});
        return;
      }
    }
    setError({error: false, message: null});
  }, [data, fieldValue]);

  const setValue = useCallback(<Value = any>(name: string, value: Value) => {
    setFieldValue(prevState => {
      const newState = { ...prevState, [name]: value };
      fieldValueRef.current = newState;
      return newState;
    });
    validate();
  }, []);

  const submit = useCallback(async <Res = any>() => {
    const res = await getFetchWrapper<any, Res>(action, method)
      .setData(fieldValueRef.current)
      .send();
    return res;
  }, [action, method]);

  return {
    setValue,
    submit,
    fieldValue,
    error,
  };
};
