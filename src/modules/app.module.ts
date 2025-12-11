import "./admin/admin.module";
import "./user/user.module";
import "./common/common.module";
import "./helpers/helpers.module";
import { appDirective } from "./app/app";

declare const angular: ng.IAngularStatic;

(() => {
  "use strict";

  const moduleName = "UsersApp";

  angular.module(moduleName, [
    "ngRoute",
    "UsersApp.Partials",
    "UsersApp.AdminModule",
    "UsersApp.UsersModule",
    "UsersApp.CommonModule",
    "UsersApp.Helpers"
  ]);

  angular.module(moduleName).directive("app", appDirective);
})();
