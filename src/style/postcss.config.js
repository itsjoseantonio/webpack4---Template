module.exports = function () {
    return {
        parser: 'postcss-scss',
        plugins: [
        require('rucksack-css')({}),
        require('precss')({}),//its not working
        require('postcss-advanced-variables')({}),//its not working
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
