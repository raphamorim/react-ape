module.exports = (process.env.NODE_ENV === 'production') ? require('./dist/react-ape.production.js') : module.exports = require('./dist/react-ape.development.js');
