import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './components/AuthContext';
import Home from './pages/Home';
import Layout from './components/Layout';
import PrivateWrapper from './components/PrivateWrapper';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

const theme = createTheme({
	palette: {
		mode: 'dark',
		primary: {
			main: '#e7b56a',
			light: '#eecb96',
			dark: '#e09f3e',
		},
	},
});

export default function App() {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Router>
				<AuthProvider>
					<Routes>
						<Route element={<PrivateWrapper />}>
							<Route element={<Layout />}>
								<Route exact element={<Home />} path="/" />
							</Route>
						</Route>
						<Route element={<SignIn />} path="/signin" />
						<Route element={<SignUp />} path="/signup" />
					</Routes>
				</AuthProvider>
			</Router>
		</ThemeProvider>
	);
}
