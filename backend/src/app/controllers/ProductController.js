import * as Yup from 'yup';
import Product from '../models/Product';
import File from '../models/File';

class ProductController {
    async index(req, res) {
        const products = await Product.findAll({
            include: [
                {
                    model: File,
                    as: 'image',
                    attributes: ['id', 'url', 'path'],
                },
            ],
        });
        return res.json(products);
    }

    async store(req, res) {
        /*
            Validação dos dados de entrada, para verificar se os campos
            obrigatórios estão presentes.
        */
        const schema = Yup.object().shape({
            name: Yup.string().trim().required(),
            description: Yup.string().trim().required(),
            price: Yup.number().required(),
        });

        try {
            await schema.validate(req.body);
        } catch (error) {
            return res.status(400).json({ error });
        }

        const { name, description, price } = req.body;

        const { id } = await Product.create({
            name,
            description,
            price,
        });

        return res.json({
            id,
            name,
            description,
            price,
        });
    }

    async show(req, res) {
        const { id } = req.params;
        const product = await Product.findByPk(id, {
            include: [
                {
                    model: File,
                    as: 'image',
                    attributes: ['id', 'url', 'path'],
                },
            ],
        });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        return res.json(product);
    }
}

export default new ProductController();
