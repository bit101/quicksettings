module.exports = function(grunt) {
    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-jsdoc");


    grunt.initConfig({
        watch: {
            less: {
                files: "src/*.less",
                tasks: ["less", "copy", "uglify"]
            },
            js: {
                files: "src/*.js",
                tasks: ["copy", "uglify"]
            }
        },
        less: {
            main: {
                options: {
                    compress: false
                },
                files: {
                    'quicksettings.css': 'src/quicksettings.less',
                    'quicksettings_black.css': 'src/quicksettings_black.less',
                    'quicksettings_white.css': 'src/quicksettings_white.less',
                    'quicksettings_tiny.css': 'src/quicksettings_tiny.less',
                    'quicksettings_tiny_black.css': 'src/quicksettings_tiny_black.less',
                    'quicksettings_tiny_white.css': 'src/quicksettings_tiny_white.less'
                }
            },
            min: {
                options: {
                    compress: true
                },
                files: {
                    'quicksettings.min.css': 'src/quicksettings.less',
                    'quicksettings_black.min.css': 'src/quicksettings_black.less',
                    'quicksettings_white.min.css': 'src/quicksettings_white.less',
                    'quicksettings_tiny.min.css': 'src/quicksettings_tiny.less',
                    'quicksettings_tiny_black.min.css': 'src/quicksettings_tiny_black.less',
                    'quicksettings_tiny_white.min.css': 'src/quicksettings_tiny_white.less'
                }
            }
        },
        copy: {
            main: {
                src: "src/quicksettings.template.js",
                dest: "quicksettings.js",
                options: {
                    process: function(content, srcPath) {
                        var css = grunt.file.read("quicksettings.min.css");
                        return content.replace("${css}", css);
                    }
                }
            }
        },
        uglify: {
            main: {
                files: {
                    "quicksettings.min.js": "quicksettings.js"
                }
            }
        },
        jsdoc: {
            main: {
                src: ["quicksettings.js"],
                options: {
                    destination: "docs/doc"
                }
            }
        }
    });

    grunt.registerTask("default", ["less", "copy", "uglify", "jsdoc"]);


};