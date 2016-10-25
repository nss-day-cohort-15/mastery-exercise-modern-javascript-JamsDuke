module.exports = function(grunt) {

  grunt.initConfig({
    // Change the b-fy task to add a transform task
    jshint: {
      options: {
        predef: [ "document", "console", "$", "alert" ],
        esnext: true,
        globalstrict: true,
        globals: {},
        browserify: true
      },
      files: ['quiz.js']
    },
    watch: {
      javascripts: {
        files: ['quiz.js'],
        tasks: ['jshint']
      }
    }
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.registerTask('default', ['jshint', 'watch']);
};