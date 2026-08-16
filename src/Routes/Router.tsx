import { createBrowserRouter } from "react-router";
import Landing from "../pages/Landing/Landing";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing></Landing>
  },
]);