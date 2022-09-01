import React, { useContext, useState } from 'react';
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
import AlertCollapse from '../components/AlertCollapse';
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

export default function SignIn() {
	const { loginUser } = useContext(AuthContext);

	const [alerts, setAlerts] = useState([]);

	return (
		<Grid container component="main" sx={{ height: '100vh' }}>
			<CssBaseline />
			<Grid
				item
				md={7}
				sm={4}
				xs={false}
				sx={{
					backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
					backgroundImage: 'url(/static/assets/bg.jpg)',
					backgroundPosition: 'center',
					backgroundRepeat: 'no-repeat',
					backgroundSize: 'cover',
				}}
			/>
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
					<Avatar src="/static/assets/logo-nobg.png" sx={{ m: 1, mt: 'auto' }} variant="square" />
					<Typography component="h1" variant="h5">
						Sign in
					</Typography>
					<Box noValidate component="form" onSubmit={(e) => loginUser(e, setAlerts)} sx={{ mt: 1 }}>
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
							autoComplete="username"
							id="username"
							label="Username"
							margin="normal"
							name="username"
						/>
						<TextField
							fullWidth
							required
							autoComplete="current-password"
							id="password"
							label="Password"
							margin="normal"
							name="password"
							type="password"
						/>
						<Button
							fullWidth
							sx={{ mt: 3, mb: 2 }}
							type="submit"
							variant="contained"
						>
							Sign in
						</Button>
						<Typography align="center" color="textSecondary" variant="body2">
							{'Don\'t have an account? '}
							<Link color="textSecondary" href="/signup">
								Sign up
							</Link>
						</Typography>
					</Box>
					<Copyright sx={{ mt: 'auto' }} />
				</Box>
			</Grid>
		</Grid>
	);
}

Copyright.propTypes = {
	sx: PropTypes.objectOf(PropTypes.string).isRequired,
};
