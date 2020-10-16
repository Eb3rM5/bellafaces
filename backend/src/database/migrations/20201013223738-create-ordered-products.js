module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.createTable('ordered_products', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            order_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'orders',
                    key: 'id',
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                },
                allowNull: false,
            },
            product_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'products',
                    key: 'id',
                    onUpdate: 'CASCADE',
                    onDelete: 'SET NULL',
                },
                allowNull: false,
            },
            quantity: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            unit_price: {
                type: Sequelize.DOUBLE,
                allowNull: false,
            },
            total_price: {
                type: Sequelize.DOUBLE,
                allowNull: false,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
        });
    },

    down: async (queryInterface) => {
        return queryInterface.dropTable('ordered_products');
    },
};
