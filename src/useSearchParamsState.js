import { useSearchParams } from "react-router-dom";
const paramToBool = (param, searchParams) => {
    const paramValue = searchParams.get(param.name);
    // The only presence of a boolean param (value === '') is considered true
    if (paramValue === "true" || paramValue === '1' || paramValue === '')
        return true;
    if (paramValue === "false" || paramValue === '0')
        return false;
    return param.defaultValue;
};
const paramToValue = (param, searchParams) => {
    if (param.isArray) {
        const paramValue = searchParams.getAll(param.name);
        if (paramValue.length > 0) {
            return param.type === "number" ? paramValue.map(value => Number(value)) : paramValue;
        }
    }
    else {
        const paramValue = searchParams.get(param.name);
        if (paramValue) {
            return param.type === "number" ? Number(paramValue) : paramValue;
        }
    }
    return param.defaultValue;
    ;
};
const getValues = (paramsDefinition, searchParams) => {
    const values = {};
    paramsDefinition.forEach(param => {
        if (param.type === "boolean") {
            values[param.name] = paramToBool(param, searchParams);
        }
        else {
            values[param.name] = paramToValue(param, searchParams);
        }
    });
    return values;
};
const getAllCurrentParams = (searchParams) => {
    const allUrlParams = {};
    for (const key of searchParams.keys()) {
        const value = searchParams.getAll(key);
        allUrlParams[key] = value;
        if (value.length === 1) {
            allUrlParams[key] = value[0];
        }
    }
    return allUrlParams;
};
export const useSearchParamsState = (paramsDefinition) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const values = getValues(paramsDefinition, searchParams);
    const setValues = (newValues) => {
        const currentParams = getAllCurrentParams(searchParams);
        setSearchParams(Object.assign(Object.assign({}, currentParams), newValues));
    };
    return [values, setValues];
};
