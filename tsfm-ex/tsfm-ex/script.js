var urls = JSON.parse(f.readString(doc+"/tsfm-ex/urls.json"));
var urlList = {};
var result = [];
for(var n = 0;n<urls.length;n++){
  var rq = new Request(urls[n]);
  var rqjson = await rq.loadJSON();
  urlList = Object.assign(urlList, rqjson);
}
switch(parameter[0]){
  case "search":
  case "-s":
    if(parameter[1]===undefined){
      parameter[1]="";
    }
    var nameList = Object.keys(urlList);
    for(var n=0;n<nameList.length;n++){
      if(nameList[n].includes(parameter[1])){
        result.push({
          "style":"display:block;",
          "str":nameList[n]
        });
      }
    }
  break;
  case "install":
  case "-i":
    if(parameter[1]){
      for(var n=1;n<parameter.length;n++){
        if(urlList[parameter[n]]){
          var rq = new Request(urlList[parameter[n]].url);
          var rqstr = await rq.loadString();
          switch(urlList[parameter[n]].type){
            case "command":
              await f.writeString(doc + "/tsfm-ex/" + parameter[n], rqstr)
              commands[parameter[n]]="/tsfm-ex/" + parameter[n];
              await f.writeString(doc+"/tsfm-ex/commands.json", JSON.stringify(commands))
            break;
            case "Scriptable":
              await f.writeString(doc + "/" + parameter[n], rqstr)
            break;
          }
        }else{
          result.push({
            "style":"color:#ff3333",
            "str":"[ERROR] "
          });
          result.push({
            "style":"",
            "str":parameter[n]+"was undefined"
          })
        }
      }
      result.push({
        "style":"",
        "str":"install complete"
      })
    }else{
      result.push({
        "style":"",
        "str":"To install script, write 'script install [script name]'."
      })
    }
  break;
  case "delete":
  case "-d":
    for(var n=1;n<parameter.length;n++){
      if(commands[parameter[n]]){
        await f.remove(doc + commands[parameter[n]]);
        delete commands[parameter[n]];
        await f.writeString(doc+"/tsfm-ex/commands.json", JSON.stringify(commands))
      }else if(f.fileExists(pass+"/"+parameter[n])){
        await f.remove(pass+"/"+parameter[n]);
      }else if(f.fileExists(parameter[n])){
        await f.remove(parameter[n]);
      }else{
        result.push({
          "style":"color:#ff3333",
          "str":"[ERROR] "
        });
        result.push({
          "style":"",
          "str":parameter[n]+"was undefined"
        })
      }
    }
    result.push({
      "style":"",
      "str":"delete complete"
    })
  break;
  case "addURL":
  case "-a":
    urls=urls.concat(parameter.slice(1))
    await f.writeString(doc+"/tsfm-ex/urls.json", JSON.stringify(urls))
  break;
  case "-v":
    result.push({
      "style":"",
      "str":"1.0"
    })
  break;
  case "-h":
  default:
    result.push({
      "style":"",
      "str":`
install [script name] : You can install scripts.<br/>
delete [script name]  : You can delete scripts.<br/>
delete [file pass]    : You can delete files.<br/>
search [String]       : You can search scripts.<br/>
addURL [URL]          : You can add URL of JSON which includes script names and urls.<br/>
version               : show version.<br/>
help                  : show help.<br/>
You can use -i, -d, -s, -a, -v, -h instead if install, delete, search, addURL, version, help.
`
    })
  break;
}