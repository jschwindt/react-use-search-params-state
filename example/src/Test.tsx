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
    defaultValue: true,
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
];

const sortDefaults: SearchParamStateType[] = [
  {
    name: 'orderBy',
    type: 'string',
    defaultValue: 'price',
  },
  {
    name: 'orderDir',
    type: 'string',
    defaultValue: 'asc',
  },
];

const TestFilters = () => {
  const [filterParams, setFilterParams] = useSearchParamsState(filtersDefaults);

  console.log("filterParams", filterParams);

  return (
    <div>
      <div>
        Min price: {filterParams.minPrice}{' '}
        <button onClick={() => setFilterParams({ minPrice: 100 })}>set minPrice to 100</button>
      </div>

      <div>
        Max price: {filterParams.maxPrice}{' '}
        <button onClick={() => setFilterParams({ maxPrice: 200 })}>set maxPrice to 200</button>
      </div>

      <div>
        Years: {filterParams.years?.join(', ')}{' '}
        <button onClick={() => setFilterParams({ years: [2001, 2002] })}>set years</button>
      </div>

      <div>
        Types: {filterParams.types?.join(', ')}{' '}
        <button
          onClick={() =>
            setFilterParams({
              types: ['type1', 'type2', 'type3', 'type4', 'type5'].slice(0, Math.floor(Math.random() * 6)),
            })
          }
        >
          Set random types
        </button>
      </div>

      <div>
        Sold:
        <input
          type='checkbox'
          checked={filterParams.isSold}
          onChange={(e) => setFilterParams({ isSold: e.target.checked })}
        />
      </div>

    </div>
  )

}

const TestSort = () => {
  const [sortParams, setSortParams] = useSearchParamsState(sortDefaults);

  console.log("sortParams", sortParams);

  return (
    <div>
      Sort by:
      {' '}
      <button
        onClick={() => setSortParams({ orderBy: sortParams.orderBy === 'price' ? 'date' : 'price' })}>
        {sortParams.orderBy}
      </button>
      {' '}
      <button
        onClick={() => setSortParams({ orderDir: sortParams.orderDir === 'asc' ? 'desc' : 'asc' })}>
        {sortParams.orderDir}
      </button>
    </div >
  )
}

const Test = () => {

  return (
    <div>
      <h1>Test</h1>
      <TestFilters />
      <TestSort />
    </div>
  )
}

export default Test