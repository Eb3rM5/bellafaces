import { Router } from 'express';

import multer from 'multer';
import multerConfig from './config/multer';

import CustomerController from './app/controllers/CustomerController';
import ProductController from './app/controllers/ProductController';
import FileController from './app/controllers/FileController';
import CartController from './app/controllers/CartController';
import OrderController from './app/controllers/OrderController';
import SessionController from './app/controllers/SessionController';

import auth from './app/middlewares/auth';

const upload = multer(multerConfig);

const router = new Router();

router.post('/sessions', SessionController.store);

router.use(auth);

router.get('/customers', CustomerController.index);
router.post('/customers', CustomerController.store);
router.put('/customers/:id', CustomerController.update);
router.get('/customers/:id', CustomerController.show);

router.put('/customers/cart/:id', CartController.update);
router.delete('/customers/cart/:id', CartController.delete);
router.post('/customers/cart/:id', CartController.store);

router.get('/products', ProductController.index);
router.post('/products', ProductController.store);
// router.put('/products/:id', ProductController.update);
router.get('/products/:id', ProductController.show);

router.post('/orders', OrderController.store);

router.post('/files', upload.single('file'), FileController.store);

export default router;
