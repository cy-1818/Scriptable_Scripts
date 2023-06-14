//(function(){
  var result = [];
  try {
    var files = f.listContents(pass);
    for (var n=0;n<files.length;n++) {
      var file = files[n];
      if (f.isDirectory(pass+'/'+file)) {
        result.push({
          "style":"color:#90ef90;display:block",
          "str":file
        });
      }else{
        result.push({
          "style":"color:white;display:block",
          "str":file
        });
      }
    }
  } catch (e) {
    result = [{
      "style":"color:#ff3333",
      "str":"[ERROR] "+e.message
    }];
  }
  return result;
//})()