import { UserRecord, UsersDataService } from "../../user.types";

declare const jQuery: any;

interface UserRowScope extends ng.IScope {
  user: UserRecord;
  showUser(): void;
  editUser(): void;
  deleteUser(): void;
}

class UserRowController implements ng.IController {
  static $inject = ["$scope", "$location", "UsersData"];

  constructor(
    private readonly $scope: UserRowScope,
    private readonly $location: ng.ILocationService,
    private readonly usersData: UsersDataService
  ) {
    this.$scope.showUser = this.showUser;
    this.$scope.editUser = this.editUser;
    this.$scope.deleteUser = this.deleteUser;
  }

  private showUser = (): void => {
    this.usersData.shownUser = this.$scope.user;
    jQuery("#userDetailsModal").modal("show");
  };

  private editUser = (): void => {
    this.$location.url(`/users/${this.$scope.user.id}`);
  };

  private deleteUser = (): void => {
    this.usersData.deleteUser(this.$scope.user.id);
  };
}

export const userRowDirective: ng.IDirectiveFactory = () => ({
  restrict: "EA",
  scope: {
    user: "="
  },
  controller: UserRowController,
  templateUrl: "/modules/user/users/user-row/user-row.view.html"
});
