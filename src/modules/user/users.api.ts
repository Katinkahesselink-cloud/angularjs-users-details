import { UserRecord, UsersAPIService } from "./user.types";

declare const angular: ng.IAngularStatic;

class UsersAPI implements UsersAPIService {
  static $inject = ["$http"];

  constructor(private readonly $http: ng.IHttpService) {}

  getUsers(): ng.IHttpPromise<UserRecord[]> {
    return this.$http<UserRecord[]>({
      method: "GET",
      url: "/assets/data/users.json",
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
}

(() => {
  "use strict";

  angular.module("UsersApp.UsersModule.Api", []);
  angular.module("UsersApp.UsersModule.Api").service("UsersAPI", UsersAPI);
})();
