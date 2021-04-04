import React, { useEffect, useState } from 'react';
import { Link} from 'react-router-dom';
import {FiArrowRight, FiPlus} from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup} from 'react-leaflet';

import api from '../services/api';
 



import mapMarkerImg from '../images/map-marker.svg';
import mapIcon from '../utils/mapIcon';

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
                    <img src={mapMarkerImg} alt="Logo Happy"/>

                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando sua visita :)</p>
                </header>
                <footer>
                    <strong>Rio de Janeiro</strong>
                    <span>Rio de Janeiro</span>
                </footer>
            </aside>

            <Map 
                center={[-22.9732698,-43.2032649]} 
                zoom={14} 
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


// paramos no ep 3 47:40 no momento de colocar as infomações dinâmicas na página de cada orfanato