type JsonRow = Record<string, string | number | boolean | null | undefined>;

type UrlFactory = typeof URL & {
  createObjectURL(object: Blob): string;
  revokeObjectURL(url: string): void;
};

type Json2CsvFn = (data: JsonRow[]) => void;

type Json2CsvService = {
  download: Json2CsvFn;
};

declare const angular: ng.IAngularStatic;

(() => {
  "use strict";

  angular.module("UsersApp.Helpers.Json2Csv", []);
  angular.module("UsersApp.Helpers.Json2Csv").service("Json2Csv", Json2Csv);

  function Json2Csv(this: Json2CsvService) {
    this.download = (data: JsonRow[]) => {
      if (!data || !data.length) {
        return;
      }

      const header = Object.keys(data[0]).join(",");
      const body = data
        .map(row =>
          Object.values(row)
            .map(value => (value ?? "").toString())
            .join(";")
        )
        .join("\r\n");

      const csv = `${header}\r\n${body}`;
      const blob = new Blob([csv], { type: "text/csv" });
      const urlFactory = (window.URL || (window as any).webkitURL) as UrlFactory;
      const downloadUrl = urlFactory.createObjectURL(blob);
      const filename = "UserExport.csv";

      const link = document.createElement("a");
      link.style.display = "none";
      link.download = filename;
      link.href = downloadUrl;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      urlFactory.revokeObjectURL(downloadUrl);
    };
  }
})();
