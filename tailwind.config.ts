module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        "auto-fill-20": "repeat(auto-fill, minmax(20rem, 1fr))",
      },
    },
  },
  plugins: [],
};
