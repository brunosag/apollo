import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from './AuthContext';

export default function PrivateWrapper() {
	const { user } = useContext(AuthContext);
	return user ? <Outlet /> : <Navigate to="/signin" />;
}
