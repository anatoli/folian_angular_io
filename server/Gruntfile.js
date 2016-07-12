module.exports = function (grunt) {
    grunt.initConfig({

        //clean: ["build"],
        //
        //requirejs: {
        //    compile: {
        //        options: {
        //            baseUrl: "angular",
        //            removeCombined: true,
        //            mainConfigFile: "./angular/main.js",
        //            findNestedDependencies: true,
        //            fileExclusionRegExp: /^\./,
        //            out: "build/js/app.build.js",
        //            name: 'main'
        //        }
        //    }
        //},

        less: {
            development: {
                options: {
                    compress: true,
                    yuicompress: true,
                    optimization: 2
                },

                files: {
                    "css/main.css": "css/style.less"
                }
            }
        },


        watch: {
            less: {
                files: ['css/*.less'],
                tasks: ['less'],
                options: {
                    spawn: false
                }
            }

        }

    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');


    grunt.registerTask('default', ['watch']);

    //grunt.loadNpmTasks('grunt-contrib-clean');
    //grunt.loadNpmTasks('grunt-contrib-requirejs');
};