const sveltePreprocess = require('svelte-preprocess');

module.exports = {
  // there doesn't seem to be the way to handle
  // typescript support for svelte-preprocess in webpack
  // the same way @rollup/plugin-typescript does in rollup.
  // in the current build, it gives TypeError [ERR_INVALID_ARG_TYPE] and crashes devServer
  preprocess: sveltePreprocess({
    postcss: true,
  }),
};
