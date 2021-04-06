import React, { ChangeEvent, FormEvent, useState} from "react";
import { Map, Marker, TileLayer} from 'react-leaflet';
import { LeafletMouseEvent} from 'leaflet';
import { FiPlus } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import mapIcon from "../utils/mapIcon";
import '../styles/pages/create-orphanage.css';
import api from "../services/api";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import RadioButton from "../components/RadioButton";



export default function OrphanagesMap() { 
  // as const são estados criados

  const history = useHistory();

  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [instructions, setInstructions] = useState('');
  const [opening_hours, setOpeningHours] = useState('');
  const [open_on_weekends, setOpenOnWeekends] = useState(true);
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  function handleMapClick(event: LeafletMouseEvent) {

    const { lat, lng } = event.latlng;

    setPosition({
      latitude: lat,
      longitude: lng,
    });
  }

  async function handleSubmit(event: FormEvent) {
// previne o funcionamento padrão do formulário html que abre outra pagina ao enviar o form

    event.preventDefault();

    const { latitude, longitude} = position;
    const data = new FormData();

    data.append('name', name);
    data.append('about', about);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('instructions', instructions);
    data.append('opening_hours', opening_hours);
    data.append('open_on_weekends', String(open_on_weekends));
    
    images.forEach(image => {
      data.append('images', image);
    })

    await api.post('orphanages', data);
    alert ('Cadastro realizado com sucesso')
    history.push('/app');

    // console.log({
    //   name,
    //   about, 
    //   latitude,
    //   longitude,
    //   instructions,
    //   opening_hours,
    //   open_on_weekends,
    //   images
    // });
     
  }

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {

    if (!event.target.files) {
      return;
    }

    const selectedImages = Array.from(event.target.files);

    setImages(selectedImages);

    const selectedImagesPreview = selectedImages.map(image => {
      return URL.createObjectURL(image )
    });

    setPreviewImages(selectedImagesPreview);
  }
 
  return (
    <div id="page-create-orphanage">
      <Sidebar />

      <main>
        <form onSubmit={handleSubmit} className="create-orphanage-form">

          <fieldset>
            <legend>Dados do Polo</legend>
            <Map 
              center={[-22.8000,-42.5337]} 
              zoom={8} 
              style={{width: '100%', height:'400px'}}
              onclick={handleMapClick}
            >

              <TileLayer 
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} 
              />

              {/* if em Typescript quando não tenho o else */}
              { position.latitude !== 0 &&(

                <Marker 
                  interactive={false} 
                  icon={mapIcon} 
                  position= {[
                    position.latitude,
                    position.longitude
                  ]}
                />
              )}
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome do Polo</label>
              <input 
                id="name"
                value={name}
                onChange={event => setName(event.target.value)}  
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">Endereço do Polo </label>
              <textarea
                id="about"
                maxLength={300} 
                value={about}
                onChange={event => setAbout(event.target.value)}  
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">

                {previewImages.map(image => {
                  return (
                    <img key={image} src={image} alt={name} />
                  )
                })}

                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>

              </div>

              <input multiple onChange={handleSelectImages} type="file" id="image[]" />
              
            </div>
          </fieldset>

          <fieldset>
            {/* <legend>Informações</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea 
                id="instructions"
                value={instructions}
                onChange={event => setInstructions(event.target.value)} 
                
              />
            </div> */}

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de funcionamento</label>
              <input 
                id="opening_hours" 
                value={opening_hours}
                onChange={event => setOpeningHours(event.target.value)} 
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Contatos do Polo</label>

              <input className="email"
                id="opening_hours" 
                value={opening_hours}
                placeholder="E-mail"
                onChange={event => setOpeningHours(event.target.value)} 
              />

              <input 
                id="opening_hours" 
                value={opening_hours}
                placeholder="Telefone"
                onChange={event => setOpeningHours(event.target.value)} 
              />

            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Cursos oferecidos no Polo</label>

              <div className="button-select">

                <RadioButton name={ "Tecnologia em Sistema da Computação" } />

                <RadioButton name={" Licenciatura em Biologia"}  />

                <RadioButton name={"Tecnologia em Sistema da Computação"}  />

                <RadioButton name={" Licenciatura em Biologia"}  />

                <RadioButton name={"Tecnologia em Sistema da Computação"} />

                <RadioButton name={" Licenciatura em Biologia"} />

                <RadioButton name={"Tecnologia em Sistema da Computação"} />

                <RadioButton name={" Licenciatura em Biologia"} />

                <RadioButton name={"Tecnologia em Sistema da Computação"} />

                <RadioButton name={" Licenciatura em Biologia"} />

                <RadioButton name={"Tecnologia em Sistema da Computação"} />

                <RadioButton name={" Licenciatura em Biologia"} />

                <RadioButton name={"Tecnologia em Sistema da Computação"} />

                <RadioButton name={" Licenciatura em Biologia"} />

                <RadioButton name={"Tecnologia em Sistema da Computação"} />

                <RadioButton name={" Licenciatura em Biologia"} />

                <RadioButton name={"Tecnologia em Sistema da Computação"} />

                <RadioButton name={" Licenciatura em Biologia"} />

                

                

              </div>
            </div>
          </fieldset>

          <button className="primary-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;