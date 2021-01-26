import {useState, useEffect, useCallback, useRef} from "react";
import { ReqMethod } from "../@types";
import { FieldData, Data } from "../@types";
import { getFetchWrapper } from "../lib/utils";

export const useForm = (
  url: string,
  method: ReqMethod,
  fields: Array<FieldData>,
) => {
  const [data, setData] = useState<Data>({});

  const dataRef = useRef<Data>();
  dataRef.current = data;

  useEffect(() => {
    const newDataState: Data = {};
    fields.forEach(field => {
      newDataState[field.name] = field.value;
    });
    setData(newDataState);
  }, [fields]);

  const getFieldValue = useCallback(<Field = any>(field: string): Field => data[field], [data]);

  const getAllField = useCallback(() => data, [data]);

  const setFieldValue = useCallback(<Field>(name: string, value: Field): void => {
    const newDataState = {...dataRef.current, [name]: value};
    setData(newDataState);
  }, []);

  const submit = useCallback(async <Res = any>() => {
    const res = await getFetchWrapper<any, Res>(url, method)
      .setData(dataRef.current)
      .send();
    return res;
  }, [url, method]);

  return {
    getFieldValue,
    getAllField,
    setFieldValue,
    submit,
    data,
  };
};
