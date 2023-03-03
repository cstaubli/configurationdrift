import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { Layout } from './components/Layout';
import './custom.css';
import { Login } from "./components/login.component"

export default class App extends Component {
    static displayName = App.name;

    render() {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            return (
                <Layout>
                    <Routes>
                        <Route path="/" element={<Login to="/login" replace={true} />}>
                            <Route path="login" element={<Login />} />
                            <Route
                                path="*"
                                element={<Login to="/" replace={true} />}
                            />
                        </Route>
                    </Routes>
                </Layout>
            )
        } else {
            return (
                <Layout>
                    <Routes>
                        {AppRoutes.map((route, index) => {
                            const { element, ...rest } = route;
                            return <Route key={index} {...rest} element={element} />;
                        })}
                    </Routes>
                </Layout>
            );
        }
    }
}
