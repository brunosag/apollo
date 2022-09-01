import React, { useState } from 'react';
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';

export default function AlertCollapse({ alert, alerts, setAlerts }) {
	const [open, setOpen] = useState(alert.open);

	return (
		<Collapse in={open}>
			<Alert
				severity={alert.severity}
				action={(
					<IconButton
						aria-label="close"
						color="inherit"
						size="small"
						onClick={() => {
							setOpen(false);
							setTimeout(() => {
								const newAlerts = alerts.map((item) => {
									if (item.id === alert.id) {
										return { ...item, open: false };
									}
									return item;
								});
								setAlerts(newAlerts);
							}, 300);
						}}
					>
						<CloseIcon fontSize="inherit" />
					</IconButton>
				)}
			>
				{alert.message}
			</Alert>
		</Collapse>
	);
}
