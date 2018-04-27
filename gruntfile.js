//gruntfile.js 文件配置详解，参考： https://blog.csdn.net/goodzyw/article/details/46709677

module.exports = function(grunt){

    //任务配置 
    grunt.initConfig({
        //watch是一个特殊的任务，它可以在目标文件保存时自动触发一系列任务的运行
        //files：[]监控哪些文件，tasks:[]触发后执行哪些任务
        watch: {
            //livereload: true 当文件改动时，会重新启动服务
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

        concurrent:{
            tasks: ['nodemon','watch'],
            options:{
                logConcurrentOutput: true
            }
        }
    })


    grunt.loadNpmTasks('grunt-contrib-watch')
    grunt.loadNpmTasks('grunt-nodemon')
    grunt.loadNpmTasks('grunt-concurrent')

    grunt.option('force',true)
    //注册 “别名任务” 或 任务函数
    grunt.registerTask('default',['concurrent'])
}