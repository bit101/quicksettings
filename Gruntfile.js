module.exports = function(grunt) {
    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-uglify");


    grunt.initConfig({
        watch: {
            files: "src/*.less",
            tasks: ["less", "copy", "uglify"]
        },
        less: {
            options: {
                compress: true
            },
            dev: {
                files: {
                    'quicksettings.css': 'src/quicksettings.less',
                    'quicksettings_black.css': 'src/quicksettings_black.less',
                    'quicksettings_white.css': 'src/quicksettings_white.less',
                    'quicksettings_tiny.css': 'src/quicksettings_tiny.less',
                    'quicksettings_tiny_black.css': 'src/quicksettings_tiny_black.less',
                    'quicksettings_tiny_white.css': 'src/quicksettings_tiny_white.less'
                }
            }
        },
        copy: {
            main: {
                src: "src/quicksettings.template.js",
                dest: "src/quicksettings.js",
                options: {
                    process: function(content, srcPath) {
                        var css = grunt.file.read("quicksettings.css");
                        return content.replace("${css}", css);
                    }
                }
            }
        },
        uglify: {
            main: {
                files: {
                    "quicksettings.min.js": "src/quicksettings.js"
                }
            }
        }
    });

    grunt.registerTask("default", ["watch"]);


};