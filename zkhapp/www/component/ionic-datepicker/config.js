/**
 * 日期选择控件配置
 */
angular.module('tomIonicDatePicker',[])
    .config(function(ionicDatePickerProvider){
        var datePickerObj = {  
            inputDate: new Date(),  
            titleLabel: '选择日期',  
            setLabel: '确定',  
            todayLabel: '今天',  
            closeLabel: '关闭',  
            mondayFirst: false,  
            weeksList: ["日", "一", "二", "三", "四", "五", "六"],  
            monthsList: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],  
            templateType: 'popup',  
            from: new Date(1950, 1, 1),  
            to: new Date(2050, 12, 31),  
            showTodayButton: true,  
            dateFormat: 'yyyy-MM-dd',  
            closeOnSelect: false,  
            // disabledDates: [  // 设置不能选中的日期
            //     new Date(2016, 2, 16),  
            //     new Date(2015, 3, 16),  
            //     new Date(2015, 4, 16),  
            //     new Date(2015, 5, 16),  
            //     new Date('Wednesday, August 12, 2015'),  
            //     new Date("2016-08-16"),  
            //     new Date(1439676000000)  
            // ], 
            // disableWeekdays: []  //设置不能选中的周末
        };  
        ionicDatePickerProvider.configDatePicker(datePickerObj);
    });