import Tools from './../Tools';

var updates = [];

var ProcessingDelete = {
  start: function(e) {
    Tools.getTrackedEntityInstance("NE",{"CUIC":"_","ClientCode":"_"},ProcessingDelete.noTrackedEntityInstances,ProcessingDelete.deleteTrackedEntityInstances);
  },
  deleteTrackedEntityInstances: function(clientObj,payload) {
    console.log("fun ProcessingDelete.deleteTrackedEntityInstancesInitiate: - params: clientObj: ", clientObj, ", payload: ", payload);

    var deleteList = payload.trackedEntityInstances;
    deleteList.forEach(function(deleteThis,e) {
      console.log(e+1,"/",deleteList.length," - ",deleteThis);
      var payload = null;

      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;

      var url = "http://localhost:8989/dhis/api/trackedEntityInstances/" + deleteThis.trackedEntityInstance;
      console.log(url);
      xhr.open("DELETE", url);
      xhr.send(payload);
    });
  },
  noTrackedEntityInstances: function() {
    console.log("No trackedEntityAttributes imported to delete.");
  }
};

export default ProcessingDelete;
