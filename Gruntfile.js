"use strict";

module.exports = function(grunt) {
    grunt.initConfig({
        sass: {
            dist: {
                files: {
                    'dist/css/styles.css': 'src/scss/styles.scss'
                }
            }
        },
        cssmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'dist/css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'dist/css',
                    ext: '.min.css'
                }]
            }
        },
        concat: {
            dist: {
                src: [
                    'dist/js/functions.js',
                    'dist/js/classes/class.chat.js',
                    'dist/js/classes/class.friends.js',
                    'dist/js/classes/class.profile.js'
                ],
                dest: 'dist/js/bundled.js',
            },
        },
        uglify: {
            dist: {
                files: {
                    'dist/js/bundled.min.js': ['dist/js/bundled.js'],
                    'dist/js/app.min.js': ['dist/js/app.js']
                }
            }
        },
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        src: [
                            'src/images/*.{png,jpg}',
                            'src/images/**/*.{png,jpg}',
                        ],
                        dest: 'dist/images/',
                        flatten: true
                    },
                    {
                        expand: true,
                        src: [
                            'src/fonts/*.{eot,svg,otf,ttf,woff,woff2}'
                        ],
                        dest: 'dist/fonts/',
                        flatten: true
                    }
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['sass', 'cssmin', 'copy', 'concat', 'uglify']);
};