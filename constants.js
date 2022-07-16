const mode = process.env.NODE_ENV;
const production = mode && mode === 'production';

// eslint-disable-next-line prefer-destructuring
const API_ROOT = process.env.API_ROOT;

const services = ['gog'];

module.exports = { mode, production, API_ROOT, services };
