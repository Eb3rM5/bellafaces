module.exports = {
    up: async (queryInterface) => {
        return queryInterface.bulkInsert(
            'products',
            [
                {
                    name: 'Espuma de Limpeza Facial',
                    description: 'Carvão Detox | Refrescante',
                    brand: 'RK by KISS',
                    price: 33.9,
                    image_id: 2,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    name: 'Tônico Facial 5 em 1',
                    description:
                        'Equilibrante | Remove impurezas | Revigora | Reduz o brilho | Controla a oleosidade',
                    brand: 'Higiporo',
                    price: 18,
                    image_id: 3,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    name: 'Esfoliante Facial',
                    description: 'Desobstrui os poros e reduz a oleosidade',
                    brand: 'Neutrogena',
                    price: 35.7,
                    image_id: 1,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ],
            {}
        );
    },

    down: async (queryInterface) => {
        return queryInterface.bulkDelete('products', null, {});
    },
};
