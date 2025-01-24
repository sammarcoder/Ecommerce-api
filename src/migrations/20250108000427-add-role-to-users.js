"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tableDescription = await queryInterface.describeTable("Users");

    if (!tableDescription.role) {
      // Add the column only if it doesn't exist
      await queryInterface.addColumn("Users", "role", {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "user",
      });
    }
    else {
      console.log('Column "role" already exists.');
    }
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn("Users", "role");
  },
};
