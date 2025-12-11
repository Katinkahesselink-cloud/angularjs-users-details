import "./users.api";
import { UserRecord, UsersAPIService, UsersDataService } from "./user.types";

declare const angular: ng.IAngularStatic;

class UsersData implements UsersDataService {
  static $inject = ["$q", "UsersAPI"];

  users: UserRecord[] = [];
  shownUser: Partial<UserRecord> = {};

  constructor(private readonly $q: ng.IQService, private readonly usersAPI: UsersAPIService) {}

  getUsers(): ng.IPromise<ng.IHttpResponse<UserRecord[]>> {
    if (this.users.length) {
      return this.$q.resolve({ data: this.users } as ng.IHttpResponse<UserRecord[]>);
    }

    return this.usersAPI.getUsers().then(response => {
      this.users = response.data;
      return response;
    });
  }

  getUserById(userId: number | string): ng.IPromise<ng.IHttpResponse<UserRecord | undefined>> {
    return this.getUsers().then(response => {
      const numericId = typeof userId === "string" ? parseInt(userId, 10) : userId;
      const user = response.data.find(item => item.id === numericId);
      return {
        ...response,
        data: user
      } as ng.IHttpResponse<UserRecord | undefined>;
    });
  }

  saveUser(updatedUser: UserRecord): void {
    for (let index = 0; index < this.users.length; index += 1) {
      if (this.users[index].id === updatedUser.id) {
        this.users[index] = updatedUser;
        return;
      }
    }
  }

  deleteUser(userId: number): void {
    this.users = this.users.filter(user => user.id !== userId);
  }

  patchDelete(users: UserRecord[]): void {
    const userIds = users.map(user => user.id);
    this.users = this.users.filter(user => userIds.indexOf(user.id) === -1);
  }
}

(() => {
  "use strict";

  angular.module("UsersApp.UsersModule.Data", ["UsersApp.UsersModule.Api"]);
  angular.module("UsersApp.UsersModule.Data").service("UsersData", UsersData);
})();
