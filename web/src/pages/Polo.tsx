import React, {useEffect, useState} from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo  } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";
import { useHistory, useParams } from "react-router-dom";
import '../styles/pages/polo.css';
import Sidebar from "../components/Sidebar";
import mapIcon from "../utils/mapIcon";
import api from '../services/api';
import PolosMap from "./CreatePolo";

interface Polo {
  latitude: number;
  longitude: number;
  name: string;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: string;
  images: Array<{
    url: string;
    id: number;
  }>;
};

interface PoloParams {
  id: string;
}

export default function Polo() {

  const params = useParams<PoloParams>();
  const [polo, setPolo] = useState<Polo>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
    
  useEffect( () => {
      api.get(`polos/${params.id}`).then(response => {
          setPolo(response.data);
          console.log(response.data);
      });
  }, [params.id]);

  if (!polo) {
    return <p>Carregando ...</p>;
  }
  
  return (
    <div id="page-polo">
      <Sidebar /> 
      <main>
        <div className="polo-details"> 
          <img src={polo.images[activeImageIndex].url} alt={polo.name} />

          <div className="images">
            {polo.images.map((image, index)=> {
              return (
                <button 
                  key ={image.id} 
                  className= {activeImageIndex === index ? 'active' : ''}
                  type="button"
                  onClick={() => {
                    setActiveImageIndex(index);
                  }}
                >
                  <img src={image.url} alt={polo.name} />
                 </button>
              );
            })}
          </div>

          <div className="polo-details-content">
            <h1>
              {polo.name}
            </h1>
            <p>
              {polo.about}
            </p>

            <div className="map-container">
              <Map 
                center={[polo.latitude,polo.longitude]} 
                zoom={16} 
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer 
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} 
                />

                <Marker interactive={false} icon={mapIcon} position={[polo.latitude,polo.longitude]} />
              </Map>

              <footer>
                <a target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${polo.latitude},${polo.longitude}`}
                >Ver rotas no Google Maps
                </a>
              </footer>
            </div>
            <hr/>
            <h2>Instruções para visita</h2>
            <p>{polo.instructions}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                {polo.opening_hours}
              </div>

              { polo.open_on_weekends ? (

                <div className="open-on-weekends">
                  <FiInfo size={32} color="#39CC83" />
                  Atendemos <br />
                  fim de semana
                </div>

              ) : (

                <div className="open-on-weekends dont-open">
                  <FiInfo size={32} color="#FF669D" />
                  Não atendemos <br />
                  fim de semana
                </div>

              )}
              
            </div>

            {/* <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button> */}
          </div>
        </div>
      </main>
    </div>
  );  
}