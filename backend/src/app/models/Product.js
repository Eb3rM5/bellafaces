import Sequelize, { Model } from 'sequelize';

class Product extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                description: Sequelize.STRING,
                price: Sequelize.DOUBLE,
            },
            {
                sequelize,
            }
        );

        return this;
    }

    static associate(models) {
        this.hasOne(models.File, {
            foreignKey: 'id',
            as: 'image',
        });
    }
}

export default Product;
