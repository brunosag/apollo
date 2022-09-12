import React, { useContext, useEffect, useState } from 'react';
import { grey } from '@mui/material/colors';
import { Outlet } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AuthContext from './AuthContext';

export default function Layout() {
	const { authTokens, logoutUser } = useContext(AuthContext);
	const [boards, setBoards] = useState([]);

	const [anchorElNav, setAnchorElNav] = React.useState(null);
	const [anchorElBoards, setAnchorElBoards] = React.useState(null);

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenBoardsMenu = (event) => {
		setAnchorElBoards(event.currentTarget);
	};
	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};
	const handleCloseBoardsMenu = () => {
		setAnchorElBoards(null);
	};

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

	return (
		<Box>
			<AppBar color="transparent" elevation={0} position="static">
				<Container maxWidth="lg">
					<Toolbar disableGutters>
						<Box
							component="a"
							href="/"
							sx={{
								alignItems: 'center',
								display: 'flex',
								gap: 0.8,
								mr: 5,
								textDecoration: 'none',
							}}
						>
							<img
								alt="Apollo"
								height="28"
								src="/static/assets/logo-nobg.png"
							/>
							<Typography
								noWrap
								variant="h5"
								sx={{
									color: grey[800],
									fontWeight: 500,
								}}
							>
								Apollo
							</Typography>
						</Box>
						<Box sx={{ display: { xs: 'flex', md: 'none' }, ml: 'auto' }}>
							<IconButton
								aria-controls="menu-appbar"
								aria-haspopup="true"
								aria-label="account of current user"
								color="inherit"
								onClick={handleOpenNavMenu}
								size="large"
							>
								<MenuIcon sx={{ color: grey[800] }} />
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
								<MenuItem onClick={handleCloseNavMenu}>
									<Typography textAlign="center">Home</Typography>
								</MenuItem>
								<MenuItem onClick={handleCloseNavMenu}>
									<Typography textAlign="center">Boards</Typography>
								</MenuItem>
								<MenuItem onClick={logoutUser}>
									<Typography textAlign="center">Logout</Typography>
								</MenuItem>
							</Menu>
						</Box>
						<Box sx={{ flexGrow: 1, gap: 4, display: { xs: 'none', md: 'flex' } }}>
							<Button
								color="inherit"
								href="/"
								sx={{
									color: grey[800],
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
									onClick={handleOpenBoardsMenu}
									endIcon={(
										<KeyboardArrowDownIcon
											sx={{
												color: grey[400],
												ml: -0.8,
											}}
										/>
									)}
									sx={{
										color: grey[800],
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
									onClose={handleCloseBoardsMenu}
									open={Boolean(anchorElBoards)}
									sx={{ mt: '45px' }}
									anchorOrigin={{
										vertical: 'top',
										horizontal: 'right',
									}}
									transformOrigin={{
										vertical: 'top',
										horizontal: 'right',
									}}
								>
									{boards.map((board) => (
										<MenuItem key={board} onClick={handleCloseBoardsMenu}>
											<Typography textAlign="center">{board}</Typography>
										</MenuItem>
									))}
								</Menu>
							</Box>
							<Button
								color="inherit"
								onClick={logoutUser}
								sx={{
									fontSize: 16,
									color: grey[800],
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
			<Outlet />
		</Box>
	);
}
