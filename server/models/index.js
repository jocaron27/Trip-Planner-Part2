const Sequelize = require('sequelize');
const db = new Sequelize ('postgres://localhost/tripplanner', {logging: false})

const Hotel = db.define('hotel', {
    name: Sequelize.STRING,
    num_stars: {
        type :Sequelize.FLOAT,
        validate: {
            max: 5
        }
    },
    amenities: Sequelize.STRING
})

const Restaurant = db.define('restaurant', {
    name: Sequelize.STRING,
    cuisine: Sequelize.STRING,
    price: {
        type: Sequelize.INTEGER,
        validate: {
            max: 5
        }
    }
})

const Activity = db.define('activity', {
    name: Sequelize.STRING,
    age_range: Sequelize.STRING
})

const Place = db.define('place', {
    address: Sequelize.STRING,
    city: Sequelize.STRING,
    state: Sequelize.STRING,
    phone: Sequelize.STRING,
    location: Sequelize.ARRAY(Sequelize.FLOAT)
});

Hotel.belongsTo(Place);
Restaurant.belongsTo(Place);
Activity.belongsTo(Place);

module.exports = {db, Hotel, Restaurant, Activity, Place}