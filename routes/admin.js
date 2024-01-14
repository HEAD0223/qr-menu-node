import express from 'express';
import {
	CategoriesController,
	QRController,
	StoresController,
	TablesController,
	UsersController,
} from '../controllers/index.js';
import { AuthMiddleware } from '../middlewares/AuthMiddleware.js';

const admin = express.Router();

// Auth routes
admin.post('/add-user', UsersController.addUser);
admin.post('/login', UsersController.loginUser);
admin.post('/logout', UsersController.logoutUser);
admin.get('/activate/:link', UsersController.activateUser);
admin.get('/refresh', UsersController.refreshUser);
admin.post('/edit-user', AuthMiddleware, UsersController.editUsers);
admin.get('/users/:storeId', AuthMiddleware, UsersController.getUsers);
admin.get('/delete-user/:userId', AuthMiddleware, UsersController.deleteUser);

// Stores routes
admin.post('/stores/add', AuthMiddleware, StoresController.addStore);
admin.post('/stores/edit', AuthMiddleware, StoresController.editStore);
admin.post('/stores/schedule', AuthMiddleware, StoresController.updateSchedule);
admin.post('/stores/wifi', AuthMiddleware, StoresController.updateWiFi);
admin.post('/stores/socials', AuthMiddleware, StoresController.updateSocials);
admin.post('/stores/options', AuthMiddleware, StoresController.updateOptions);
admin.post('/stores/index', AuthMiddleware, StoresController.updateIndexes);
admin.get('/stores/delete/:storeId', AuthMiddleware, StoresController.deleteStore);
admin.get('/stores', StoresController.getStores);

// Tables routes
admin.post('/tables/add', AuthMiddleware, TablesController.addTables);
admin.post('/tables/edit', AuthMiddleware, TablesController.editTables);
admin.post('/tables/delete', AuthMiddleware, TablesController.deleteTables);
admin.get('/tables/:storeId', AuthMiddleware, TablesController.getTables);

// QR Custom routes
admin.post('/qr/add', AuthMiddleware, QRController.addQR);
admin.get('/qr/:storeId', AuthMiddleware, QRController.getQR);

// Categories routes
admin.post('/categories/add', AuthMiddleware, CategoriesController.addCategory);
admin.post('/categories/edit', AuthMiddleware, CategoriesController.editCategory);
admin.post('/categories/index', AuthMiddleware, CategoriesController.updateIndexes);
admin.post('/categories/visibility', AuthMiddleware, CategoriesController.updateVisibility);
admin.get('/categories/delete/:categoryId', AuthMiddleware, CategoriesController.deleteCategory);
admin.get('/categories', CategoriesController.getCategories);

export default admin;
