import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import AuthContext from '../components/AuthContext';
import AlertCollapse from '../components/AlertCollapse';

function Copyright({ sx }) {
	return (
		<Typography
			align="center"
			color="textSecondary"
			sx={sx}
			variant="body2"
		>
			{'Copyright © '}
			<Link
				color="textSecondary"
				href="https://github.com/brunosag"
				rel="noreferrer"
				target="_blank"
			>
				Bruno Samuel
			</Link>
			{' '}
			{new Date().getFullYear()}
		</Typography>
	);
}

export default function SignUp() {
	const { loginUser } = useContext(AuthContext);
	const [alerts, setAlerts] = useState([]);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const response = await fetch('api/register/', {
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
		});
		const data = await response.json();

		if (response.status === 201) {
			loginUser(e);
		} else {
			const newAlerts = Object.values(data).map(
				(message, index) => Object.create({
					message,
					id: index,
					severity: 'error',
					open: true,
				}),
			);
			setAlerts(newAlerts);
		}
	};

	return (
		<Grid container component="main" sx={{ height: '100vh' }}>
			<CssBaseline />
			<Grid
				item
				md={5}
				sm={8}
				xs={12}
			>
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
					<Avatar
						src="/static/assets/logo-nobg.png"
						sx={{ m: 1, mt: 'auto' }}
						variant="square"
					/>
					<Typography component="h1" variant="h5">
						Sign up
					</Typography>
					<Box
						noValidate
						component="form"
						onSubmit={handleSubmit}
						sx={{ mt: 1 }}
					>
						<Box sx={{
							display: 'flex',
							flexDirection: 'column',
							gap: 1,
						}}
						>
							{alerts.map((alert) => (
								<AlertCollapse
									alert={alert}
									alerts={alerts}
									key={alert.id}
									setAlerts={setAlerts}
								/>
							))}
						</Box>
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
						<Typography
							align="center"
							color="textSecondary"
							variant="body2"
						>
							{'Already have an account? '}
							<Link
								color="textSecondary"
								component="button"
								onClick={() => navigate('/signin')}
							>
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
					backgroundColor: (t) => (t.palette.mode === 'light'
						? t.palette.grey[50] : t.palette.grey[900]),
					backgroundImage: 'url(/static/assets/bg.jpg)',
					backgroundPosition: 'center',
					backgroundRepeat: 'no-repeat',
					backgroundSize: 'cover',
				}}
			/>
		</Grid>
	);
}
