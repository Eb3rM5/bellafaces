import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

export default class Customer extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                login: Sequelize.STRING,
                password: Sequelize.VIRTUAL, // O campo que recebe
                password_hash: Sequelize.STRING,
            },
            {
                sequelize,
            }
        );

        this.addHook('beforeSave', async (customer) => {
            if (customer.password) {
                customer.password_hash = await bcrypt.hash(
                    customer.password,
                    8
                );
            }
        });

        return this;
    }

    /*
        Método usado para comparar se a senha passada bate com o hash armazenado
        na tabela do banco de dados
    */
    checkPassword(password) {
        return bcrypt.compare(password, this.password_hash);
    }

    static associate(models) {
        this.hasMany(models.CartItem, {
            foreignKey: 'customer_id',
            as: 'cart_items',
        });
    }
}
