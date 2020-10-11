const db = require('./db');
const { Movie, Person } = db.models;
const { Op } = db.Sequelize;

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
    //console.log(movie.toJSON());

    const person = await Person.create({
      firstName: 'Tom',
      lastName: 'Hanks',
    });
    //console.log(person.toJSON());

    const person2 = await Person.build({
      firstName: 'Brad',
      lastName: 'B',
    }); // person2 is not stored in the database yet
    //console.log(person2.toJSON());
    person2.lastName = 'Bird'; // Update property
    await person2.save(); // person2 is now stored in the database
    //console.log(person2.toJSON());

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
    //console.log(moviesJSON);

    const movieById = await Movie.findByPk(1);
    //console.log(movieById.toJSON());

    const movieByRuntime = await Movie.findOne({ where: { runtime: 115 } });
    //console.log(movieByRuntime.toJSON());

    const movies = await Movie.findAll({
      where: {
        runtime: 81,
        isAvailableOnVHS: true
      }
    });
    // SELECT * FROM Movies WHERE runtime = 81 AND isAvailableOnVHS = true;
    //console.log(movies.map(movie => movie.toJSON()));

    const movies2 = await Movie.findAll({
      attributes: ['id', 'title'], // return only id and title
      where: {
        title: {
          [Op.endsWith]: 'story'
        },
        runtime: {
          [Op.gt]: 95, // greater than 95
        },
        releaseDate: {
          [Op.gte]: '2004-01-01', // greater than or equal to the date
        },
      }
    });
    //console.log(movies2.map(movie => movie.toJSON()));

    const movies3 = await Movie.findAll({
      attributes: ['id', 'title', 'releaseDate'],
      where: {
        runtime: {
          [Op.between]: [75, 150]
        }
      },
      order: [['releaseDate', 'ASC']], // dates in ascending order
    });
    //console.log( movies3.map(movie => movie.toJSON()) );

    const toyStory3 = await Movie.findByPk(2);
    toyStory3.isAvailableOnVHS = false;
    await toyStory3.save();
    // Calling get({ plain: true}) returns the same as calling .toJSON()
    console.log(toyStory3.get({ plain: true }));

    await toyStory3.update({
      title: 'Trinket Tale 3', // this will be ignored
      isAvailableOnVHS: true,
    }, { fields: ['isAvailableOnVHS'] });
    console.log(toyStory3.get({ plain: true }));

    // Find a record
    const toyStory = await Movie.findByPk(2);
    // Delete a record
    await toyStory.destroy();
    // Find and log all movies
    const movies4 = await Movie.findAll();
    console.log(movies4.map(movie => movie.toJSON()));

  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      const errors = error.errors.map(err => err.message);
      console.error('Validation errors: ', errors);
    } else {
      throw error;
    }
  }
})();
