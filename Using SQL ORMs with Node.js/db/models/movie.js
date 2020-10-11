const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class Movie extends Sequelize.Model { }
  Movie.init(
    //Set the model attributes
    {
      title: Sequelize.STRING
    },
    //Set the model options
    {
      //The only required option is a sequelize property that defines the sequelize instance to attach to the model
      sequelize // same as { sequelize: sequelize }
    });

  return Movie;
};
