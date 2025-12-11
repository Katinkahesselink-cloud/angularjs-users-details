export interface UserRecord {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  dateOfBirth: string;
  selected?: boolean;
  $$hashKey?: string;
}

export interface UsersAPIService {
  getUsers(): ng.IHttpPromise<UserRecord[]>;
}

export interface UsersDataService {
  users: UserRecord[];
  shownUser: Partial<UserRecord>;
  getUsers(): ng.IPromise<ng.IHttpResponse<UserRecord[]>>;
  getUserById(userId: number | string): ng.IPromise<ng.IHttpResponse<UserRecord | undefined>>;
  saveUser(user: UserRecord): void;
  deleteUser(userId: number): void;
  patchDelete(users: UserRecord[]): void;
}
