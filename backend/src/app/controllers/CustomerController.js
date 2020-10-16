import * as Yup from 'yup';
import Customer from '../models/Customer';

import CartItem from '../models/CartItem';

class CustomerController {
    async update(req, res) {
        /**
         * Ao atualizar os dados, validamos os dados, para, além de ter certeza
         * que eles respeitam o máximo de caracteres suportados no banco.
         * Além disso, quando é tentado atualizar a senha, colocamos um campo
         * extra para confirmar a senha.
         * Também, como medida de segurança, colocamos um campo para inserir a
         * atual senha do banco.
         * Assim permitiremos a atualização da senha somente se o usuário já
         * souber a senha anterior.
         */

        const schema = Yup.object().shape({
            name: Yup.string().trim(),
            password: Yup.string().max(20),
            confirmPassword: Yup.string().when('password', (password, field) =>
                password ? field.required().oneOf([Yup.ref('password')]) : field
            ),
            currentPassword: Yup.string()
                .max(20)
                .when('password', (password, field) =>
                    password ? field.required() : field
                ),
        });

        try {
            await schema.validate(req.body);
        } catch (error) {
            return res.status(400).json({ error });
        }

        const { id } = req.params;
        const { login, password, currentPassword } = req.body;

        const customer = await Customer.findByPk(id);

        if (!customer) {
            return res.status(404).json({ message: 'User not found' });
        }

        /**
         * Se a senha não bater com a já existente no banco,
         * retornamos o erro apropriado de não-autorizado (401)
         */
        if (password && !(await customer.checkPassword(currentPassword))) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        const { name } = req.body;
        const { created_at, updated_at } = await customer.update({
            name,
            password,
        });

        return res.json({
            id,
            name,
            login,
            created_at,
            updated_at,
        });
    }

    async index(req, res) {
        const customers = await Customer.findAll({
            attributes: {
                exclude: ['password_hash'],
            },
        });

        return res.json(customers);
    }

    async store(req, res) {
        /*
            Validação dos dados de entrada, para verificar se os campos
            obrigatórios estão presentes e assegurar que eles respeitam
            o limite máximo de caracteres suportados pelo banco de dados.
        */
        const schema = Yup.object().shape({
            name: Yup.string().trim().required(),
            login: Yup.string().trim().max(20).required(),
            password: Yup.string().trim().max(20).required(),
        });

        try {
            await schema.validate(req.body);
        } catch (error) {
            return res.status(400).json({ error });
        }

        const { name, login, password } = req.body;

        const { id } = await Customer.create({
            name,
            login,
            password,
        });

        return res.json({
            id,
            name,
            login,
        });
    }

    async show(req, res) {
        const { id } = req.params;
        const customer = await Customer.findByPk(id, {
            attributes: {
                exclude: ['password_hash'],
            },
            include: [
                {
                    model: CartItem,
                    as: 'cart_items',
                    attributes: ['id', 'product_id', 'quantity'],
                },
            ],
        });

        if (!customer) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.json(customer);
    }
}

export default new CustomerController();
