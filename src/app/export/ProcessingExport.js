import Tools from './../Tools';

import Export from './Export';

var ProcessingExport = {
  getHardcoded: function() {
    return(
      {

      }
    );
  },
  getUrl: function() {
    //var e = "production";
    var e = undefined;
    if(e){
      console.log('prod_path');
      window.dhisUrl1 = window.location.href.split('apps/')[0];
      window.dhisUrl2 = window.location.href.split('apps/')[0];
      console.log("window.dhisUrl: ", window.dhisUrl);
    }else{
      console.log('dev_path');
      window.dhisUrl1 = "http://localhost:8989/dhis/";
      window.dhisUrl2 = "https://sandbox.psi-mis.org/";
      console.log("window.dhisUrl: ", window.dhisUrl);
    }
  },
  export_test_month: function() {
    /* https://sandbox.psi-mis.org/dhis-web-event-reports/index.html?id=qN19ChstWn9  */
    /* set up XMLHttpRequest */
        ProcessingExport.getUrl();
        var url = window.dhisUrl1 + "api/categories/qVl8p3w3fI5.json?fields=categoryOptions[id]";
        console.log(url);
        var oReq = new XMLHttpRequest();
        oReq.withCredentials = true;
        oReq.open("GET", url, true);
        //oReq.setRequestHeader("authorization", "Basic YnJhaW1iYXVsdDpEaXN0cmljdDg4");

        oReq.onload = function(e) {
          var array = JSON.parse(e.target.response).categoryOptions;
          console.log(array);
          var categoryOptions = "";
          array.forEach(function(opt) {
            categoryOptions = categoryOptions + ";" + opt.id;
          });
          categoryOptions = categoryOptions;
          console.log(categoryOptions);
          var url1 = "api/analytics/events/query/KDgzpKX3h2S.xls?stage=OSpZnLBMVhr&dimension=pe:LAST_MONTH&dimension=ou:vJNI6blhosr&dimension=zRA08XEYiSF&dimension=Nz4w5ctIBLO&dimension=wSp6Q7QDMsk&dimension=u57uh7lHwF8&dimension=mW2l3T2zL0N&dimension=mUxDHgywnn2&dimension=vTPYC9BXPNn&dimension=CCVO6BZMrnp&dimension=Y35TizULMzg&dimension=kdzfhXK71re&dimension=Fty7JMtC7mX&dimension=vD0qayOxs64&dimension=tzZCy78mWEG&dimension=gYiUqfKwktq&dimension=kpMMzIM3t5I&dimension=fa7lRYdWJfl&dimension=PWy9kmp4Pmb&dimension=XTWSNIlxkEj&dimension=PyfoYtwNGrI&dimension=qVl8p3w3fI5:";
          var url2 = "&displayProperty=SHORTNAME";
          var url3 = window.dhisUrl2 + url1 + categoryOptions + url2;
          window.open(url3);
        }
        oReq.send();
  },
  export_test_open: function() {
    ProcessingExport.getUrl();
    var url = window.dhisUrl + "dhis-web-event-reports/index.html?id=UngpAAZjEmt";
    window.open(url);
  },
};

export default ProcessingExport;
