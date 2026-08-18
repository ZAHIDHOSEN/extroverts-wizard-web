import { createBrowserRouter } from "react-router";
import Landing from "../pages/Landing/Landing";
import Terms from "../pages/Terms/Terms";
import SignupWizaed from "../pages/Signup/SignupWizaed";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing></Landing>
  },
  {
    path: "/terms",
    element: <Terms></Terms>
  },
  {
    path: "/signup",
    element: <SignupWizaed></SignupWizaed>
  }
]);