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
    use_env_variable: 'postgres://iwdofmybelexot:b2df3bf4c2d24ee8f4685c4a57f5afcbee5dc2d5231e3d684cca4a8c6e93e6fa@ec2-54-145-110-118.compute-1.amazonaws.com:5432/ddq2l5igakopel',
    dialect: 'postgres',
    seederStorage: 'sequelize',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};

// test comment
