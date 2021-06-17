const plugins = {
  tailwindcss: {},
  autoprefixer: {},
  cssnano:
    process.env.NODE_ENV === "production" ? { preset: "default" } : false,
};

module.exports = { plugins };
