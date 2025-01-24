'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    const tableDescription =await queryInterface.describeTable('Users')
    if(!tableDescription){
   await queryInterface.addColumn('Users','resetToken',{
    type: Sequelize.STRING,
    allowNull:true
   })}

   if(!tableDescription){
    await queryInterface.addColumn('Users','resetTokenExpires',{
      type:Sequelize.DATE,
      allowNull:true
    } )
   }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users','resetToken');
    await queryInterface.removeColumn('Users','resetTokenExpires')
  }
};
