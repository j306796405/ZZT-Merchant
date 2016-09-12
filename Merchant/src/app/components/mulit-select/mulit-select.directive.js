/**!
 * mulit-select.directive
 * @author jianglj
 * @create 2016-05-18 13:46
 */
(function() {
    'use strict';

    angular
        .module('xcore.comp')
        .directive('multiSelect', multiSelect);

    multiSelect.$inject = ['$parse', '$timeout'];

    function multiSelect($parse, $timeout){
        // 利用闭包，保存父级scope中的所有多级联动菜单，便于取值
        var selects = {};

        return {
            restrict: 'CA',
            scope: {
                // 用于依赖声明时指定父级标签
                name: '@name',
                // 依赖数组，逗号分割
                dependents: '@dependents',
                // 提供具体option值的函数，在父级change时被调用，允许同步/异步的返回结果
                // 无论同步还是异步，数据应该是[{text: 'text', value: 'value'},]的结构
                source: '=source',
                // 是否支持控制选项，如果是，空值的标签是什么
                empty: '@empty',
                // 用于parse解析获取model值（而非viewValue值）
                modelName: '@ngModel'
            },
            template: ''
            // 使用ng-show而非ng-if，原因上文已经提到
            + '<option ng-show="empty" value="">{{empty}}</option>'
            // 使用朴素的ng-repeat
            + '<option ng-repeat="item in items" value="{{item.value}}">{{item.text}}</option>',

            require: 'ngModel',

            link: function (scope, elem, attr, model) {

                var dependents = scope.dependents ? scope.dependents.split(',') : false;
                var parentScope = scope.$parent;
                scope.name = scope.name || 'multi-select-' + Math.floor(Math.random() * 900000 + 100000);

                // 将当前菜单的getValue函数封装起来，放在闭包中的selects对象中方便调用
                selects[scope.name] = {
                    getValue: function () {
                        return $parse(scope.modelName)(parentScope);
                    }
                };

                // 保存初始值，原因上文已经提到
                var initValue = selects[scope.name].getValue();

                var inited = !initValue;
                model.$setViewValue('');

                // 父级标签变化时被调用的回调函数
                function onParentChange() {
                    var values = {};
                    // 获取所有依赖的菜单的当前值
                    if (dependents) {
                        $.each(dependents, function (index, dependent) {
                            values[dependent] = selects[dependent].getValue();
                        });
                    }

                    // 利用闭包判断io造成的异步过期
                    (function (thenValues) {

                        // 调用source函数，取新的option数据
                        var returned = scope.source ? scope.source(values) : false;

                        // 利用多层闭包，将同步结果包装为有then方法的对象
                        !returned || (returned = returned.then ? returned : {
                            then: (function (data) {
                                return function (callback) {
                                    callback.call(window, data);
                                };
                            })(returned)
                        }).then(function (items) {

                            // 防止由异步造成的过期
                            for (var name in thenValues) {
                                if (thenValues[name] !== selects[name].getValue()) {
                                    return;
                                }
                            }

                            scope.items = items;

                            $timeout(function () {

                                // 防止由同步（严格的说也是异步，注意事件队列）造成的过期
                                if (scope.items !== items) return;

                                // 如果有空值，选择空值，否则选择第一个选项
                                if (scope.empty) {
                                    model.$setViewValue('');
                                } else {
                                    model.$setViewValue(scope.items[0].value);
                                }

                                // 判断恢复初始值的条件是否成熟
                                var initValueIncluded = !inited && (function () {
                                        for (var i = 0; i < scope.items.length; i++) {
                                            if (scope.items[i].value === initValue) {
                                                return true;
                                            }
                                        }
                                        return false;
                                    })();

                                // 恢复初始值
                                if (initValueIncluded) {
                                    inited = true;
                                    model.$setViewValue(initValue);
                                }

                                model.$render();

                            });
                        });

                    })(values);


                }

                // 是否有依赖，如果没有，直接触发onParentChange以还原初始值
                !dependents ? onParentChange() : scope.$on('selectUpdate', function (e, data) {
                    if ($.inArray(data.name, dependents) >= 0) {
                        onParentChange();
                    }
                });

                // 对当前值进行监听，发生变化时对其进行广播
                parentScope.$watch(scope.modelName, function (newValue, oldValue) {
                    if (newValue || '' !== oldValue || '') {
                        scope.$root.$broadcast('selectUpdate', {
                            // 将变动的菜单的name属性广播出去，便于依赖于它的菜单进行识别
                            name: scope.name
                        });
                    }
                });

            }
        };
    }
})();
