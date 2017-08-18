(function(){
    angular.module('LunchChecker',[])
    .controller('lunchCheckerCtrl',lunchCheckerCtrl);
    function lunchCheckerCtrl($scope){
        $scope.dishesList='';
        $scope.message='';
        $scope.checkDishes=function(){
            var list= $scope.dishesList;
            var dishes=list.split(',');
            //console.log(dishes.length);
            if(list.length==0){
                  $scope.message='Please enter data first';
                //console.log('Please enter data first');
            }
            else if(dishes.length<=3){
                $scope.message='Enjoy!';
               // console.log('Enjoy!');
               
            }else{
                $scope.message='Too much!';
                 // console.log('Too much!');
            }
        }
    }
})();