import { Request, Response} from 'express';
import { getRepository } from 'typeorm'; 
import poloView from '../views/polos_view';
import Polo from '../models/Polo';
import * as Yup from 'yup';

export default {
    async index(request: Request, response: Response){

        const polosRepository = getRepository(Polo)

        const polos = await polosRepository.find({
            relations: ['images']
        });
        return response.json(poloView.renderMany(polos)); 

    },

    async show(request: Request, response: Response){       

        const { id } = request.params;
        const polosRepository = getRepository(Polo)
        const polo = await polosRepository.findOneOrFail(id, {
            relations: ['images']
        });
        return response.json(poloView.render(polo));
    },

    async create(request: Request, response: Response) {
        const {
            name, 
            latitude,
            longitude, 
            about, 
            instructions,
            opening_hours,
            open_on_weekends,
        } = request.body;
    
        const polosRepository = getRepository(Polo);
        const requestImages = request.files as Express.Multer.File[];
        const images = requestImages.map( image=> {
            return { path: image.filename }
        })    

        const data = {
            name, 
            latitude,
            longitude, 
            about, 
            instructions,
            opening_hours,
            open_on_weekends: open_on_weekends === 'true', 
            images
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required(),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(),
            images: Yup.array(
                Yup.object().shape({
                    path: Yup.string().required()
                })
            )
        });
        // const finalData = schema.cast(data);
        await schema.validate(data, {
            abortEarly: false,
        });  

        const polo = polosRepository.create(data);
        // const polo = polosRepository.create({
            
        //     name, 
        //     latitude,
        //     longitude, 
        //     about, 
        //     instructions,
        //     opening_hours,
        //     open_on_weekends,
        //     images
        // });
        await polosRepository.save(polo);
        return response.status(201).json(polo);
    }
}