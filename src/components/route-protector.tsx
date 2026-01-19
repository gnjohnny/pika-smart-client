import { Navigate, Outlet, useLocation } from "react-router";

const ProtectRoutes = ({
    isAllowed,
    redirectPath = "/sign-in",
    children,
}: ProtectRoutesPropTypes) => {
    const location = useLocation();
    if (!isAllowed) {
        return (
            <Navigate
                to={redirectPath}
                state={{ from: location.pathname }}
                replace
            />
        );
    }
    return children ? children : <Outlet />;
};

export default ProtectRoutes;