import React, { useContext } from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import AuthContext from '../components/AuthContext';

function Copyright({ sx }) {
	return (
		<Typography align="center" color="textSecondary" sx={sx} variant="body2">
			{'Copyright © '}
			<Link color="textSecondary" href="https://github.com/brunosag" rel="noreferrer" target="_blank">
				Bruno Samuel
			</Link>
			{' '}
			{new Date().getFullYear()}
		</Typography>
	);
}

export default function SignUp() {
	const { loginUser } = useContext(AuthContext);

	const baseURL = 'http://127.0.0.1:8000/api/';

	const handleSubmit = (e) => {
		e.preventDefault();

		fetch(`${baseURL}register/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username: e.target.username.value,
				email: e.target.email.value,
				password: e.target.password.value,
				confirmation: e.target.confirmation.value,
			}),
		})
			.then(() => loginUser(e));
	};

	return (
		<Grid container component="main" sx={{ height: '100vh' }}>
			<CssBaseline />
			<Grid item square component={Paper} elevation={6} md={5} sm={8} xs={12}>
				<Box
					sx={{
						alignItems: 'center',
						display: 'flex',
						flexDirection: 'column',
						height: '100vh',
						justifyContent: 'center',
						px: 4,
						py: 8,
					}}
				>
					<Avatar src="logo-nobg.png" sx={{ m: 1, mt: 'auto' }} variant="square" />
					<Typography component="h1" variant="h5">
						Sign up
					</Typography>
					<Box noValidate component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
						<TextField
							autoFocus
							fullWidth
							required
							id="username"
							label="Username"
							margin="normal"
							name="username"
						/>
						<TextField
							fullWidth
							required
							id="email"
							label="Email Address"
							margin="normal"
							name="email"
						/>
						<TextField
							fullWidth
							required
							id="password"
							label="Password"
							margin="normal"
							name="password"
							type="password"
						/>
						<TextField
							fullWidth
							required
							id="confirmation"
							label="Confirm Password"
							margin="normal"
							name="confirmation"
							type="password"
						/>
						<Button
							fullWidth
							sx={{ mt: 3, mb: 2 }}
							type="submit"
							variant="contained"
						>
							Sign up
						</Button>
						<Typography align="center" color="textSecondary" variant="body2">
							{'Already have an account? '}
							<Link color="textSecondary" href="/signin">
								Sign in
							</Link>
						</Typography>
					</Box>
					<Copyright sx={{ mt: 'auto' }} />
				</Box>
			</Grid>
			<Grid
				item
				md={7}
				sm={4}
				xs={false}
				sx={{
					backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
					backgroundImage: 'url(bg.jpg)',
					backgroundPosition: 'center',
					backgroundRepeat: 'no-repeat',
					backgroundSize: 'cover',
				}}
			/>
		</Grid>
	);
}

Copyright.propTypes = {
	sx: PropTypes.objectOf(PropTypes.string).isRequired,
};
