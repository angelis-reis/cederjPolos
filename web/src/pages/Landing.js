import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import '../styles/pages/landing.css';
import logoImg from '../images/logo_cederj.jpg';
import { Link } from 'react-router-dom';

function Landing() {
	return (
		<div id='page-landing'>
			<div className='content-wrapper'>
				<div className='logo-wrapper'>
					<img src={logoImg} alt='Mapa CEDERJ' />
					<span>
						POLOS <br></br>CEDERJ
					</span>
				</div>

				<main>
					<h1>
						Mapa com a localização dos 35 polos do CEDERJ e das
						estruturas no seu entorno
					</h1>

					<p>Construção colaborativa, de estudates para estudante</p>
				</main>

				<div className='location'>
					<span>Estado do</span>
					<span>Rio de Janeiro</span>
				</div>

				<Link to='/app' className='enter-app'>
					<FiArrowRight size={26} color='rgba(0, 0, 0, 0.6)' />
				</Link>
			</div>
		</div>
	);
}

export default Landing;
