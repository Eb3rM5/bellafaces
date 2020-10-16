import CartItem from '../models/CartItem';

class CartController {
    async store(req, res) {
        const { id: product_id } = req.params;

        const customer_id = req.userId;

        let item = await CartItem.findOne({
            where: {
                customer_id,
                product_id,
            },
        });

        if (!item) {
            item = await CartItem.create({
                customer_id,
                product_id,
                quantity: 1,
            });
        }

        return res.json(item);
    }

    async update(req, res) {
        const { id: product_id } = req.params;
        const { quantity = 1 } = req.body;
        const customer_id = req.userId;

        let item = await CartItem.findOne({
            where: {
                customer_id,
                product_id,
            },
        });

        if (!item) {
            if (quantity && quantity === 0) {
                return res.status(204).json({ message: 'Not on the cart.' });
            }

            item = await CartItem.create({
                customer_id,
                product_id,
                quantity,
            });

            return res.status(201).json(item);
        }

        if (quantity === 0) {
            await item.destroy();
            return res
                .json(200)
                .json({ message: 'Item deleted from the cart.' });
        }

        const { id } = await item.update({
            quantity,
        });

        return res.json({
            id,
            customer_id,
            product_id,
            quantity,
        });
    }

    async delete(req, res) {
        const { id } = req.params;

        const item = await CartItem.findOne({
            where: {
                customer_id: req.userId,
                product_id: id,
            },
        });

        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        item.destroy();

        return res.json(item);
    }
}

export default new CartController();
