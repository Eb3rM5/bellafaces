const bcrypt = require('bcryptjs');

module.exports = {
    up: async (queryInterface) => {
        return queryInterface.bulkInsert(
            'customers',
            [
                {
                    name: 'Rede de Lojas Catarinense',
                    login: 'rl.catarinense',
                    password_hash: await bcrypt.hash('123456teste', 8),
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ],
            {}
        );
    },

    down: async (queryInterface) => {
        return queryInterface.bulkDelete('customers', null, {});
    },
};
