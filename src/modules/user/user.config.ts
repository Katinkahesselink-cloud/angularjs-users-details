type RouteWithPage = ng.route.IRoute & {
  page?: {
    title: string;
  };
};

export function Config($routeProvider: ng.route.IRouteProvider): void {
  $routeProvider
    .when(
      "/users",
      {
        template: "<users></users>",
        page: {
          title: "Users"
        }
      } as RouteWithPage
    )
    .when(
      "/users/:id",
      {
        template: "<user-detials></user-detials>",
        page: {
          title: "User Details"
        }
      } as RouteWithPage
    );
}

Config.$inject = ["$routeProvider"];
