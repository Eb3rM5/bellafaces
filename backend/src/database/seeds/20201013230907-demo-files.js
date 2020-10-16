module.exports = {
    up: async (queryInterface) => {
        return queryInterface.bulkInsert(
            'files',
            [
                {
                    name: 'esfoliante-neutrogena.jpg',
                    path: 'af6a8f37459af93548de62f20e791fc6.jpg',
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    name: 'espuma-de-limpeza-carvao-detox.png',
                    path: '06c0e3f47f6d8d823e68d28152d4179b.png',
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    name: 'tonico-facial-higiporo-equilibrante.jpg',
                    path: 'f59abc23ea91362540fdaac0bd637572.jpg',
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ],
            {}
        );
    },

    down: async (queryInterface) => {
        return queryInterface.bulkDelete('files', null, {});
    },
};
