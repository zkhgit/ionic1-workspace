angular.module('app')
    .controller('treeController', function($scope, treeService){
        treeService.loading($scope);
        // 基础树
        // 通过age排序
        $scope.order="age";
        // 点击事件（选中或取消）
        $scope.showSelect = function(node,selected){
            console.log(node);
            console.log(selected);
        }
        $scope.predicate = ""; // 过滤字段
        $scope.comparator = false; // 是否完全匹配大小写

        $scope.options = {  // 树的属性配置
            nodeChildren: "children", // 每个孩子节点的属性名，默认是” children”
            dirSelectable: false, // 目录是否可被选中，默认“true”。为“true”，点击目录名为选择，点击目录图标才为展开；为“false”时，点击目录就是展开。  
            multiSelection: false, // 当multiSelection=false，绑定tree中单选node, true为多选
            allowDeselect: true, // 当前元素是否可以取消选中状态，默认为true，false：不允许取消
            injectClasses: { // 给node注入额外的css
                ul: "a1",  
                li: "a2",  
                liSelected: "a7",  
                iExpanded: "a3",  
                iCollapsed: "a4",  
                iLeaf: "a5",  
                label: "a6",  
                labelSelected: "a8"  
             }  
         }  
        $scope.dataForTheTree = [ // 数据
            {  
                "name": "Joe",  
                "age": "21",  
                "children": [  
                    { "name": "Smith", "age": "42","children": [] },  
                    {  
                        "name":"Gary",  
                        "age":"21",  
                        "children": [{  
                            "name":"Jenifer",  
                            "age":"23",  
                            "children": [  
                                { "name":"Dani", "age": "32", "children": [] },  
                                { "name":"Max", "age": "34", "children": [] }  
                            ]  
                        }]  
                    }  
                ]  
            },  
            {"name": "Albert", "age": "33","children": [] },  
            {"name": "Ron", "age": "29","children": [] }  
        ];  
    })
    .service('treeService', function(){
        this.loading = function(scope){
            
        }
    });