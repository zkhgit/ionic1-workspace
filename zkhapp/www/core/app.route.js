angular.module('app.route', [])
    .config(function($urlRouterProvider, $ocLazyLoadProvider){

        $urlRouterProvider.otherwise('tab/main');
        
        /**
         * 这种懒加载方式引入的模块（angular.module('demo',[])），
         * 不需要在别的模块中声明（angular.module('app',['demo']）,
         * 只需在$ocLazyLoad.load(['demo'])中加载即可;
         */
        $ocLazyLoadProvider.config({
            modules:[
                /** css动画样式 *****************************************************************/
                {// 动画 --https://daneden.github.io/animate.css
                    name:'animate',
                    files:[
                        'css/animate.css'
                    ]
                },
                /** css动画样式 *****************************************************************/

                /** core/directive指令 *********************************************************/
                {// 实现评论、评分的功能
                    name:'ionic-ratings',
                    files:[
                        'core/directive/ionic-ratings.js',
                    ]
                },
                {// ion-item等点击产生涟漪水波效果的样式
                    name:'item-click-ripple',
                    files:[
                        'core/directive/item-click-ripple.js',
                    ]
                },
                {// 自动适应textarea输入框的高度，监听taResize事件
                    name:'resize-foot-bar',
                    files:[
                        'component/elastic/elastic.js',
                        'core/directive/resize-foot-bar.js',
                    ]
                },
                {// 自定义tabs中心tab标签的icon，并且可以设置大小和颜色
                    name:'tab-center-icon',
                    files:[
                        'core/directive/tab-center-icon.js',
                    ]
                },
                {// 应用于tabs图标的红点信息提醒
                    name:'tab-red-point',
                    files:[
                        'core/directive/tab-red-point.js',
                    ]
                },
                /** core/directive指令 *********************************************************/

                /** core/service服务 ***********************************************************/
                {// 文件下载
                    name:'download',
                    files:[
                        'core/service/download.js',
                    ]
                },
                {// 退出（并注销）登录
                    name:'exitApp',
                    files:[
                        'core/service/exitApp.js',
                    ]
                },
                {// 时间格式化
                    name:'format',
                    files:[
                        'core/service/format.js',
                    ]
                },
                {// json数组排序
                    name:'jsonSort',
                    files:[
                        'core/service/jsonSort.js',
                    ]
                },
                {// 获得文件后缀名
                    name:'mime',
                    files:[
                        'core/service/mime.js',
                    ]
                },
                {// 分页
                    name:'page',
                    files:[
                        'core/service/page.js',
                    ]
                },
                /** core/service服务 ***********************************************************/


                /** component组件 ***************************************************************/
                {// AngularJS树组件
                    name:'action-img-show',
                    files:[
                        'component/action-img-show/imgshow.css',
                        'component/action-img-show/hammer.min.js',
                        'component/action-img-show/angular.hammer.js',
                        'component/action-img-show/action-img-show.js',
                    ]
                },
                {// AngularJS树组件
                    name:'angular-tree-control',
                    files:[
                        'component/angular-tree-control/css/tree-control.css',
                        'component/angular-tree-control/css/tree-control-attribute.css',
                        'component/angular-tree-control/js/angular-tree-control.js',
                    ]
                },
                {// textarea框自动换行以及自动高度
                    name:'elastic', 
                    files:[
                        'component/elastic/elastic.js'
                    ]
                },
                {// 图表1 -- 简单封装
                    name:'chart', 
                    files:[
                        'component/chart/Chart.min.js',
                        'component/chart/angular-chart.js'
                    ]
                },
                {// 图表2 -- 封装良好，可直接用（参数只要宽、高、一个数组就行）
                    name:'echarts', 
                    files:[
                        'component/echarts/echarts-all.js',
                        'core/directive/echarts.js',
                    ]
                },
                {// banner小提示的组件
                    name:'ionic-banner-tips', 
                    files:[
                        'component/ionic-banner-tips/ionic-banner-tips.css',
                        'component/ionic-banner-tips/ionic-banner-tips.js'
                    ]
                },
                {// 日期选择控件
                    name:'ionic-datepicker', 
                    files:[
                        'component/ionic-datepicker/ionic-datepicker.bundle.min.js',
                        'component/ionic-datepicker/config.js'
                    ]
                },
                {// 原生页面切换效果配置文件
                    name:'ionic-native-transitions', 
                    files:[
                        'component/ionic-native-transitions/config.js'
                    ]
                },
                {// 选择城市区域的组件
                    name:'ionic-pickcity', 
                    files:[
                        'component/ionic-pickcity/ionic-pickcity.css',
                        'component/ionic-pickcity/ionic-pickcity-service.js',
                        'component/ionic-pickcity/ionic-pickcity.js'
                    ]
                },
                {// 评价五颗星星
                    name:'ionic-rating', 
                    files:[
                        'component/ionic-rating/ionic-rating.css',
                        'component/ionic-rating/ionic-rating.min.js'
                    ]
                },
                {// 日期和时间选择器jQuery插件 
                    name:'mobiscroll', 
                    files:[
                        'component/mobiscroll/css/mobiscroll.custom-3.0.0-beta6.min.css',
                        'component/mobiscroll/js/mobiscroll.custom-3.0.0-beta6.min.js'
                    ]
                },
                {// 文件上传
                    name:'ng-file-upload', 
                    files:[
                        'component/ng-file-upload/ng-file-upload.js',
                        'component/ng-file-upload/ng-file-upload-shim.js',
                    ]
                },
                {// 浮动按钮
                    name:'ng-material-floating-button', 
                    files:[
                        'component/ng-material-floating-button/mfb.min.css',
                        'component/ng-material-floating-button/mfb-directive.js'
                    ]
                },
                {// 手势解锁
                    name:'patternLock', 
                    files:[
                        'component/patternLock/patternLock.css',
                        'component/patternLock/patternLock.min.js',
                        'core/directive/pattern-lock.js'
                    ]
                },
                {// 表单验证
                    name:'validator', 
                    files:[
                        'component/validator/w5cValidator.css',
                        'component/validator/w5cValidator.js',
                        'component/validator/config.js'
                    ]
                },
                /** component组件 ***************************************************************/

                /** module/**Route.js功能模块路由 ***********************************************/
                {// 公共门户
                    name:'module-rotue', 
                    files:[
                        'module/public/publicRoute.js',
                        'module/demo/demoRoute.js'                       
                    ]
                },
                /** module/**Route.js功能模块路由 ***********************************************/
            ]
        });
        
    });