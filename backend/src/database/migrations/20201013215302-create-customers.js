module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.createTable('customers', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            login: {
                type: Sequelize.STRING(20),
                unique: true,
                allowNull: false,
            },
            /*
                Esse campo irá armazenar somente o hash da senha.
                No respectivo model desta tabela, está definido um campo virtual,
                que irá receber o valor real da senha, e irá gerar o hash,
                o qual será armazenado aqui.
            */
            password_hash: {
                type: Sequelize.STRING,
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
        return queryInterface.dropTable('customers');
    },
};
