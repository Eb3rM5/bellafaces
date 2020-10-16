import { Sequelize } from 'sequelize';

import databaseConfig from '../config/database';

import Product from '../app/models/Product';
import Customer from '../app/models/Customer';
import Order from '../app/models/Order';
import OrderedProduct from '../app/models/OrderedProduct';
import CartItem from '../app/models/CartItem';
import File from '../app/models/File';

const models = [File, Product, Customer, Order, OrderedProduct, CartItem];

class Database {
    constructor() {
        this.init();
    }

    init() {
        this.connection = new Sequelize(databaseConfig);

        models
            .map((model) => model.init(this.connection))
            .map(
                (model) =>
                    model.associate && model.associate(this.connection.models)
            );
    }
}

export default new Database();
