import React from 'react';
import { amber } from '@mui/material/colors';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import { AuthProvider } from './components/AuthContext';
import Home from './pages/Home';
import PrivateWrapper from './components/PrivateWrapper';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

const theme = createTheme({
	palette: {
		primary: amber,
	},
});

export default function App() {
	return (
		<ThemeProvider theme={theme}>
			<Router>
				<AuthProvider>
					<Routes>
						<Route element={<PrivateWrapper />}>
							<Route exact element={<Home />} path="/" />
						</Route>
						<Route element={<SignIn />} path="/signin" />
						<Route element={<SignUp />} path="/signup" />
					</Routes>
				</AuthProvider>
			</Router>
		</ThemeProvider>
	);
}
