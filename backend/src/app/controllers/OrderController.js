import * as Yup from 'yup';
import Order from '../models/Order';
import OrderedProduct from '../models/OrderedProduct';

import CartItem from '../models/CartItem';

class OrderController {
    async index(req, res) {
        const orders = await Order.findAll();
        return res.json(orders);
    }

    async store(req, res) {
        /*
            Validação dos dados de entrada, para verificar se os campos
            obrigatórios estão presentes.
        */

        const schema = Yup.object().shape({
            total_order: Yup.number().required(),
            comments: Yup.string().trim().ensure(),
            products: Yup.array()
                .of(
                    Yup.object().shape({
                        product_id: Yup.number().integer().required(),
                        quantity: Yup.number().integer().required(),
                        unit_price: Yup.number().required(),
                        total_price: Yup.number().required(),
                    })
                )
                .required(),
        });

        try {
            await schema.validate(req.body);
        } catch (error) {
            return res.status(400).json({ error });
        }

        const { total_order, comments } = req.body;
        let { products } = req.body;

        const customer_id = req.userId;
        const { id } = await Order.create({
            customer_id: 1,
            total_order,
            comments,
        });

        products = products.map((item) => ({
            order_id: id,
            ...item,
        }));

        products = await OrderedProduct.bulkCreate(products);

        await CartItem.destroy({
            where: {
                customer_id,
            },
        });

        return res.json({
            id,
            total_order,
            comments,
            customer_id,
            products,
        });
    }

    async show(req, res) {
        const { id } = req.params;
        const order = await Order.findByPk(id);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        return res.json(order);
    }
}

export default new OrderController();
