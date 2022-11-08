import React, { forwardRef, useContext, useEffect, useState } from 'react';
import { grey } from '@mui/material/colors';
import { Outlet, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AuthContext from './AuthContext';

const Alert = forwardRef((props, ref) => (
	<MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

export default function Layout() {
	const { authTokens, logoutUser } = useContext(AuthContext);
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [anchorElNav, setAnchorElNav] = useState(null);
	const [anchorElBoards, setAnchorElBoards] = useState(null);
	const [boards, setBoards] = useState([]);
	const navigate = useNavigate();

	const getBoards = async () => {
		const response = await fetch('api/boards/', {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${String(authTokens.access)}`,
				'Content-Type': 'application/json',
			},
		});
		const data = await response.json();

		if (response.status === 200) {
			setBoards(data);
		} else if (response.statusText === 'Unauthorized') {
			logoutUser();
		}
	};

	useEffect(() => {
		getBoards();
	}, []);

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenBoardMenu = (event) => {
		setAnchorElBoards(event.currentTarget);
	};
	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};
	const handleCloseBoardMenu = () => {
		setAnchorElBoards(null);
	};

	const handleSnackbarOpen = () => setSnackbarOpen(true);
	const handleSnackbarClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setSnackbarOpen(false);
	};

	return (
		<Box sx={{
			height: '100vh',
			display: 'flex',
			flexDirection: 'column',
		}}
		>
			<AppBar color="transparent" elevation={0} position="static">
				<Container maxWidth="false">
					<Toolbar disableGutters>
						<Box
							onClick={() => navigate('/')}
							sx={{
								cursor: 'pointer',
								alignItems: 'center',
								display: 'flex',
								gap: 0.8,
								mr: 5,
							}}
						>
							<img
								alt="Apollo"
								height="28"
								src="/static/assets/logo-nobg.png"
							/>
							<Typography
								noWrap
								color="text.primary"
								variant="h5"
								sx={{
									fontWeight: 400,
								}}
							>
								Apollo
							</Typography>
						</Box>
						<Box
							sx={{
								display: { xs: 'flex', md: 'none' },
								ml: 'auto',
							}}
						>
							<IconButton
								aria-controls="menu-appbar"
								aria-haspopup="true"
								color="inherit"
								onClick={handleOpenNavMenu}
								size="large"
							>
								<MenuIcon />
							</IconButton>
							<Menu
								keepMounted
								anchorEl={anchorElNav}
								id="menu-appbar"
								onClose={handleCloseNavMenu}
								open={Boolean(anchorElNav)}
								anchorOrigin={{
									vertical: 'bottom',
									horizontal: 'left',
								}}
								sx={{
									display: { xs: 'block', md: 'none' },
								}}
								transformOrigin={{
									vertical: 'top',
									horizontal: 'left',
								}}
							>
								<Box
									sx={{
										alignItems: 'center',
										display: 'flex',
										justifyContent: 'space-between',
										px: 1,
										py: 0.125,
										width: 288,
									}}
								>
									<Box sx={{ height: 34, width: 34 }} />
									<Typography color="textSecondary">
										Navigation
									</Typography>
									<IconButton
										onClick={handleCloseNavMenu}
										size="small"
										sx={{ color: 'text.disabled' }}
									>
										<CloseIcon />
									</IconButton>
								</Box>
								<Divider sx={{ my: 1 }} />
								<MenuItem onClick={() => {
									navigate('/');
									handleCloseNavMenu();
								}}
								>
									<Typography textAlign="center">
										Home
									</Typography>
								</MenuItem>
								<MenuItem onClick={handleOpenBoardMenu}>
									<Typography textAlign="center">
										Boards
									</Typography>
									<KeyboardArrowDownIcon
										sx={{ color: 'text.disabled' }}
									/>
								</MenuItem>
								<MenuItem onClick={logoutUser}>
									<Typography textAlign="center">
										Logout
									</Typography>
								</MenuItem>
							</Menu>
						</Box>
						<Box
							sx={{
								flexGrow: 1,
								gap: 4,
								display: { xs: 'none', md: 'flex' },
							}}
						>
							<Button
								color="inherit"
								onClick={() => navigate('/')}
								sx={{
									fontSize: 16,
									my: 2,
									textTransform: 'capitalize',
								}}
							>
								Home
							</Button>
							<Box sx={{ flexGrow: 1 }}>
								<Button
									color="inherit"
									onClick={handleOpenBoardMenu}
									endIcon={(
										<KeyboardArrowDownIcon
											sx={{
												color: grey[500],
												ml: -0.8,
											}}
										/>
									)}
									sx={{
										fontSize: 16,
										my: 2,
										textTransform: 'capitalize',
									}}
								>
									Boards
								</Button>
								<Menu
									keepMounted
									anchorEl={anchorElBoards}
									id="menu-appbar"
									onClose={handleCloseBoardMenu}
									open={Boolean(anchorElBoards)}
									sx={{ mt: '45px' }}
									anchorOrigin={{
										vertical: 'top',
										horizontal: 'left',
									}}
								>
									<Box
										sx={{
											alignItems: 'center',
											display: 'flex',
											justifyContent: 'space-between',
											px: 1,
											py: 0.125,
											width: 288,
										}}
									>
										<Box sx={{ height: 34, width: 34 }} />
										<Typography color="textSecondary">
											Boards
										</Typography>
										<IconButton
											onClick={handleCloseBoardMenu}
											size="small"
											sx={{ color: 'text.disabled' }}
										>
											<CloseIcon />
										</IconButton>
									</Box>
									<Divider sx={{ my: 1 }} />
									{boards.map((board) => (
										<MenuItem
											key={board.id}
											onClick={() => {
												navigate(`/${board.id}`);
												handleCloseBoardMenu();
											}}
										>
											<Typography textAlign="center">
												{board.title}
											</Typography>
										</MenuItem>
									))}
								</Menu>
							</Box>
							<Button
								color="inherit"
								onClick={logoutUser}
								sx={{
									fontSize: 16,
									display: 'block',
									my: 2,
									textTransform: 'capitalize',
								}}
							>
								Logout
							</Button>
						</Box>
					</Toolbar>
				</Container>
			</AppBar>

			<Snackbar
				autoHideDuration={2000}
				onClose={handleSnackbarClose}
				open={snackbarOpen}
			>
				<Alert
					color="primary"
					onClose={handleSnackbarClose}
					severity="success"
					icon={(
						<CheckCircleOutlineIcon
							color="primary"
							fontSize="inherit"
						/>
					)}
					sx={{
						backgroundColor: 'background.default',
						width: '100%',
						color: 'text.primary',
					}}
				>
					Board deleted.
				</Alert>
			</Snackbar>
			<Outlet context={{ boards, getBoards, handleSnackbarOpen }} />
		</Box>
	);
}
