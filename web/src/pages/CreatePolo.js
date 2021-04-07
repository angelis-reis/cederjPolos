import React, { ChangeEvent, FormEvent, useState, useEffect} from "react";
import { Map, Marker, TileLayer} from 'react-leaflet';
import { LeafletMouseEvent} from 'leaflet';
import { FiPlus } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import mapIcon from "../utils/mapIcon";
import '../styles/pages/create-polo.css';
import api from "../services/api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Curso from "../components/Curso";


export default function PolosMap() { 
  // as const são estados criados

  const history = useHistory();
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
  const [name, setName] = useState('');
  


  const [opening_hours, setOpeningHours] = useState('');

  /* tem que adicionar no banco de dados */
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  /* const [instructions, setInstructions] = useState(''); */
  const [address, setAddress] = useState('');
  /* const [about, setAbout] = useState(''); trocar no banco*/

  /* const [open_on_weekends, setOpenOnWeekends] = useState(true); */

  const [cursosPolo, setCursosPolo] = useState([]);

  const [curso, setCurso] = useState("");

  
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

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
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('address', address);
    /* data.append('about', about); */
    data.append('opening_hours', opening_hours);
    data.append('email', email);
    data.append('phone', phone);
    data.append('cursosPolo', String(cursosPolo) );
    /* data.append('open_on_weekends', String(open_on_weekends)); */
    
    images.forEach(image => {
      data.append('images', image);
    })

    await api.post('polos', data);
    alert ('Cadastro realizado com sucesso')
    history.push('/app');
    console.log({
       name,
       address, 
       latitude,
       longitude,
       opening_hours,
       email,
       phone,
       cursosPolo,
       images
    });     
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

  /* useEffect( () => {

    console.log('Koca: curso', curso );

  }, [curso] )  */

  const handleClick = () => {

    console.log('Koca: handleClick ');
    
  }

  
 
  return (
    <div id="page-create-polo">
      <Sidebar />
      <main>
        <form onSubmit={handleSubmit} className="create-polo-form">
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

            {/* alterar no banco */}
            <div className="input-block">
              <label htmlFor="address">Endereço do Polo </label>
              <textarea
                id="address"
                maxLength={300} 
                value={address}
                onChange={event => setAddress(event.target.value)}  
              />
            </div>

            {/* <div className="input-block">
              <label htmlFor="about">Endereço do Polo </label>
              <textarea
                id="about"
                maxLength={300} 
                value={about}
                onChange={event => setAbout(event.target.value)}  
              />
            </div> */}

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
              <label  htmlFor="opening_hours">Horário de funcionamento</label>
              <input 
                id="opening_hours" 
                value={opening_hours}
                onChange={event => setOpeningHours(event.target.value)} 
              />
            </div>

            <div className="input-block">
              <label htmlFor="email e telefone">Contatos do Polo</label>

              <input className="email"
                id="email" 
                value={email}
                placeholder="E-mail"
                onChange={event => setEmail(event.target.value)} 
              />
              <input 
                id="phone" 
                value={phone}
                placeholder="Telefone"
                onChange={event => setPhone(event.target.value)} 
              />

            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Cursos oferecidos no Polo</label>
              <div className="button-select">
                <Curso name={ "Administração" } />                

                {/* <Curso 
                name={"Administração Pública"}
                onClick = { () => handleClick()}
                /> */}

                <Curso name={"Ciências Contábeis"}  />
                <Curso name={" Engenharia de Produção"}  />
                <Curso name={"Engenharia Meteorológica"} />
                <Curso name={" Licenciatura em Ciências Biológicas"} />
                <Curso name={"Licenciatura em Física"} />
                <Curso name={"Licenciatura em Geografia"} />
                <Curso name={"Licenciatura em História"} />
                <Curso name={"Licenciatura em Letras"} />
                <Curso name={"Licenciatura em Matemática"} />
                <Curso name={"Licenciatura em Pedagogia"} />
                <Curso name={"Licenciatura em Química"} />
                <Curso name={"Licenciatura em Turismo"} />
                <Curso name={"Tecnologia em Segurança Pública"} />
                <Curso name={"Tecnologia em Sistemas de Computação"} />
                <Curso name={"Tecnologia em Turismo"} />
                <Curso name={"Biblioteconomia"} />
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