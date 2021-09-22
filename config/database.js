const {
  db: { username, password, database, host },
} = require('./index');

module.exports = {
  development: {
    username,
    password,
    database,
    host,
    dialect: 'postgres',
  },
  production: {
    use_env_variable: 'postgres://jjyxfwkkzhjedw:702509a9679311c9884dd3a565e3e3a5821045d63205a7be3e58b814b9a28099@ec2-54-156-24-159.compute-1.amazonaws.com:5432/de9bqeg9frb1db',
    dialect: 'postgres',
    seederStorage: 'sequelize',
  }
};

// test comment
