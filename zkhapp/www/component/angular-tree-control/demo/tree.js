angular.module('app')
    .controller('demoTreeCtrl', function($scope, demoTreeService){
        demoTreeService.loading($scope);
        
        // 基础树
        // 通过age排序
        $scope.order="orgId";
        // 点击事件（选中或取消）
        $scope.showSelect = function(node,selected){
            console.log(selected);
        }
        $scope.predicate = ""; // 过滤字段
        $scope.comparator = false; // 是否完全匹配大小写

        $scope.options = {  // 树的属性配置
            nodeChildren: "children", // 每个孩子节点的属性名，默认是” children”
            dirSelectable: false, // 目录是否可被选中，默认“true”。为“true”，点击目录名为选择，点击目录图标才为展开；为“false”时，点击目录就是展开。  
            multiSelection: true, // 当multiSelection=false，绑定tree中单选node, true为多选
            allowDeselect: true, // 当前元素是否可以取消选中状态，默认为true，false：不允许取消
            // injectClasses: { // 给node注入额外的css
            //     ul: "a1",  
            //     li: "a2",  
            //     liSelected: "a7",  
            //     iExpanded: "a3",  
            //     iCollapsed: "a4",  
            //     iLeaf: "a5",  
            //     label: "a6",  
            //     labelSelected: "a8"  
            //  }  
         }  
        $scope.dataForTheTree = [ // 数据
            {  
                "name": "陕西省",  
                "orgId": "1",  
                "children": [  
                    {   "name": "西安市", 
                        "orgId": "1001",
                        "children": [
                            {   "name": '雁塔区', 
                                "orgId": "1001001",
                                "children": [
                                    {   "name": '小寨路街道', 
                                        "orgId": "1001001001",
                                        "children": [
                                            { "name": '红专南路社区', "orgId": "1001001001001","children": []},        
                                            { "name": '永福社区', "orgId": "1001001001002","children": []},        
                                            { "name": '康乐社区', "orgId": "1001001001003","children": []},        
                                            { "name": '吉祥社区', "orgId": "1001001001004","children": []},        
                                            { "name": '子祥社区', "orgId": "1001001001005","children": []},        
                                        ]
                                    },
                                    { "name": '大雁塔街道', "orgId": "1001001002","children": []},
                                    { "name": '长延堡街道', "orgId": "1001001003","children": []},
                                    { "name": '电子城街道', "orgId": "1001001004","children": []},
                                    { "name": '丈八沟街道', "orgId": "1001001005","children": []}
                                ]
                            },
                            {   "name": '碑林区', 
                                "orgId": "1001002",
                                "children": [
                                    { "name": '南院门街道', "orgId": "1001002001","children": []},
                                    { "name": '长乐坊街道', "orgId": "1001002002","children": []},
                                    { "name": '太乙路街道', "orgId": "1001002003","children": []},
                                ]
                            },
                            { "name": '未央区', "orgId": "1001003","children": []},
                            { "name": '莲湖区', "orgId": "1001004","children": []},
                            { "name": '灞桥区', "orgId": "1001005","children": []},
                            { "name": '阎良区', "orgId": "1001006","children": []},
                            { "name": '长安区', "orgId": "1001007","children": []},
                        ] 
                    },  
                    {  
                        "name":"咸阳市",  
                        "age":"1002",  
                        "children": [
                            {"name":"秦都区", "age":"1002001", "children": []},
                            {"name":"杨陵区", "age":"1002002", "children": []},
                            {"name":"渭城区", "age":"1002003", "children": []}
                        ]  
                    },
                    {   "name": "宝鸡市", 
                        "orgId": "1003",
                        "children": [
                            { "name": '渭滨区', "orgId": "1001001","children": []},
                            { "name": '金台区', "orgId": "1001002","children": []},
                            { "name": '陈仓区', "orgId": "1001003","children": []}
                        ] 
                    },
                    { "name": '铜川市', "orgId": "1001001","children": []},
                    { "name": '渭南市', "orgId": "1001001","children": []},
                    { "name": '延安市', "orgId": "1001001","children": []},
                    { "name": '汉中市', "orgId": "1001001","children": []},
                    { "name": '榆林市', "orgId": "1001001","children": []},
                    { "name": '安康市', "orgId": "1001001","children": []},
                    { "name": '商洛市', "orgId": "1001001","children": []},
                ]  
            }  
        ];    

        // 动态在主枝干添加
        $scope.addRoot = function() {
            $scope.dataForTheTree.push({name: "New Root", orgId:"some id", children: []})
        };
        // 动态在树枝出添加
        $scope.addChildToSecondRoot = function() {
            $scope.dataForTheTree[0].children.push({name: "New Child", orgId:"some id", children: []})
        };
    })
    .service('demoTreeService', function(){
        this.loading = function(scope){
            
        }
    });