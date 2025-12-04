type RouteProvider = ng.route.IRouteProvider;

export function Config($routeProvider: RouteProvider): void {
  $routeProvider.when("/", {
    template: "<dashboard></dashboard>"
  });
}

Config.$inject = ["$routeProvider"];
