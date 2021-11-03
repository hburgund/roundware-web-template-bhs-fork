import React, { useState } from 'react';
import { useRoundware } from '../../hooks';
import 'date-fns';
import moment from 'moment';
import clsx from 'clsx';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import FilterListIcon from '@material-ui/icons/FilterList';
import LabelIcon from '@material-ui/icons/Label';
import TagFilterMenu from '../AssetFilterPanel/TagFilterMenu';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

const useStyles = makeStyles((theme) => ({
	list: {
		width: 300,
		[theme.breakpoints.down(350)]: {
			width: 250,
		},
	},
	fullList: {
		width: 'auto',
	},
}));

const ListenFilterDrawer = () => {
	const classes = useStyles();

	const [state, setState] = useState<{ top: boolean; left: boolean; bottom: boolean; right: boolean; filter?: string }>({
		top: false,
		left: false,
		bottom: false,
		right: false,
	});

	const { roundware, afterDateFilter, setAfterDateFilter, beforeDateFilter, setBeforeDateFilter } = useRoundware();
	if (!(roundware.uiConfig && roundware.uiConfig.listen)) {
		return null;
	}

	const handleAfterDateChange = (date: MaterialUiPickersDate, value?: string | null | undefined): void => {
		if (!date) return;
		setAfterDateFilter(moment(date).format());
		if (!roundware.mixer) {
			return;
		} else {
			roundware.mixer.updateParams({
				startDate: date,
			});
			const trackIds = Object.keys(roundware?.mixer?.playlist?.trackIdMap || {}).map((id) => parseInt(id));
			trackIds.forEach((audioTrackId) => roundware.mixer.skipTrack(audioTrackId));
		}
	};

	const handleBeforeDateChange = (date: MaterialUiPickersDate, value?: string | null | undefined) => {
		if (!date) return;
		setBeforeDateFilter(moment(date).format());
		if (!roundware.mixer) {
			return;
		} else {
			roundware.mixer.updateParams({
				endDate: date,
			});
			const trackIds = Object.keys(roundware?.mixer?.playlist?.trackIdMap || {}).map((id) => parseInt(id));
			trackIds.forEach((audioTrackId) => roundware.mixer.skipTrack(audioTrackId));
		}
	};

	const toggleDrawer = (anchor: string, open: boolean) => (event?: any) => {
		if (event?.type === 'keydown' && (event?.key === 'Tab' || event?.key === 'Shift')) {
			return;
		}
		setState({ ...state, [anchor]: open });
	};

	const list = (anchor: string) => (
		<div
			className={clsx(classes.list, {
				[classes.fullList]: anchor === 'top' || anchor === 'bottom',
			})}
			role='presentation'
			onClick={toggleDrawer(anchor, false)}
			onKeyDown={toggleDrawer(anchor, false)}
		>
			<List>
				<ListItem>
					<Typography variant={'subtitle1'}>Filter Recordings</Typography>
				</ListItem>
			</List>
			<Divider />
			<List>
				{/*<ListItem>
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						<KeyboardDatePicker
							disableToolbar
							variant='inline'
							format='MM/dd/yyyy'
							margin='normal'
							id='start-date-picker-inline'
							label='Start Date'
							value={afterDateFilter}
							onChange={handleAfterDateChange}
							KeyboardButtonProps={{
								'aria-label': 'change start date',
							}}
						/>
					</MuiPickersUtilsProvider>
				</ListItem>
				<ListItem>
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						<KeyboardDatePicker
							disableToolbar
							variant='inline'
							format='MM/dd/yyyy'
							margin='normal'
							id='end-date-picker-inline'
							label='End Date'
							value={beforeDateFilter}
							onChange={handleBeforeDateChange}
							KeyboardButtonProps={{
								'aria-label': 'change end date',
							}}
						/>
					</MuiPickersUtilsProvider>
				</ListItem>
				<Divider />*/}
				<ListItem key='tags-header'>
					<ListItemIcon>
						<LabelIcon />
					</ListItemIcon>
					<ListItemText primary='Filter by Tags' />
				</ListItem>
				{roundware &&
					roundware.uiConfig &&
					Array.isArray(roundware.uiConfig.listen) &&
					roundware.uiConfig.listen.map((tg) => (
						<ListItem key={'list-item' + tg.group_short_name}>
							<TagFilterMenu key={tg.group_short_name} tag_group={tg} />
						</ListItem>
					))}
			</List>
		</div>
	);

	return (
		<>
			<React.Fragment key={'filter'}>
				<Button onClick={toggleDrawer('filter', true)}>
					<FilterListIcon fontSize='large' />
				</Button>
				<Drawer anchor={'right'} open={Boolean(state['filter'])} onClose={toggleDrawer('filter', false)}>
					{list('right')}
				</Drawer>
			</React.Fragment>
		</>
	);
};

export default ListenFilterDrawer;
