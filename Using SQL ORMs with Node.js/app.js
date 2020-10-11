const db = require('./db');
const { Movie, Person } = db.models;

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
      runtime: 148,
      releaseDate: '2010-07-16',
      isAvailableOnVHS: true,
    });
    console.log(movie.toJSON());

    const person = await Person.create({
      firstName: 'Tom',
      lastName: 'Hanks',
    });
    console.log(person.toJSON());

    // Create multiple records
    const movieInstances = await Promise.all([
      Movie.create({
        title: 'Toy Story',
        runtime: 81,
        releaseDate: '1995-11-22',
        isAvailableOnVHS: true,
      }),
      Movie.create({
        title: 'The Incredibles',
        runtime: 115,
        releaseDate: '2004-04-14',
        isAvailableOnVHS: true,
      }),
    ]);
    const moviesJSON = movieInstances.map(movie => movie.toJSON());
    console.log(moviesJSON);

  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      const errors = error.errors.map(err => err.message);
      console.error('Validation errors: ', errors);
    } else {
      throw error;
    }
  }
})();
