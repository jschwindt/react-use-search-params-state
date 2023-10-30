import { useSearchParams } from 'react-router-dom'

type DefaultType = string | number | boolean | Array<string | number | boolean> | null

type SearchParamStateType = {
  type: 'string' | 'number' | 'boolean'
  default: DefaultType
  multiple?: boolean
}

export type SearchParamsStateType = Record<string, SearchParamStateType>

const paramToBool = (paramName: string, paramDefinition: SearchParamStateType, searchParams: URLSearchParams) => {
  const paramValue = searchParams.get(paramName)
  // The only presence of a boolean param (value === '') is considered true
  if (paramValue === 'true' || paramValue === '1' || paramValue === '') return true
  if (paramValue === 'false' || paramValue === '0') return false

  return paramDefinition.default
}

const paramToValue = (paramName: string, paramDefinition: SearchParamStateType, searchParams: URLSearchParams) => {
  if (paramDefinition.multiple) {
    const paramValue = searchParams.getAll(paramName)
    if (paramValue.length > 0) {
      return paramDefinition.type === 'number' ? paramValue.map((value) => Number(value)) : paramValue
    }
  } else {
    const paramValue = searchParams.get(paramName)
    if (paramValue) {
      return paramDefinition.type === 'number' ? Number(paramValue) : paramValue
    }
  }
  return paramDefinition.default
}

const getValues = (paramsDefinition: SearchParamsStateType, searchParams: URLSearchParams) => {
  const values: any = {}
  for (const [paramName, paramDefinition] of Object.entries(paramsDefinition)) {
    if (paramDefinition.type === 'boolean') {
      values[paramName] = paramToBool(paramName, paramDefinition, searchParams)
    } else {
      values[paramName] = paramToValue(paramName, paramDefinition, searchParams)
    }
  }
  return values
}

const getAllCurrentParams = (searchParams: URLSearchParams) => {
  const allUrlParams: Record<string, any> = {}
  searchParams.forEach((value, key) => {
    if (allUrlParams[key]) {
      if (Array.isArray(allUrlParams[key])) {
        allUrlParams[key].push(value)
      } else {
        allUrlParams[key] = [allUrlParams[key], value]
      }
    } else {
      allUrlParams[key] = value
    }
  })
  return allUrlParams
}

export const useSearchParamsState = (paramsDefinition: SearchParamsStateType) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const values = getValues(paramsDefinition, searchParams)

  const setValues = (newValues: Record<string, any>) => {
    const currentParams = getAllCurrentParams(searchParams)
    for (const key in newValues) {
      if (Object.prototype.hasOwnProperty.call(newValues, key)) {
        const value = newValues[key]
        if (value === '' || (Array.isArray(value) && value.length === 0)) {
          delete currentParams[key]
          delete newValues[key]
        }
      }
    }
    setSearchParams({ ...currentParams, ...newValues })
  }

  return [values, setValues] as const
}
