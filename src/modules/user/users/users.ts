import { UserRecord, UsersDataService } from "../user.types";

type JsonRow = Record<string, unknown>;

type Json2CsvService = {
  download(data: JsonRow[]): void;
};

interface UsersScope extends ng.IScope {
  users: UserRecord[];
  currentPage: number;
  getUsersPage(): UserRecord[];
  previousPage(): void;
  nextPage(): void;
  isLastPage(): boolean;
  getSelectedUsers(): UserRecord[];
  isUserSelected(): boolean;
  deleteSelected(): void;
  downloadSelected(): void;
}

class UsersController implements ng.IController {
  static $inject = ["$scope", "UsersData", "Json2Csv"];

  private readonly rowsPerPage = 10;

  constructor(
    private readonly $scope: UsersScope,
    private readonly usersData: UsersDataService,
    private readonly json2Csv: Json2CsvService
  ) {
    this.$scope.users = [];
    this.$scope.currentPage = 0;
    this.$scope.getUsersPage = this.getUsersPage;
    this.$scope.previousPage = this.previousPage;
    this.$scope.nextPage = this.nextPage;
    this.$scope.isLastPage = this.isLastPage;
    this.$scope.getSelectedUsers = this.getSelectedUsers;
    this.$scope.isUserSelected = this.isUserSelected;
    this.$scope.deleteSelected = this.deleteSelected;
    this.$scope.downloadSelected = this.downloadSelected;
  }

  $onInit(): void {
    this.usersData.getUsers();
  }

  private getUsersPage = (): UserRecord[] => {
    const start = this.$scope.currentPage * this.rowsPerPage;
    return this.usersData.users.slice(start, start + this.rowsPerPage);
  };

  private previousPage = (): void => {
    if (this.$scope.currentPage > 0) {
      this.$scope.currentPage -= 1;
    }
  };

  private nextPage = (): void => {
    if (!this.isLastPage()) {
      this.$scope.currentPage += 1;
    }
  };

  private isLastPage = (): boolean => {
    const totalPages = Math.ceil(this.usersData.users.length / this.rowsPerPage);
    return this.$scope.currentPage >= Math.max(totalPages - 1, 0);
  };

  private isUserSelected = (): boolean => {
    return this.usersData.users.some(user => user.selected);
  };

  private getSelectedUsers = (): UserRecord[] => {
    return this.usersData.users.filter(user => user.selected);
  };

  private deleteSelected = (): void => {
    this.usersData.patchDelete(this.getSelectedUsers());
  };

  private downloadSelected = (): void => {
    const cleanData = this.getSelectedUsers().map(user => {
      const clone: JsonRow = { ...user };
      delete clone.$$hashKey;
      delete clone.selected;
      return clone;
    });

    this.json2Csv.download(cleanData);
  };
}

export const usersDirective: ng.IDirectiveFactory = () => ({
  restrict: "E",
  scope: {},
  controller: UsersController,
  templateUrl: "/modules/user/users/users.view.html"
});
