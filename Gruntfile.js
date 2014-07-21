
function initialize(grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        exec: {
            build: {
                command: 'make build'
            },

            // 'build-types': { command: 'make build-types' },
            'build-style': { command: 'make build-style' },
            // 'build-server': { command: 'make build-server' },
            // 'build-client': { command: 'make build-client' },

            server: {
                command: 'nodemon index.js'
            }

        },

        watch: {
            // types: {
            //     files: [ 'types/citizendish.ts'],
            //     tasks: [ 'exec:build-types'],
            //     spawn: false
            // },

            style: {
                files: [ 'style/less/*.less', 'style/less/**/*.less','public/less/**/*.less'  ],
                tasks: [ 'exec:build-style'],
                spawn: false
            },

            server: {
                files: [ 'server/**/*.js', 'server/*.js',  ],
                // tasks: [ 'exec:server' ],
                spawn: false
            },

            // client: {
            //     files: [ 'client/**/*.ts', 'client/*.ts'],
            //     tasks: [ 'exec:build-client' ],
            //     spawn: false
            // }
        },

        // nodemon: {
        //     server: {
        //         options: {
        //             file: 'index.js',
        //             watchedExtensions: ['.js'],
        //             watchedFolders: ['./server', './server/**/'],
        //             legacyWatch: true
        //         }
        //     },

        //     administrator: {
        //         options: {
        //             file:'./server/administratorApi.js',
        //             watchedExtensions: ['.js'],
        //             watchedFolders: [ './server', './server/data', './server/resources'],
        //             legacyWatch: true
        //         }
        //     }
        // }  ,

        concurrent: {
            options: {
                logConcurrentOutput: true
            },
            development: {
                tasks: [ 'exec:build', 'exec:server', 'watch:style', 'watch:server', ]
            },
            // administrator: {
            //     tasks: [ 'exec:build', 'nodemon:administrator', 'watch:types', 'watch:style', 'watch:server', 'watch:client' ]
            // }
        }

    }) ;


    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-concurrent');

    grunt.registerTask('default', ['concurrent:development']) ;
    // grunt.registerTask('administrator', ['concurrent:administrator']) ;

    grunt.option('debug', true);
    grunt.option('force', true);
}

module.exports = initialize;