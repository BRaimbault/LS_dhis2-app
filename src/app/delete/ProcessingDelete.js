import Tools from './../Tools';

var updates = [];

var ProcessingDelete = {
  start: function(e) {
    Tools.getTrackedEntityInstance("NE",{"CUIC":"_","ClientCode":"_"},ProcessingDelete.noTrackedEntityInstances,ProcessingDelete.deleteTrackedEntityInstances);
  },
  deleteTrackedEntityInstances: function(clientObj,payload) {

    console.log(payload);

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        console.log(JSON.parse(this.responseText));
      }
    });

    xhr.open("POST", "http://localhost:8989/dhis/api/trackedEntityInstances?strategy=DELETE");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.send(JSON.stringify(payload));

  },
  noTrackedEntityInstances: function() {
    console.log("No trackedEntityAttributes imported to delete.");
  }
};

export default ProcessingDelete;
