import { createBrowserRouter } from "react-router";
import Landing from "../pages/Landing/Landing";
import Terms from "../pages/Terms/Terms";
import SignupWizard from "../pages/Signup/SignupWizard";



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
    element: <SignupWizard></SignupWizard>
  }
]);