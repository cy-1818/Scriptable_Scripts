return (async function(){
  var result = []
  try{
    if(parameter[1]){
      await f.writeString(formatPath(parameter[1], pass), await new Request(parameter[0]).loadString());
      result = [{
        "style":"",
        "str":"success!"
      }]
    }else if(parameter[0] == "-v"){
      result = [{
        "style":"",
        "str":"2.0"
      }]
    }else if(parameter[0] == "-h"){
      result = [{
        "style":"",
        "str":"get [url] [fileName] : download file from url. "
      }]
    }else if(commands.show){
      var list = (await new Request(parameter[0]).loadString()).split("\n")
      list.unshift("-c");
      result = await Command("show", list);
    }else{
      result = [{
        "style":"color:#ff3333",
        "str":"[ERROR] "
      },{
        "style":"color:#ff3333",
        "str":"write file name. If you install \"show\", you can only download and look."
      }]
    }
  }catch(e){
    result = [{
      "style":"color:#ff3333",
      "str":`[${e.name}] ${e.message}`
    }]
  }
  return result;
})()
