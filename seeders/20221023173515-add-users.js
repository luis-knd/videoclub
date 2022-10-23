const {faker} = require('@faker-js/faker')
require('dotenv').config()
'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        const dummyJson = []
        for (let i = 0; i < process.env.USER_SEEDER_QUANTITY; i++) {
            dummyJson.push({
                name: faker.name.fullName(),
                email: faker.internet.email(),
                password: '$2b$10$Gk3F/AEmZ/UjqHAIJdrnzOGSeKNfGoY8Yfs23Fbwb1SObCoAXc3SC', //12345678
                refresh_token: null,
                createdAt: new Date(),
                updatedAt: new Date()
            })
        }
        await queryInterface.bulkInsert('Users',dummyJson,{});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Users', null, {});
    }
};
