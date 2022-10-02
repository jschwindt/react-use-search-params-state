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
          Min price: <span>{filterParams.minPrice}</span>
        </label>
        <button onClick={() => setFilterParams({ minPrice: 100 })}>[set minPrice to 100]</button>
      </div>
      <div>
        <label>
          Max price: <span>{filterParams.maxPrice}</span>
        </label>
        <button onClick={() => setFilterParams({ maxPrice: 200 })}>[set maxPrice to 200]</button>
      </div>
      <div>
        <label>
          Years: <span>{filterParams.years?.join(', ')}</span>
        </label>
        <button onClick={() => setFilterParams({ years: [2001, 2010, 2022] })}>[set some years]</button>
      </div>
      <div>
        <label>
          Types: <span>{filterParams.types?.join(', ')}</span>
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
