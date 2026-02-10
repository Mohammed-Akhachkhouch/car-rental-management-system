'use strict';

const { randomUUID } = require('crypto');

module.exports = {
  async up(queryInterface) {
    const now = new Date();

    await queryInterface.bulkInsert('cars', [
      {
        id: randomUUID(),
        brand: 'Toyota',
        model: 'Corolla',
        year: 2022,
        plate_number: 'CR-1001',
        daily_rate: 42.0,
        status: 'available',
        created_at: now,
        updated_at: now
      },
      {
        id: randomUUID(),
        brand: 'Dacia',
        model: 'Duster',
        year: 2023,
        plate_number: 'CR-1002',
        daily_rate: 59.0,
        status: 'available',
        created_at: now,
        updated_at: now
      },
      {
        id: randomUUID(),
        brand: 'Hyundai',
        model: 'i20',
        year: 2021,
        plate_number: 'CR-1003',
        daily_rate: 38.0,
        status: 'maintenance',
        created_at: now,
        updated_at: now
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('cars', {
      plate_number: ['CR-1001', 'CR-1002', 'CR-1003']
    });
  }
};

