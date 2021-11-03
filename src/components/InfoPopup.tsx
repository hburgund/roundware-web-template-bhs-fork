import { useRoundware } from '../hooks';
import React, { Fragment, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Typography from '@material-ui/core/Typography';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';

import pealeLogoSmall from '../assets/peale-text-white.png';
import assetMapGraphic from '../assets/bhs-map.jpg';

const InfoPopup = () => {
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div style={{ position: 'absolute', right: 10 }}>
			<Button onClick={handleClickOpen}>INFO</Button>
			<Dialog open={open} onClose={handleClose} aria-labelledby='alert-dialog-title' aria-describedby='alert-dialog-description'>
				<DialogTitle id='alert-dialog-title'>About Be Here Stories</DialogTitle>
				<DialogContent dividers>
					<Typography gutterBottom>
						This project, a collaboration with the Peale in Baltimore and
						the Museum on Main Street project of the Smithsonian Institution,
						preserves and shares authentic stories from diverse American
						communities. By providing a free and open platform for
						ocation-based storytelling, we aim to help the whole story
						of the United States be told and heard, and to bridge what is
						often called the "rural/urban divide" in the United States.
					</Typography>
					<Typography gutterBottom>
						If you are listening via the location-aware app, you will hear
						stories that were recorded around you. You can also use the Map
						feature in the Listen section of the app to play stories from
						locations and towns anywhere in the United States.
					</Typography>
					<Typography gutterBottom>
						Many stories that are recorded in this app are also published on the&nbsp;
						<Link href="www.MuseumOnMainStreet.org">
							Museum on Main Street website
						</Link> and included in the
						Smithsonian's "Stories from Main Street" archive. If at any point, storytellers
						wish to remove their stories, they may email us at&nbsp;
						<Link href="mailto:online@thePealeCenter.org">
							online@thePealeCenter.org
						</Link>.
					</Typography>
					<Typography gutterBottom>
						We reserve the right to remove content that violates copyright,
						trademark, or intellectual property, or promotes impersonation,
						unlawful conduct, harassment, or hate speech.
					</Typography>
					<Typography gutterBottom variant={"h6"}>
            Find Your Story on the Map
          </Typography>
          <a href="./listen">
            <img id="map" src={assetMapGraphic} style={{width: "100%"}} />
          </a>
          <hr />
          <img id="logo" src={pealeLogoSmall} style={{width: 300}} />
          <Typography gutterBottom>
            <em>Be Here Stories</em> is an initiative of the Peale in Baltimore, Maryland.
            The Peale is a 501(c)3 non-profit organization and is restoring the oldest
            museum building in the United States in partnership with the City of Baltimore.
            Through its programs, the Peale Center aims to illuminate authentic stories of
            Baltimore's people and places, while reinventing the civic museum in the
            creative and innovative spirit of its founder, artist Rembrandt Peale.
          </Typography>

					{/*<a href="./listen">
            <img id="map" src={assetMapGraphic} style={{width: "100%"}} />
          </a>
          <hr />*/}
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color='secondary' autoFocus>
						Close
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default InfoPopup;
