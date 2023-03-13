import { createBrowserRouter } from "react-router-dom";
import FifthTask from "../components/FifthTask";
import FourthTask from "../components/FourthTask";
import Main from "../Layout/Main";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        children: [
            {
                path: '/task-4',
                element: <FourthTask />
            },
            {
                path: '/task-5',
                element: <FifthTask />
            }
        ]
    }
])