import { createBrowserRouter } from "react-router-dom";
import { Login } from "../../components/pages/Login";
import { MainPage } from "../../components/pages/MainPage";
import { SignUp } from "../../components/ui/MainPage/SignUp/SignUp";
import { Home } from "../../components/ui/MainPage/Home/Home";




export const router = createBrowserRouter([
  {
    path: "Userpage",
    element: <Login />,
    
  },
  {
    path: "signup",
    element: <SignUp />,
    
  },
  {
    path: "mainpage",
    element: <MainPage/>,
  },
  {
    path: "Home",
    element: <Home/>,
  },

]);