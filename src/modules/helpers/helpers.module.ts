import "./services/Json2Csv.service";

declare const angular: ng.IAngularStatic;

(() => {
  "use strict";

  angular.module("UsersApp.Helpers", ["UsersApp.Helpers.Json2Csv"]);
})();
