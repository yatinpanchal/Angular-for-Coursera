
(function () {
    angular.module('ShoppingListCheckOff', [])
        .controller('ToBuyController', ToBuyController)
        .controller('AlreadyBoughtController', AlreadyBoughtController)
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];

    function ToBuyController(ShoppingListCheckOffService) {
        var toBuyCtrl = this;
        toBuyCtrl.items = ShoppingListCheckOffService.getToBuy();
        toBuyCtrl.bought = function (index) {
            ShoppingListCheckOffService.boughtAction(index);
            if(toBuyCtrl.items.length==0){
                toBuyCtrl.emptyMessage="Everything is bought!";
            }else{
                 toBuyCtrl.emptyMessage=undefined;
            }
        };

    }
    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var alreadyBoughtCtrl = this;
        alreadyBoughtCtrl.items = ShoppingListCheckOffService.getBought();
        alreadyBoughtCtrl.emptyMessage=function(){
            if(alreadyBoughtCtrl.items.length>0){
                return undefined;
            }else{
               return "Nothing bought yet";
            }
        }
    }

    function ShoppingListCheckOffService() {    
        var service = this;
        
        var toBuy = [{
            name: 'cookies',
            quantity: 10
        },
        {
            name: 'chips',
            quantity: 15
        },
        {
            name: 'drinks',
            quantity: 10
        },
        {
            name: 'Donuts',
            quantity: 5
        },
        {
            name: 'Gulab-Jamun',
            quantity: 10
        }];

        var bought = [];

        service.getToBuy = function () {
            return toBuy;
        };

        service.getBought = function () {
            return bought;
        };


        service.boughtAction = function (index) {
            bought.push(toBuy[index]);
            toBuy.splice(index, 1);
          

        }

       

    }

})();