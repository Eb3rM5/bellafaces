import Sequelize, { Model } from 'sequelize';

export default class OrderedProduct extends Model {
    static init(sequelize) {
        super.init(
            {
                quantity: Sequelize.INTEGER,
                unit_price: Sequelize.DOUBLE,
                total_price: Sequelize.DOUBLE,
            },
            {
                sequelize,
            }
        );

        return this;
    }

    static associate(models) {
        this.belongsTo(models.Product, {
            foreignKey: 'product_id',
            as: 'product',
        });

        this.belongsTo(models.Order, { foreignKey: 'order_id', as: 'order' });
    }
}
