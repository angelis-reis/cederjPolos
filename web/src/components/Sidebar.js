import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import mapMarkerImg from '../images/map-marker.svg';
import poloIcon from '../utils/mapIcon.png';
import '../styles/components/sidebar.css';

export default function Sidebar() {
	const { goBack } = useHistory();
	return (
		<aside className='app-sidebar'>
			<img src={poloIcon} alt='Icone Polo' />
			<footer>
				<button type='button' onClick={goBack}>
					<FiArrowLeft size={24} color='#FFF' />
				</button>
			</footer>
		</aside>
	);
}
