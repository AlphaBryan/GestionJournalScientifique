import {RouteType} from "./config";
import {AdminHome} from "../pages/Admin/AdminHome";
import {AdminEvaluateurs} from "../pages/Admin/AdminEvaluateurs";
import {AdminAjoutEvaluateur} from "../pages/Admin/AdminAjoutEvaluateur";
import {AdminComites} from "../pages/Admin/AdminComites";
import {AdminAjoutComite} from "../pages/Admin/AdminAjoutComite";
import {AdminEditions} from "../pages/Admin/AdminEditions";
import {AdminAjoutEdition} from "../pages/Admin/AdminAjoutEdition";
import {AdminCategories} from "../pages/Admin/AdminCategories";
import {AdminAjoutCategorie} from "../pages/Admin/AdminAjoutCategorie";
import {Logout} from "../pages/Authentification/Logout";
import LogoutIcon from "@mui/icons-material/Logout";


export const AdminRoutes: RouteType[] = [
    {
        path: "/deconnexion",
        element: <Logout/>,
        state: "deconnexion",
        sidebarProps: {
            displayText: "Se déconnecter",
            icon: <LogoutIcon/>,
        },
    },
    {
        path: '/',
        element: <AdminHome/>,
        state: 'adminHome',
    },
    {
        path: '/evaluateurs',
        element: <AdminEvaluateurs/>,
        state: 'adminEvaluateurs',
    },
    {
        path: '/evaluateurs/ajouter',
        element: <AdminAjoutEvaluateur/>,
        state: 'adminAjoutEvaluateur',
    },
    {
        path: '/comites',
        element: <AdminComites/>,
        state: 'adminComites',
    },
    {
        path: '/comites/ajouter',
        element: <AdminAjoutComite/>,
        state: 'adminAjoutComite'
    },
    {
        path: '/editions',
        element: <AdminEditions/>,
        state: 'adminEditions'
    },
    {
        path: '/editions/ajouter',
        element: <AdminAjoutEdition/>,
        state: 'adminAjoutEdition',
    },
    {
        path: '/categories',
        element: <AdminCategories/>,
        state: 'adminCategories'
    },
    {
        path: '/categories/ajouter',
        element: <AdminAjoutCategorie/>,
        state: 'adminAjoutCategorie'
    }
]