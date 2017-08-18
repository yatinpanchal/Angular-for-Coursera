
(function(){
 'use strict';   
var module=angular.module('nameCalculator',[]);
module.controller('nameCalculatorController',main);
function main($scope){
$scope.name='';    
$scope.value=123;
$scope.calculateValue=function(){
var total=stringToNumeric($scope.name);
 $scope.value=total;
};

function stringToNumeric(string){

    var total1=0;
    for(var i=0;i<string.length;i++){
        total1+=string.charCodeAt(i);
    }
    return total1;
}
}
})();
