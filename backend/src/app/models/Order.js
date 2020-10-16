import Sequelize, { Model } from 'sequelize';

export default class Order extends Model {
    static init(sequelize) {
        super.init(
            {
                customer_id: Sequelize.INTEGER,
                total_order: Sequelize.DOUBLE,
                comments: Sequelize.TEXT,
            },
            {
                sequelize,
            }
        );

        return this;
    }

    static associate(models) {
        this.hasMany(models.OrderedProduct, {
            foreignKey: 'order_id',
            as: 'products',
        });
    }
}
