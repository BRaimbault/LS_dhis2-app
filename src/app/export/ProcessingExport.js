import Tools from './../Tools';

import Export from './Export';

var ProcessingExport = {
  getHardcoded: function() {
    return(
      {

      }
    );
  },
  exportXls: function(arrayArgs) {
    var programStage = arrayArgs[0];
    var urlTable = arrayArgs[1];
    console.log("fun ProcessingExport.exportXls - params: ", programStage, urlTable);
    if (window.config) {

      // Gets all categoryOptions
      var categroyId = window.config.psiWorkers.categroyId;
      var url = window.dhisUrl + "api/categories/" + categroyId + ".json?fields=categoryOptions[id]";

      var oReq = new XMLHttpRequest();
      oReq.withCredentials = true;
      oReq.open("GET", url, true);

      oReq.onload = function(e) {
        var array = JSON.parse(e.target.response).categoryOptions;
        var categoryOptions = "";
        array.forEach(function(opt) {
          categoryOptions = categoryOptions + ";" + opt.id;
        });
        categoryOptions = categoryOptions;

        // Gets the export
        var url1 = window.config.exports[programStage][urlTable];
        var url2 = "&displayProperty=SHORTNAME";
        var url3 = window.dhisUrl + url1 + "&dimension=" + categroyId + ":" + categoryOptions + url2;
        console.log("fun ProcessingExport.exportXls - url: ", url3);
        window.open(url3);
      }
      oReq.send(null);

    }
  },
  exportUID: function(arrayArgs) {
    var programStage = arrayArgs[0];
    var UID = arrayArgs[1];
    console.log("fun ProcessingExport.exportUID - params: ", programStage, UID);

    if (window.config) {

      var url = window.dhisUrl + "dhis-web-event-reports/index.html?id=" + window.config.exports[programStage][UID];
      console.log("fun ProcessingExport.exportUID - url: ", url);
      window.open(url);

    }
  },
};

export default ProcessingExport;
