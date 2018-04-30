//gruntfile.js 文件配置详解，参考： https://blog.csdn.net/goodzyw/article/details/46709677

module.exports = function(grunt){

    //任务配置 
    grunt.initConfig({
        //watch是一个特殊的任务，它可以在目标文件保存时自动触发一系列任务的运行
        //files：[]监控哪些文件，tasks:[]触发后执行哪些任务
        watch: {
            //每当监测到文件的变动，livereload 服务就会向浏览器发送一个信号，浏览器收到信号后就刷新页面，实现了实时刷新的效果。
            jade: {
                files: ['views/**'],
                options: {
                    livereload: true
                }
            },
            js: {
                files: ['public/js/**','models/**/*.js','schemas/**/*.js'],
                //jshint 检查JavaScript语法
                tasks: ['jshint'],
                options:{
                    livereload: true
                }
            }
        },
        //Nodemon的核心是一个命令行工具，它取代了标准的node命令行，目标是只要一个文件发生变化就重新启动node应用程序
        nodemon:{
            //dev 为开发环境（安装时的 npm install grunt-nodemon --save-dev）
            dev: {
                options: {
                    //当前入口文件
                    file: 'app.js',
                    args: [],
                    ignoredFiles: ['README.md','node_modules/**','.DS_Store'],
                    watchedExtensions: ['js'],
                    watchedFolders: ['./'],
                    debug: true,
                    delayTime: 1,
                    env: {
                        PORT: 3000
                    },
                    cwd: __dirname
                }
            }
        },

        mochaTest:{
            options: {
                reporter: 'spec'
            },
            src: ['test/**/*.js']
        },

        concurrent:{
            tasks: ['nodemon','watch'],
            options:{
                logConcurrentOutput: true
            }
        }
    })

    // 加载插件
    grunt.loadNpmTasks('grunt-contrib-watch')
    grunt.loadNpmTasks('grunt-nodemon')
    grunt.loadNpmTasks('grunt-concurrent')
    grunt.loadNpmTasks('grunt-mocha-test')

    grunt.option('force',true)
    // 自定义任务
    grunt.registerTask('default',['concurrent'])
    grunt.registerTask('test',['mochaTest'])
}