const db = require('./db');
const { Movie } = db.models;

(async () => {

  // Sync 'Movies' table
  //await Movie.sync();

  // Sync all tables with CREATE TABLE IF NOT EXISTS statement
  //await db.sequelize.sync();

  // Force sync all tables with DROP TABLE IF EXISTS before issuing the CREATE TABLE IF NOT EXISTS
  await db.sequelize.sync({ force: true });

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
