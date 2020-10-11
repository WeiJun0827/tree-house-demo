const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class Movie extends Sequelize.Model { }
  Movie.init(
    //Set the model attributes
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false, // disallow null
      },
      runtime: {
        type: Sequelize.INTEGER,
        allowNull: false, // disallow null
      },
      releaseDate: {
        type: Sequelize.DATEONLY,
        allowNull: false, // disallow null
      },
      isAvailableOnVHS: {
        type: Sequelize.BOOLEAN,
        allowNull: false, // disallow null
        defaultValue: false, // set default value
      },
    },
    //Set the model options
    {
      //The only required option is a sequelize property that defines the sequelize instance to attach to the model
      sequelize // same as { sequelize: sequelize }
    });

  return Movie;
};
