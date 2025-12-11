import "./users.api";
import "./users.data";
import { Config } from "./user.config";
import { usersDirective } from "./users/users";
import { userRowDirective } from "./users/user-row/user-row";
import { userDetailsDirective } from "./users-detials/users-detials";
import { userShowDirective } from "./users/user-show/user-show";

declare const angular: ng.IAngularStatic;

(() => {
  "use strict";

  const moduleName = "UsersApp.UsersModule";

  angular.module(moduleName, ["UsersApp.UsersModule.Api", "UsersApp.UsersModule.Data"]);
  angular.module(moduleName).config(Config);
  angular.module(moduleName).directive("users", usersDirective);
  angular.module(moduleName).directive("userRow", userRowDirective);
  angular.module(moduleName).directive("userDetials", userDetailsDirective);
  angular.module(moduleName).directive("userShow", userShowDirective);
})();
