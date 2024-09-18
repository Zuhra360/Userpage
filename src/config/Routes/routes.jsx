import { createBrowserRouter } from "react-router-dom";
import { Todolist } from "../../components/Todolist/Todolist";
import { Myday } from "../../components/Todolist/Myday/Myday";



export const router = createBrowserRouter([
  
  {
    path: "/",
    element: <Todolist />,
    children: [
      {
        path: "Myday",
        element: <Myday />,
      },
     

    ],
  },
]);