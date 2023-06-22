return (async function(){
    if(!fmi.fileExists(doci+"/tsfm-ex/scripts.json")){
      var scripts = {}
      var commandKeys = Object.keys(commands);
      for(var n=0;n<commandKeys.length;n++){
        scripts[commandKeys] = {
          "path":doci+commands[commandKeys],
          "type":"command"
        }
      }
      await fmi.writeString(doci+"/tsfm-ex/scripts.json", JSON.Stringify(scripts, null, "\t")
    }else{
      scripts = JSON.parse(fmi.readString(doci+"/tsfm-ex/scripts.json"));
    }
	var urls = JSON.parse(fmi.readString(doci+"/tsfm-ex/urls.json"));
	var urlList = {};
	var result = [];
	var notOnly = false
	for(var n = 0;n<urls.length;n++){
	  var rq = new Request(urls[n]);
	  var rqjson = await rq.loadJSON();
	  urlList = Object.assign(urlList, rqjson);
	}
	try{
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
		  case "List":
		  case "-l":
		    var nameList = Object.keys(scripts);
		    for(var n=0;n<nameList.length;n++){
		      result.push({
		        "style":"display:block;",
		        "str":nameList[n]
		      });
		    }
		  break;
		  case "Update"
		  case "-u"
		    for(var n=0;i<Object.keys(scripts).length;n++){
		      parameter.push(Object.keys(scripts)[n])
		    }
		  case "install":
		  case "-i":
		    notOnly = true;
		  case "installOnly":
		  case "-io":
		    if(parameter[1]){
		      for(var n=1;n<parameter.length;n++){
		        if(urlList[parameter[n]]){
		          var rq = new Request(urlList[parameter[n]].url);
		          var rqstr = await rq.loadString();
		          var newPath;
		          switch(urlList[parameter[n]].type){
		            case "command":
		              newPath = doci + "/tsfm-ex/" + urlList[parameter[n]].name
		              commands[parameter[n]]="/tsfm-ex/" + urlList[parameter[n]].name;
		              await fmi.writeString(doci+"/tsfm-ex/commands.json", JSON.stringify(commands, null, "\t"))
		            break;
		            case "Scriptable":
		              newPath = doci + "/" + urlList[parameter[n]].name
		            break;
		            case "addition":
		              newPath = doci + "/tsfm-ex/" + urlList[parameter[n]].name
		            break;
		          }
		          await fmi.writeString(newPath, rqstr)
		          scripts[parameter[n]]={
		            "path":newPath,
		            "type":urlList[parameter[n]].type,
		            "name":urlList[parameter[n]].name,
		            "dependence":urlList[parameter[n]].dependence
		          }
		          await fmi.writeString(doci + "/tsfm-ex/scripts.json", JSON.stringify(scripts, null, "\t"))
		          if(notOnly && urlList[parameter[n]].dependence){
		            for(var i=0;i<urlList[parameter[n]].dependence.length;i++){
		              if(!parameter.includes(urlList[parameter[n]].dependence[i])){
		                parameter.push(urlList[parameter[n]].dependence[i])
		              }
		            }
		          }
		          await Print([{
		            "style":"",
		            "str":parameter[n]+" was installed"
		          }])
		        }else{
		          await Print([{
		            "style":"color:#ff3333",
		            "str":"[ERROR] "
		          },{
		            "style":"",
		            "str":parameter[n]+" was undefined"
		          }])
		        }
		      }
		      result.push({
		        "style":"",
		        "str":"install complete"
		      })
		    }else{
		      result.push({
		        "style":"",
		        "str":"To install script, write \'script install [script name]\'."
		      })
		    }
		  break;
		  case "delete":
		  case "-d":
		    notOnly = true
		  case "deleteOnly":
		  case "-do":
		    for(var n=1;n<parameter.length;n++){
		      if(scripts[parameter[n]]){
		        if(scripts[parameter[n]].type == "command"){
		          delete commands[parameter[n]];
		          await fmi.writeString(doci+"/tsfm-ex/commands.json", JSON.stringify(commands, null, "\t"))
		        }
		        await fmi.remove(scripts[parameter[n]].path);
		        delete scripts[parameter[n]];
		        await fmi.writeString(doci+"/tsfm-ex/scripts.json", JSON.stringify(scripts, null, "\t"))
		        if(notOnly && scripts[parameter[n]].dependence){
		            for(var i=0;i<scripts[parameter[n]].dependence.length;i++){
		              if(!parameter.includes(scripts[parameter[n]].dependence[i])){
		                parameter.push(scripts[parameter[n]].dependence[i])
		              }
		            }
		          }
		        await Print([{
		          "style":"",
		          "str":parameter[n]+" was deleted"
		        }])
		      }else{
		        await Print([{
		            "style":"color:#ff3333",
		            "str":"[ERROR] "
		          },{
		            "style":"",
		            "str":parameter[n]+" was undefined"
		          }])
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
		    await f.writeString(doc+"/tsfm-ex/urls.json", JSON.stringify(urls, null, "\t"))
		  break;
		  case "removeURL":
		  case "-r":
		    urls.splice(urls.indexOf(parameter[1]), 1)
		    await f.writeString(doc+"/tsfm-ex/urls.json", JSON.stringify(urls, null, "\t"))
		  break;
		  case "version":
		  case "-v":
		    result.push({
		      "style":"",
		      "str":"3.0"
		    })
		  break;
		  case "help":
		  case "-h":
		  default:
		    result.push({
		      "style":"",
		      "tag":"pre",
              "notPara":true,
		      "str":`
install [script name] : You can install scripts.<br/>
delete [script name]  : You can delete scripts.<br/>
search [String]       : You can search scripts.<br/>
list                  : You can check installed scripts list.<br/>
update                : You can update installed scripts.<br/>
addURL [URL]          : You can add URL of JSON which includes script names and urls.<br/>
removeURL [URL]       : you can delete a URL.<br/>
version               : show version.<br/>
help                  : show help.<br/>
installOnly           : install without dependences.<br/>
deleteOnly            : install without dependences.<br/>
You can use -i, -d, -s, -l, -u, -a, -r, -v, -h, -io, -do instead of them.`.split("\n").join("")
		    })
		  break;
		}
	}catch(e){
	  await Print([{
	    "style":"color:#ff3333",
	    "str":`[${e.name}] ${e.message}`
	  }]);
	}
	return result;
})()
