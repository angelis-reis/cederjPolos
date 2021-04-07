import { Router} from 'express';
import multer from 'multer';
import uploadConfig from './config/upload';
import PolosController from './controllers/PolosController';

const routes = Router();
const upload = multer(uploadConfig);

// MVC
// Model, representação tabela no banco
// Views
// Controllers

routes.get('/polos', PolosController.index);
routes.get('/polos/:id', PolosController.show);
routes.post('/polos', upload.array('images'), PolosController.create); 

export default routes;