import {ReactNode, useEffect} from "react";
import {Route, Routes, useNavigate} from "react-router-dom";
import PageWrapper from "../components/layout/PageWrapper";
import {appRoutes} from "./appRoutes";
import {RouteType} from "./config";
import {useAppSelector} from "../redux/store";
import MainLayout from "../components/layout/MainLayout";

const generateRoute = (routes: RouteType[]): ReactNode => {
    return routes.map((route, index) =>
        route.index ? (
            <Route
                index
                path={route.path}
                element={<PageWrapper state={route.state}>{route.element}</PageWrapper>}
                key={index}
            />
        ) : (
            <Route
                path={route.path}
                element={
                    <PageWrapper state={route.child ? undefined : route.state}>
                        {route.element}
                    </PageWrapper>
                }
                key={index}
            >
                {route.child && generateRoute(route.child)}
            </Route>
        )
    );
};

export const AppRoutes = () => {
    const role = useAppSelector(state => state.auth.role);

    const navigate = useNavigate();

    const routes = appRoutes(role);

    useEffect(() => {
        console.log('Role', role);
        if (role) {
            navigate('/');
        }
    }, [role]);

    return (
        <Routes>
            <Route path="/" element={<MainLayout/>}>
                {generateRoute(routes)}
            </Route>
        </Routes>
    )
}