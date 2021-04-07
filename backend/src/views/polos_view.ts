import Polo from '../models/Polo';
import imagesView from './images_view'; 

export default {
    render(polo: Polo) {
        return {
            id: polo.id,
            name: polo.name,
            latitude: polo.latitude,
            longitude: polo.longitude,
            about: polo.about,
            instructions: polo.instructions,
            opening_hours: polo.opening_hours,
            open_on_weekends: polo.open_on_weekends,
            images: imagesView.renderMany(polo.images)
        };
    },

    renderMany(polos: Polo[]) {
        return polos.map(polo => this.render(polo));        
    }
};