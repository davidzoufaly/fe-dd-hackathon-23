// (C) 2023 GoodData Corporation

import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import { LoginPage } from "./pages/LoginPage.js";
import { AppRoutes } from "./constants/constants.js";
import { PrivateRoute } from "./components/PrivateRoute.js";
import { Workspaces } from "./pages/Workspaces.js";
import { Environments } from "./pages/Environments.js";
import { UserFilters } from "./pages/UserFilters.js";
import { WorkspaceDetail } from "./pages/WorkspaceDetail.js";

const colors = {
    primary: "#D53F8C",
    primaryDarker: "#A8336E",
};

export const App: React.FC = () => {
    const theme = extendTheme({ colors });

    return (
        <ChakraProvider theme={theme}>
            <BrowserRouter>
                <Routes>
                    <Route path={AppRoutes.Login} Component={LoginPage} />
                    <Route
                        path={AppRoutes.Workspaces}
                        element={
                            <PrivateRoute>
                                <Workspaces />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path={`${AppRoutes.Workspaces}/:workspaceId`}
                        element={
                            <PrivateRoute>
                                <WorkspaceDetail />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path={AppRoutes.Environments}
                        element={
                            <PrivateRoute>
                                <Environments />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path={AppRoutes.UserFilters}
                        element={
                            <PrivateRoute>
                                <UserFilters />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path={AppRoutes.FallBack}
                        element={<Navigate to={AppRoutes.Workspaces} replace={true} />}
                    />
                </Routes>
            </BrowserRouter>
        </ChakraProvider>
    );
};
