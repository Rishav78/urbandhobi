import { useState, useCallback, useRef } from "react";
import { ReqMethod } from "../@types";
import { FieldData, Data } from "../@types";
import { getValidator } from "../lib/helpers/validator";
import { getFetchWrapper } from "../lib/utils";

export interface FieldValue {
  [key: string]: any;
}

export const useForm = (
  url: string,
  method: ReqMethod,
  fields: Array<FieldData>,
) => {
  const [data, setData] = useState<Data>(() => {
    const newDataState: Data = {};
    fields.forEach(field => {
      newDataState[field.name] = field;
    });
    return newDataState;
  });

  const dataRef = useRef<Data>(data);
  dataRef.current = data;

  const validate = useCallback(() => {
    const d = dataRef.current;
    const validator = getValidator();
    fields.forEach(field => {
      if (field.validate === false) {return;}
      if (field.validator) {
        field.validator(d[field.name].value, d);
      }
      else {
        validator.validate(d[field.name].value, field.type);
      }
    });
  }, [data]);

  const getFieldValue = useCallback((field: string): any => {
    const d = dataRef.current!;
    if (d[field]) {
      return d[field].value;
    }
  }, [data]);

  const getField = useCallback((field: string): FieldData => data[field], [data]);

  const setFieldValue = useCallback(<Field>(name: string, value: Field, checkValidation: boolean = false): boolean | undefined => {
    setData(prevState => {
      const newState = { ...prevState };
      newState[name].value = value;
      return newState;
    });
    if (checkValidation) {
      try {
        getValidator().validate(value, dataRef.current![name].type);
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
    const d: { [key: string]: any } = {};
    fields.forEach(field => {
      if (field.send !== false) {
        d[field.name] = dataRef.current[field.name].value;
      }
    });
    const res = await getFetchWrapper<any, Res>(url, method)
      .setData(d)
      .send();
    return res;
  }, [url, method]);

  return {
    getFieldValue,
    getField,
    setFieldValue,
    submit,
    data,
  };
};
