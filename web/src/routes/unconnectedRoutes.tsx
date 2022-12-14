import {RouteType} from "./config";
import HomePage from "../pages/home/HomePage";
import {Login} from "../pages/Authentification/Login";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import {Register} from "../pages/Authentification/Register";


export const NotConnectedRoutes: RouteType[] = [
    {
        index: true,
        element: <HomePage/>,
        state: "home",
    },
    {
        path: "/connexion",
        element: <Login/>,
        state: "connexion",
        sidebarProps: {
            displayText: "Me connecter",
            icon: <LoginIcon/>,
        },
    },
    {
        path: "/inscription",
        element: <Register/>,
        state: "inscription",
        sidebarProps: {
            displayText: "M'inscrire",
            icon: <PersonAddIcon/>,
        },
    },
];