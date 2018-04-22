module.exports = function () {
    return {
        plugins: [
        //require('postcss-alias')({}),
        require('rucksack-css')({}),
        require('postcss-advanced-variables')({}),
        require('postcss-cssnext')({
            features: {
              autoprefixer: {
                grid: true,
                flexbox: false,
              }
            }
          })
        ]
    }
};
