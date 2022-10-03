import React from 'react'
import { useSearchParamsState, SearchParamsStateType } from 'react-use-search-params-state'

const filtersDefaults: SearchParamsStateType = {
  minPrice: { type: 'number', defaultValue: null },
  maxPrice: { type: 'number', defaultValue: null },
  isSold: { type: 'boolean', defaultValue: true },
  types: { type: 'string', defaultValue: null, isArray: true },
  years: { type: 'number', defaultValue: [], isArray: true },
}

const sortDefaults: SearchParamsStateType = {
  orderBy: { type: 'string', defaultValue: 'price' },
  orderDir: { type: 'string', defaultValue: 'asc' },
}

const TestFilters = () => {
  const [filterParams, setFilterParams] = useSearchParamsState(filtersDefaults)

  const onChangeYear = (year: number, checked: boolean) => {
    const newValues = checked ? [...filterParams.years, year] : filterParams.years.filter((y: number) => y !== year)
    setFilterParams({ years: newValues })
  }

  return (
    <div>
      <div>
        Min price:{' '}
        <input
          type="text"
          value={filterParams.minPrice ?? ''}
          onChange={(e) => setFilterParams({ minPrice: e.target.value })}
        />
        {' '}
        <button onClick={() => setFilterParams({ minPrice: 100 })}>set minPrice to 100</button>
      </div>

      <div>
        Max price:{' '}
        <input
          type="text"
          value={filterParams.maxPrice ?? ''}
          onChange={(e) => setFilterParams({ maxPrice: e.target.value })}
        />
      </div>

      <div>
        Years: <br />
        {[2019, 2020, 2021, 2022].map((year) => (
          <div key={year}>
            <input
              type="checkbox"
              checked={filterParams.years.includes(year)}
              onChange={(e) => onChangeYear(year, e.target.checked)}
            />
            {year}
          </div>
        ))}
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
  const [sortParams, setSortParams] = useSearchParamsState(sortDefaults)

  return (
    <div>
      Sort by:{' '}
      <select
        onChange={(e) => setSortParams({ orderBy: e.target.value })}
        value={sortParams.orderBy}
      >
        <option value="price">Price</option>
        <option value="date">Date</option>
      </select>
      <select
        onChange={(e) => setSortParams({ orderDir: e.target.value })}
        value={sortParams.orderDir}
      >
        <option value="asc">asc</option>
        <option value="desc">desc</option>
      </select>
    </div>
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
