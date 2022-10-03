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

Import the hook and the params definition type.
Then create a params definition object containing the params you want to use.

The key is the name of the param. The value is an object with the following properties:

`type`: the type of the param. Can be `string`, `number` or `boolean`.

`default`: the default value of the param. If the param is not present in the URL, this value will be used.

`multiple`: (optional) if the param can have multiple values. If `true`, the value will be an array of the type specified in `type`.

Example:

```tsx
import { useSearchParamsState, SearchParamsStateType } from 'react-use-search-params-state'

const filtersDefaults: SearchParamsStateType = {
  minPrice: { type: 'number', default: null },
  maxPrice: { type: 'number', default: null },
  isSold: { type: 'boolean', default: true },
  types: { type: 'string', default: null, multiple: true },
  years: { type: 'number', default: [], multiple: true },
}
```

Use the hook in your functional component the same way you use `useState`:

```tsx
const TestFilters = () => {
  const [filterParams, setFilterParams] = useSearchParamsState(filtersDefaults)

  return <div>Min Price: {filterParams.minPrice}</div>
}
```

When you need to change any of the values, use the set function with a dictionary containing the name of the param and the new value(s):

```tsx
<div>
  Min price:
  <input
    type='text'
    value={filterParams.minPrice ?? ''}
    onChange={(e) => setFilterParams({ minPrice: e.target.value })}
  />
  <button onClick={() => setFilterParams({ minPrice: 100 })}>set minPrice to 100</button>
</div>
```

For a complete example, see the `example/` folder.

## TODO

- [ ] Add tests

## License

[ISC](http://opensource.org/licenses/ISC) © [Juan Schwindt](https://github.com/jschwindt)
