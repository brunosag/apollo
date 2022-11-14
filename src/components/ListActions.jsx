import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Typography from '@mui/material/Typography';

export default function ListActions(
	{
		deleteList,
		list,
		listActionsDialogRef,
		listActionsMenuRef,
		listActionsRef,
	},
) {
	const [anchorEl, setAnchorEl] = useState(null);
	const [dialogOpen, setDialogOpen] = useState(false);
	const open = Boolean(anchorEl);

	const handleClick = (e) => setAnchorEl(e.currentTarget);
	const handleClose = () => setAnchorEl(null);

	const handleDelete = () => {
		deleteList(list);
		handleClose();
	};

	const handleDialogClose = () => setDialogOpen(false);
	const handleDialogOpen = () => {
		if (list.cards.length !== 0) {
			setDialogOpen(true);
		} else {
			handleDelete();
		}
		handleClose();
	};

	return (
		<div ref={listActionsRef}>
			<Button
				aria-controls={open ? 'list-actions-menu' : undefined}
				aria-expanded={open ? 'true' : undefined}
				aria-haspopup="true"
				color="inherit"
				id="list-actions-button"
				onClick={handleClick}
				size="small"
				sx={{
					':hover': {
						backgroundColor: '#2a2a2a',
					},
					minWidth: 0,
					padding: 0.75,
				}}
			>
				<MoreHorizIcon
					fontSize="small"
					sx={{ color: 'grey.600' }}
				/>
			</Button>

			<Menu
				anchorEl={anchorEl}
				id="list-actions-menu"
				onClose={handleClose}
				open={open}
				ref={listActionsMenuRef}
				sx={{ mt: 1 }}
				MenuListProps={{
					'aria-labelledby': 'list-actions-button',
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
					<Typography color="textSecondary">List actions</Typography>
					<IconButton
						onClick={handleClose}
						size="small"
						sx={{ color: 'text.disabled' }}
					>
						<CloseIcon />
					</IconButton>
				</Box>
				<Divider sx={{ my: 1 }} />
				<MenuItem
					onClick={handleDialogOpen}
					sx={{ color: 'error.main' }}
				>
					Delete list
				</MenuItem>
			</Menu>

			<Dialog
				aria-describedby="alert-dialog-description"
				aria-labelledby="alert-dialog-title"
				onClose={handleDialogClose}
				open={dialogOpen}
				ref={listActionsDialogRef}
			>
				<DialogTitle id="alert-dialog-title">
					Delete list?
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						All cards in this list will be deleted.
						This is not reversible.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						color="inherit"
						onClick={handleDialogClose}
						sx={{ color: 'text.secondary' }}
					>
						Cancel
					</Button>
					<Button
						autoFocus
						color="error"
						onClick={handleDelete}
					>
						Delete
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
