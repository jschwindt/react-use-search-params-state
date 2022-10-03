import * as React from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import Test from "./Test";

export default function App() {
  return (
    <div>
      <h1>useSearchParamsState Example</h1>

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Test />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}

function Layout() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">
              Test with defaults
            </Link>
          </li>
          <li>
            <Link to="/?minPrice=15&maxPrice=25&years=2020&years=2021&years=2022&types=t1&types=t2&types=t3&isSold=false&orderBy=date&orderDir=desc">
              Test with params
            </Link>
          </li>
        </ul>
      </nav>

      <hr />

      <Outlet />
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}