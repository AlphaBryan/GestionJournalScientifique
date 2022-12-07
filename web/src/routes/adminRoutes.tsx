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


export const AdminRoutes: RouteType[] = [
    {
        path: '/admin',
        element: <AdminHome/>,
        state: 'adminHome',
    },
    {
        path: '/admin/evaluateurs',
        element: <AdminEvaluateurs/>,
        state: 'adminEvaluateurs',
    },
    {
        path: '/admin/evaluateurs/ajouter',
        element: <AdminAjoutEvaluateur/>,
        state: 'adminAjoutEvaluateur',
    },
    {
        path: '/admin/comites',
        element: <AdminComites/>,
        state: 'adminComites',
    },
    {
        path: '/admin/comites/ajouter',
        element: <AdminAjoutComite/>,
        state: 'adminAjoutComite'
    },
    {
        path: '/admin/editions',
        element: <AdminEditions/>,
        state: 'adminEditions'
    },
    {
        path: '/admin/editions/ajouter',
        element: <AdminAjoutEdition/>,
        state: 'adminAjoutEdition',
    },
    {
        path: '/admin/categories',
        element: <AdminCategories/>,
        state: 'adminCategories'
    },
    {
        path: '/admin/categories/ajouter',
        element: <AdminAjoutCategorie/>,
        state: 'adminAjoutCategorie'
    }
]