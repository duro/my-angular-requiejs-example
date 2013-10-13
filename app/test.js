// Compile a list of our tests
var tests = [];
for (var file in window.__karma__.files) {
  if (window.__karma__.files.hasOwnProperty(file)) {
    if (/\.spec\.js$/.test(file)) {
      tests.push(file);
    }
  }
}

// Augment our RequireJS Config for Karma
require.config({
  baseUrl: "/base/app"
});

// Include our config file and kick off Karma
require(['config'], function(config) {
  require(tests, window.__karma__.start);
});
