'use strict';

// /** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const tableDescription = await queryInterface.describeTable('Users')
    if(!tableDescription){
      await queryInterface.addColumn('Products', 'category',{
        type : Sequelize.STRING,
        allowNull : true
      })
    }
  },

  async down (queryInterface) {
    const tableDescription = await queryInterface.describeTable('Users')
    if(!tableDescription){
      await queryInterface.removeColumn('Products', 'category')
    }
  }
};
