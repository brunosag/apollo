/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable no-alert */
import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

const AuthContext = createContext();

export default AuthContext;

export function AuthProvider({ children }) {
	const [authTokens, setAuthTokens] = useState(() => (localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null));
	const [user, setUser] = useState(() => (localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null));
	const [loading, setLoading] = useState(true);

	const baseURL = 'http://127.0.0.1:8000/api/';
	const navigate = useNavigate();

	const loginUser = async (e, setAlerts) => {
		e.preventDefault();

		const response = await fetch(`${baseURL}token/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username: e.target.username.value,
				password: e.target.password.value,
			}),
		});
		const data = await response.json();

		if (response.status === 200) {
			setAuthTokens(data);
			setUser(jwtDecode(data.access));
			localStorage.setItem('authTokens', JSON.stringify(data));
			navigate('/');
		} else {
			const alerts = Object.values(data).map((message, index) => Object.create({
				message,
				id: index,
				severity: 'error',
				open: true,
			}));
			setAlerts(alerts);
		}
	};

	const logoutUser = () => {
		setAuthTokens(null);
		setUser(null);
		localStorage.removeItem('authTokens');
		navigate('/signin');
	};

	const updateToken = async () => {
		if (authTokens) {
			const response = await fetch(`${baseURL}token/refresh/`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ refresh: authTokens ? authTokens.refresh : null }),
			});
			const data = await response.json();

			if (response.status === 200) {
				setAuthTokens(data);
				setUser(jwtDecode(data.access));
				localStorage.setItem('authTokens', JSON.stringify(data));
			} else {
				logoutUser();
			}
		}

		if (loading) {
			setLoading(false);
		}
	};

	const contextData = {
		user,
		authTokens,
		loginUser,
		logoutUser,
	};

	useEffect(() => {
		if (loading) {
			updateToken();
		}

		const interval = setInterval(() => {
			if (authTokens) {
				updateToken();
			}
		}, 4 * 60 * 1000);

		return () => clearInterval(interval);
	}, [authTokens, loading]);

	return (
		<AuthContext.Provider value={contextData}>
			{loading ? null : children}
		</AuthContext.Provider>
	);
}