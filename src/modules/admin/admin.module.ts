import { Config } from "./admin.config";
import { dashboardDirective } from "./dashboard/dashboard";

declare const angular: ng.IAngularStatic;

(() => {
  "use strict";

  const moduleName = "UsersApp.AdminModule";

  angular.module(moduleName, []);
  angular.module(moduleName).config(Config);
  angular.module(moduleName).directive("dashboard", dashboardDirective);
})();
