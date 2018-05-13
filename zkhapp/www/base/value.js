/**
 * value就是一个简单的可注入的值
 *
 * 这货可以是string,number甚至function,它和constant的不同之处在于，
 * 它可以被修改，不能被注入到config中，但是它可以被decorator装饰
 * 可以作为全局变量使用
 */
angular.module('value',[])
    // 文件路径
    .value('PATH', {
        ionicDown: 'file:///storage/emulated/0/ionicDown/', // 文件存放路径
    })
