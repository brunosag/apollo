import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
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

export default function SignIn() {
	const { loginUser, loginDemoUser } = useContext(AuthContext);
	const [alerts, setAlerts] = useState([]);
	const navigate = useNavigate();

	return (
		<Grid container component="main" sx={{ height: '100vh' }}>
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
						py: 4,
					}}
				>
					<Avatar
						src="/static/assets/logo-nobg.png"
						sx={{ m: 1, mt: 'auto' }}
						variant="square"
					/>
					<Typography component="h1" variant="h5">
						Sign in
					</Typography>
					<Box sx={{
						display: 'flex',
						flexDirection: 'column',
						gap: 1,
						mt: 1,
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
					<Box
						noValidate
						component="form"
						onSubmit={(e) => loginUser(e, setAlerts)}
					>
						<TextField
							autoFocus
							fullWidth
							required
							autoComplete="username"
							id="username"
							inputProps={{ maxLength: 150 }}
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
							sx={{ mt: 3, mb: 1 }}
							type="submit"
							variant="contained"
						>
							Sign in
						</Button>
					</Box>
					<Box
						noValidate
						component="form"
						onSubmit={(e) => loginDemoUser(e, setAlerts)}
						sx={{ width: '100%' }}
					>
						<Button
							color="inherit"
							type="submit"
							variant="contained"
							sx={{
								':hover': {
									backgroundColor: '#2a2a2a',
								},
								backgroundColor: 'grey.900',
								mb: 3,
								mt: 0,
								width: '100%',
							}}
						>
							<Typography
								color="grey.500"
								fontSize={14}
								fontWeight={500}
								lineHeight={1.75}
							>
								Sign in with demo user
							</Typography>
						</Button>
					</Box>
					<Typography
						align="center"
						color="textSecondary"
						variant="body2"
					>
						{'Don\'t have an account? '}
						<Link
							color="textSecondary"
							onClick={() => navigate('/signup')}
							sx={{ cursor: 'pointer' }}
						>
							Sign up
						</Link>
					</Typography>
					<Copyright sx={{ mt: 'auto' }} />
				</Box>
			</Grid>
		</Grid>
	);
}
