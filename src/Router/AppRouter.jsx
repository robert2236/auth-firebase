import React from "react";
import { Routes, Route, Navigate, redirect } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import Auth from "../Auth";
import Home from "../Home";
import { AuthProvider } from '../AuthContext';
import ResetPassword from "../Reset";

export function AppRouter() {
    return (
         <AuthProvider>
          <Routes>
            <Route exact path="/" element={<Auth />} /> 
            <Route exact path="/recuperar" element={<ResetPassword />} />           
            <Route>
              <Route
                path="/home"
                element={
                  <PrivateRoute>
                    <Home />
                  </PrivateRoute>
                }
              />
            </Route>
          </Routes>
        </AuthProvider>
    );
  }