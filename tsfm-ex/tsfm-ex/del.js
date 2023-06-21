return (async function(){
  var result = []
  for(var n=0;n<parameter.length;n++){
    if(f.fileExists(formatPath(parameter[n], pass))){
      await f.remove(formatPath(parameter[n], pass))
      result.push({
        "style":"",
        "str":parameter[n]+" is deleted."
      });
    }else{
      result.push({
        "style":"color:#ff3333",
        "str":"[ERROR] "
      },{
        "style":"",
        "str":parameter[n]+" was undefined."
      });
    }
    return result;
  }
})()