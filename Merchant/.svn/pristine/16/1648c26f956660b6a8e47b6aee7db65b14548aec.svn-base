/**!
 * selectedFilter
 * @author jianglj
 * @create 2016-04-28 13:35
 */
(function() {
    'use strict';
    angular
        .module('xcore.biz.filter')
        .filter('selected', selected)

    //返回选中的单选值
    function selected(){
        return function(options){
            selectedOption = '';
            if(options){
                var selectedOption;
                for(var i=0; i<options.length; i++){
                    if(+options[i].select){
                        selectedOption = options[i];
                        break;
                    }
                }
            }
            return selectedOption;
        }
    }
})();