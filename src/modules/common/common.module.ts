import { headerComponentDirective } from "./header-component/header";
import { footerComponentDirective } from "./footer-component/footer";

declare const angular: ng.IAngularStatic;

(() => {
  "use strict";

  const moduleName = "UsersApp.CommonModule";

  angular.module(moduleName, []);
  angular.module(moduleName).directive("headerComponent", headerComponentDirective);
  angular.module(moduleName).directive("footerComponent", footerComponentDirective);
})();
