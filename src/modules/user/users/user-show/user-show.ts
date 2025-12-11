import { UsersDataService } from "../../user.types";

interface UserShowScope extends ng.IScope {
  UserData: UsersDataService;
  calculateAge(): number;
}

class UserShowController implements ng.IController {
  static $inject = ["$scope", "UsersData"];

  constructor(private readonly $scope: UserShowScope, private readonly usersData: UsersDataService) {
    this.$scope.UserData = this.usersData;
    this.$scope.calculateAge = this.calculateAge;
  }

  private calculateAge = (): number => {
    const birthDateValue = this.usersData.shownUser.dateOfBirth;
    if (!birthDateValue) {
      return 0;
    }

    const birthDate = new Date(birthDateValue);
    const now = new Date();
    return Math.max(now.getFullYear() - birthDate.getFullYear(), 0);
  };
}

export const userShowDirective: ng.IDirectiveFactory = () => ({
  restrict: "E",
  scope: {},
  controller: UserShowController,
  templateUrl: "/modules/user/users/user-show/user-show.view.html"
});
