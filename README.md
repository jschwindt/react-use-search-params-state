# react-use-search-params-state

React package to use URL search params as state. It has the same API as `useState`.

## Install

```bash
npm install react-use-search-params-state
```

or

```bash
yarn add react-use-search-params-state
```

## Usage

```tsx
import React from 'react'
import { useSearchParamsState, SearchParamStateType } from 'react-use-search-params-state'

const filtersDefaults: SearchParamStateType[] = [
  {
    name: 'minPrice',
    type: 'number',
    defaultValue: null,
  },
  {
    name: 'maxPrice',
    type: 'number',
    defaultValue: null,
  },
  {
    name: 'isSold',
    type: 'boolean',
    defaultValue: false,
  },
  {
    name: 'types',
    type: 'string',
    defaultValue: [],
    isArray: true,
  },
  {
    name: 'years',
    type: 'number',
    defaultValue: null,
    isArray: true,
  },
]

const Filters = () => {
  const [filterParams, setFilterParams] = useSearchParamsState(filtersDefaults)

  console.log('filterParams', filterParams)

  return (
    <div>
      Filters:
      <div>
        <label>
          Min price: <span>{JSON.stringify(filterParams.minPrice)}</span>
        </label>
        <button onClick={() => setFilterParams({ minPrice: Math.floor(Math.random() * 1000) })}>[change]</button>
      </div>
      <div>
        <label>
          Max price: <span>{JSON.stringify(filterParams.maxPrice)}</span>
        </label>
        <button onClick={() => setFilterParams({ maxPrice: Math.floor(Math.random() * 1000) })}>[change]</button>
      </div>
      <div>
        <label>
          Years: <span>{JSON.stringify(filterParams.years)}</span>
        </label>
        <button
          onClick={() =>
            setFilterParams({ years: [Math.floor(Math.random() * 100) + 2000, Math.floor(Math.random() * 100) + 2000] })
          }
        >
          [change]
        </button>
      </div>
      <div>
        <label>
          Types: <span>{JSON.stringify(filterParams.types)}</span>
        </label>
        <button
          onClick={() =>
            setFilterParams({
              types: ['type1', 'type2', 'type3', 'type4', 'type5'].slice(0, Math.floor(Math.random() * 6)),
            })
          }
        >
          [change]
        </button>
      </div>
      <div>
        <label>Sold: </label>
        <input
          type='checkbox'
          checked={filterParams.isSold}
          onChange={(e) => setFilterParams({ isSold: e.target.checked })}
        />
      </div>
    </div>
  )
}
```
