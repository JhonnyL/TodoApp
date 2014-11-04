/* jshint node: true */
module.exports = function(grunt) {
  "use strict";

  // Force use of Unix newlines
  grunt.util.linefeed = '\n';

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    srcPath: 'src',

    // The clean task ensures the parsed css/js is removed
    clean: {
      options: {
        force: true
      },
      css: ["web/css/"]
    },

    // Automatically run a task when a file changes
    watch: {
      css: {
        files: [ 
          "<%= srcPath %>/less/style.less"
        ],
        tasks: ['clean:css', 'less:compile', 'cssmin']
      }
    },

    // Compress generated css files
    cssmin: {
      "<%= srcPath %>/css/style.min.css": ["<%= srcPath %>/css/style.css"]
    },

    // Compile specified less files
    less: {
      compile: {
        options: {
          paths: ["<%= srcPath %>/less"]
        },
        files: {
          "<%= srcPath %>/css/style.css": "<%= srcPath %>/less/style.less"
        }
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-contrib-less");
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Default task(s).
  grunt.registerTask('default', ['clean:css', 'less:compile', 'cssmin']);

  // Our watch task to be run during development
  grunt.registerTask('serve', ['default', 'watch']);

};
