/**
 * 原生页面切换效果插件
 */
angular.module('app')
    .config(function ($ionicNativeTransitionsProvider) {
        /** 2、调用原生页面切换效果******************************************************/
        $ionicNativeTransitionsProvider.setDefaultOptions({
            duration: 3990, // 页面切换动画时长（毫秒）
            slowdownfactor: 4, // 重叠视图（更高的数字是更多）或没有重叠（1），默认为4。
            iosdelay: -1, // 等待iOS webview在动画开始前更新, 默认 -1
            androiddelay: -1, // 与上面相同，但对于Android, 默认 -1
            winphonedelay: -1, // 与上面相同，但对于Windows Phone，默认为 -1,
            fixedPixelsTop: 44, // 默认页眉的像素数，默认值为0（IOS和Android）
            fixedPixelsBottom: 0,// 你的固定页脚的像素数（FI标签栏），默认为0（iOS和Android）
            triggerTransitionEvent: '$ionicView.afterEnter', // internal ionic-native-transitions option
            backInOppositeDirection: true // 接管默认的后台转换和状态回转换，使用相反的方向转换回去。
        });
        $ionicNativeTransitionsProvider.setDefaultTransition({
            type: 'slide',
            direction: 'left',
        });
        $ionicNativeTransitionsProvider.setDefaultBackTransition({
            type: 'slide',
            direction: 'right'
        });
        /** 2、调用原生页面切换效果******************************************************/
    });