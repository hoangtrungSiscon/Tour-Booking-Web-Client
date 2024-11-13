module.exports = function (config) {
  config.set({
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('@angular-devkit/build-angular/plugins/karma'),
      require('karma-webpack')
    ],
    webpack: {
      resolve: {
        alias: {
          'bootstrap': 'node_modules/bootstrap/dist/css/bootstrap.min.css'
        }
      }
    },
      client: {
        clearContext: false, // leave Jasmine Spec Runner output visible in browser
      },
      coverageIstanbulReporter: {
        dir: require('path').join(__dirname, './coverage/tour-booking-web'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' }
      ]
      },
      // files: ["src/**/*.spec.js"],
      // include: ["src/**/*.spec.js"],
      angularCli: {
        environment: "dev",
      },
      reporters: ["progress", "kjhtml"],
      port: 9876,
      colors: true,
      logLevel: config.LOG_INFO,
      autoWatch: true,
      browsers: ["Chrome"],
      singleRun: false,
      restartOnFileChange: true
    });
  };