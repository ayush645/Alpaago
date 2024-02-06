import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Login, Dashboard, Error, Register, Reset } from "./Pages";
import './app.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,

    errorElement: <Error />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  // {
  //   path: "/reset",
  //   element: <Reset />,
  // },
  // {
  //   path: "/dashboard",
  //   element: <Dashboard />,
  // },
]);
const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};
export default App;
