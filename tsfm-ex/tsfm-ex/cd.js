if(parameter[0]=="//local"){
  f=FileManager.local();
  result = [{
    "style":"",
    "str":"moved to local file"
  }];
  doc = f.documentsDirectory();
  pass = doc;
  space = "local";
}else if(parameter[0]=="//iCloud"){
  f=FileManager.iCloud();
  result = [{
    "style":"",
    "str":"moved to iCloud file"
  }];
  doc = f.documentsDirectory();
  pass = doc;
  space = "iCloud";
}else{
  var tmp = pass
  pass = formatPath(parameter[0], pass);
  if (!f.fileExists(pass)) {
    pass = tmp
    result = [{
        "style":"color:#ff3333",
        "str":"[ERROR] No such file or directory"
      }];
  } else if (!f.isDirectory(pass)) {
    result = [{
        "style":"color:#ff3333",
        "str":`[ERROR] ${pass} is not a directory`
      }];
  } else {
    result = []
  }
}
return result;