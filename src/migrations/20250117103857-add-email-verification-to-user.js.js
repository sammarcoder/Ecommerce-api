'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   const tableDescription = await queryInterface.describeTable('Users')
   if (!tableDescription){
    await queryInterface.addColumn('Users','isVerified',{
     type: Sequelize.BOOLEAN,
     defaultValue:false
    })
    if(!tableDescription){
      await queryInterface.addColumn('Users','verificationToken',{
        type: Sequelize.STRING,
        allowNull : true
      })
    }
   }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'isVerified')
    await queryInterface.removeColumn('Users', 'verificationToken')
  }
};
