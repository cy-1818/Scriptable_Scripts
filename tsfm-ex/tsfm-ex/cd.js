var tmp = pass
if (parameter[0]) {
  pass += "/" + parameter[0]
} else {
  pass = pass.split("/").slice(0,-1).join("/")
}
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
return result;