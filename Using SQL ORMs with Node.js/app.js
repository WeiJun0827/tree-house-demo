const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'movies.db',
  logging: true // enable logging, default
});

// Movie model
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

(async () => {

  // Sync 'Movies' table
  //await Movie.sync();

  // Sync all tables with CREATE TABLE IF NOT EXISTS statement
  //await sequelize.sync();

  // Force sync all tables with DROP TABLE IF EXISTS before issuing the CREATE TABLE IF NOT EXISTS
  await sequelize.sync({ force: true });

  try {
    // Instance of the Movie class represents a database row
    const movie = await Movie.create({
      title: 'Inception',
    });
    console.log(movie.toJSON());

    // Create multiple records
    const movieInstances = await Promise.all([
      Movie.create({
        title: 'Toy Story'
      }),
      Movie.create({
        title: 'The Incredibles'
      }),
    ]);
    const moviesJSON = movieInstances.map(movie => movie.toJSON());
    console.log(moviesJSON);

  } catch (error) {
    console.error('Error connecting to the database: ', error);
  }
})();
