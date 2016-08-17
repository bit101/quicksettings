module.exports = function(grunt) {
    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-copy");


    grunt.initConfig({
        watch: {
            files: "src/*.less",
            tasks: ["less", "copy"]
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
                        content = content.replace("${qsd}", css);

                        css = grunt.file.read("quicksettings_black.css");
                        content = content.replace("${qsb}", css);

                        css = grunt.file.read("quicksettings_white.css");
                        content = content.replace("${qsw}", css);

                        css = grunt.file.read("quicksettings_tiny.css");
                        content = content.replace("${qst}", css);

                        css = grunt.file.read("quicksettings_tiny_black.css");
                        content = content.replace("${qstb}", css);

                        css = grunt.file.read("quicksettings_tiny_white.css");
                        content = content.replace("${qstw}", css);

                        return content;
                    }
                }
            }
        }
    });

    grunt.registerTask("default", ["watch"]);


};