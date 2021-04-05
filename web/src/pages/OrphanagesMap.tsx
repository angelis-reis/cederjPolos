import React, { useEffect, useState } from 'react';
import { Link} from 'react-router-dom';
import {FiArrowRight, FiPlus} from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup} from 'react-leaflet';
import api from '../services/api';
import mapMarkerImg from '../images/map-marker.svg';
import mapIcon from '../utils/mapIcon';
import poloIcon from '../utils/mapIcon.png';
import '../styles/pages/orphanages-map.css';


interface Orphanage{
    id: number;
    latitude: number;
    longitude: number;
    name: string;
};

function OrphanagesMap() {

    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);
    
    useEffect( () => {
        api.get('orphanages').then(response => {
            setOrphanages(response.data);
        });
    }, [ ]);

    return( 
        <div id="page-map">
            <aside>
                <header>
                    <img className="polo-icon" src={poloIcon} alt="Marcador Polo"/>

                    <h2>Escolha um polo no mapa</h2>
                    <p>São 35 polos por todo o Estado do RJ</p>
                </header>
                <footer>
                    <strong>Rio de Janeiro</strong>
                    
                </footer>
            </aside>

            <Map 
                center={[-22.8000,-42.5337]} 
                zoom={9} 
                style={{width: '100%', height:'100%'}}>

                {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}

                <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />

                
                
                {orphanages.map(orphanage =>{
                    return(
                        <Marker key= {orphanage.id} icon= {mapIcon} position = {[orphanage.latitude, orphanage.longitude]} >
                    
                            <Popup closeButton = {false} minWidth={240} maxWidth={240} className='map-popup'>
                                {orphanage.name}

                                <Link to={`/orphanages/${orphanage.id}`}>
                                    <FiArrowRight size={20} color = "#fff"/>

                                </Link>

                                {/* <Link to={`/orphanages/create`}>
                                    <FiArrowRight size={20} color = "#fff"/>

                                </Link> */}

                                

                            </Popup> 

                        </Marker>
                    )
                })}

            </Map>
            <Link to="/orphanages/create" className="create-orphanage">
                <FiPlus size="32" color="#FFF" />
            </Link>
        </div>
    )
}

export default OrphanagesMap;