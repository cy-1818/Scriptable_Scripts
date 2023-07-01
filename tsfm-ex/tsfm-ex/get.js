return (async function(){
  var result = []
  try{
    await f.writeString(formatPath(parameter[1], pass), await new Request(parameter[0]).loadString());
    result = [{
      "style":"",
      "str":"success!"
    }]
  }catch(e){
    result = [{
      "style":"color:#ff3333",
      "str":`[${e.name}] ${e.message}`
    }]
  }
  return result;
})()
