import React from 'react';

var url = "http://localhost:8989/dhis/api/documents/Zacj6Ykgyox/data";

ImportModule = React.createClass({
  downloadFile(){
    /* bookType can be any supported output type */
    var wopts = { bookType:'xlsx', bookSST:false, type:'binary' };

    var wbout = XLSX.write(workbook,wopts);

    function s2ab(s) {
      var buf = new ArrayBuffer(s.length);
      var view = new Uint8Array(buf);
      for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
      return buf;
    }

    /* the saveAs call downloads a file on the local machine */
    saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), "test.xlsx");
  }

  render: function(){

  }
});
