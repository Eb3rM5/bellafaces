module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.createTable('orders', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            customer_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'customers',
                    key: 'id',
                    onUpdate: 'CASCADE',
                    onDelete: 'SET NULL',
                },
                allowNull: false,
            },
            total_order: {
                type: Sequelize.DOUBLE,
                allowNull: false,
            },
            comments: {
                type: Sequelize.TEXT,
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
        return queryInterface.dropTable('orders');
    },
};
