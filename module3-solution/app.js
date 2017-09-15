
(function () {
    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .directive('foundItems',foundItemsDirective)
        .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");
    NarrowItDownController.$inject = ['MenuSearchService'];


function foundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItemsList.html',
    scope: {
      
      items:'<',
      onRemove: '&'
    },
    controller: foundItemsDirectiveController,
    controllerAs: 'list',
    bindToController: true
  };

  return ddo;
}

function foundItemsDirectiveController(){
    list=this;
    list.isEmpty=function(){
        if(list.items==undefined){
            return false;
        }
        else if(list.items.length===0){
            return true;
        }else{
            return false;
        }
    }
}

    function NarrowItDownController(MenuSearchService) {
        var menu = this;
        menu.findItems = function () {
            //console.log('in ctrl');
            if(menu.input==undefined || menu.input.length===0){
                menu.found=[];
            }else{
            var promise = MenuSearchService.getMatchedMenuItems(menu.input);
            promise.then(function (response) {
                //console.log(response);
                //console.log(response.foundItems);
                menu.found = response;
            })
                .catch(function (error) {
                    console.log("Something went terribly wrong.");
                });
            }
        };

        menu.removeItem=function(index){
            menu.found.splice(index,1);
        };
    }


    MenuSearchService.$inject = ['$http', 'ApiBasePath'];
    function MenuSearchService($http, ApiBasePath) {
        var service = this;
        service.getMatchedMenuItems = function (shortName) {
            return $http({
                method: "GET",
                url: (ApiBasePath + "/menu_items.json")
            }).then(function (result) {
                var items = result.data;
                var foundItems = [];
                for (var i = 0; i < items.menu_items.length; i++) {
                    if (items.menu_items[i].description.toLowerCase().indexOf(shortName) !== -1) {
                        foundItems.push(items.menu_items[i]);
                    }
                }
                return foundItems;
            })
        };

    }
})();