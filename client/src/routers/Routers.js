import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Admin from "scenes/admin";

import Breakdown from "scenes/breakdown";
import Customers from "scenes/customers";
import Daily from "scenes/daily";

import Dashboard from "scenes/dashboard";
import Geography from "scenes/geography";
import Layout from "scenes/layout";
import Monthly from "scenes/monthly";
import Overview from "scenes/overview";
import Products from "scenes/products";
import Transactions from "scenes/transactions";
import Performance from "scenes/performance";
import Login from "scenes/login";
import SignUp from "scenes/signup";
import RouteProtect from "./RouteProtect";

const Routers = () => {
    return (
        <Routes>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route
                element={
                    <RouteProtect>
                        <Layout />
                    </RouteProtect>
                }
            >
                <Route
                    path="/"
                    element={<Navigate to="/dashboard" replace />}
                />
                <Route
                    path="/dashboard"
                    element={
                        <RouteProtect>
                            <Dashboard />
                        </RouteProtect>
                    }
                />
                <Route
                    path="/products"
                    element={
                        <RouteProtect>
                            <Products />
                        </RouteProtect>
                    }
                />
                <Route
                    path="/customers"
                    element={
                        <RouteProtect>
                            <Customers />
                        </RouteProtect>
                    }
                />
                <Route
                    path="/transactions"
                    element={
                        <RouteProtect>
                            <Transactions />
                        </RouteProtect>
                    }
                />
                <Route
                    path="/geography"
                    element={
                        <RouteProtect>
                            <Geography />
                        </RouteProtect>
                    }
                />
                <Route
                    path="/overview"
                    element={
                        <RouteProtect>
                            <Overview />
                        </RouteProtect>
                    }
                />
                <Route
                    path="/daily"
                    element={
                        <RouteProtect>
                            <Daily />
                        </RouteProtect>
                    }
                />
                <Route
                    path="/monthly"
                    element={
                        <RouteProtect>
                            <Monthly />
                        </RouteProtect>
                    }
                />
                <Route
                    path="/breakdown"
                    element={
                        <RouteProtect>
                            <Breakdown />
                        </RouteProtect>
                    }
                />
                <Route
                    path="/admin"
                    element={
                        <RouteProtect>
                            <Admin />
                        </RouteProtect>
                    }
                />
                <Route
                    path="/performance"
                    element={
                        <RouteProtect>
                            <Performance />
                        </RouteProtect>
                    }
                />
            </Route>
        </Routes>
    );
};

export default Routers;
