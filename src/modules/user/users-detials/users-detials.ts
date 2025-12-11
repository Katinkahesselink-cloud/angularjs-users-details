import { UserRecord, UsersDataService } from "../user.types";

declare const jQuery: any;

interface UserDetailsScope extends ng.IScope {
  user: UserRecord;
  editUser: ng.IFormController;
  saveUser(): void;
  checkEdits(): void;
  cancelEdits(): void;
}

class UserDetailsController implements ng.IController {
  static $inject = ["$scope", "$routeParams", "$location", "UsersData"];

  constructor(
    private readonly $scope: UserDetailsScope,
    private readonly $routeParams: ng.route.IRouteParamsService,
    private readonly $location: ng.ILocationService,
    private readonly usersData: UsersDataService
  ) {
    this.$scope.user = {} as UserRecord;
    this.$scope.saveUser = this.saveUser;
    this.$scope.checkEdits = this.checkEdits;
    this.$scope.cancelEdits = this.cancelEdits;
  }

  $onInit(): void {
    this.usersData.getUserById(this.$routeParams.id).then(response => {
      this.$scope.user = { ...(response.data || {}) } as UserRecord;
    });
  }

  private saveUser = (): void => {
    this.usersData.saveUser(this.$scope.user);
    this.$location.url("/users");
  };

  private checkEdits = (): void => {
    if (this.$scope.editUser && this.$scope.editUser.$dirty) {
      jQuery("#cancelUserEdit").modal("show");
    }
  };

  private cancelEdits = (): void => {
    jQuery("#cancelUserEdit").modal("hide");
    this.$location.url("/users");
  };
}

export const userDetailsDirective: ng.IDirectiveFactory = () => ({
  restrict: "E",
  scope: {},
  controller: UserDetailsController,
  templateUrl: "/modules/user/users-detials/users-detials.view.html"
});
