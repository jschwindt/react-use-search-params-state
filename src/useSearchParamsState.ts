
import { useSearchParams } from "react-router-dom";

export type SearchParamStateType = {
  name: string;
  type: "string" | "number" | "boolean";
  defaultValue: string | number | boolean | Array<string | number | boolean> | null;
  isArray?: boolean;
};

const paramToBool = (param: SearchParamStateType, searchParams: URLSearchParams) => {
  const paramValue = searchParams.get(param.name);
  // The only presence of a boolean param (value === '') is considered true
  if (paramValue === "true" || paramValue === '1' || paramValue === '') return true;
  if (paramValue === "false" || paramValue === '0') return false;

  return param.defaultValue;
}

const paramToValue = (param: SearchParamStateType, searchParams: URLSearchParams) => {
  if (param.isArray) {
    const paramValue = searchParams.getAll(param.name);
    if (paramValue.length > 0) {
      return param.type === "number" ? paramValue.map(value => Number(value)) : paramValue;
    }
  } else {
    const paramValue = searchParams.get(param.name);
    if (paramValue) {
      return param.type === "number" ? Number(paramValue) : paramValue;
    }
  }
  return param.defaultValue;;
}

const getValues = (paramsDefinition: SearchParamStateType[], searchParams: URLSearchParams) => {
  const values: any = {};
  paramsDefinition.forEach(param => {
    if (param.type === "boolean") {
      values[param.name] = paramToBool(param, searchParams);
    } else {
      values[param.name] = paramToValue(param, searchParams);
    }
  });
  return values;
}

const getAllCurrentParams = (searchParams: URLSearchParams) => {
  const allUrlParams: Record<string, any> = {};
  for (const key of searchParams.keys()) {
    const value = searchParams.getAll(key);
    allUrlParams[key] = value;
    if (value.length === 1) {
      allUrlParams[key] = value[0];
    }
  }
  return allUrlParams;
};

export const useSearchParamsState = (paramsDefinition: SearchParamStateType[]) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const values = getValues(paramsDefinition, searchParams);

  const setValues = (newValues: Record<string, any>) => {
    const currentParams = getAllCurrentParams(searchParams);
    setSearchParams({ ...currentParams, ...newValues });
  };

  return [values, setValues] as const;
};