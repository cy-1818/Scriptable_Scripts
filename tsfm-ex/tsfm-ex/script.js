return (async function(){
    if(!fmi.fileExists(doci+"/tsfm-ex/scripts.json")){
      var scripts = {}
      var commandKeys = Object.keys(commands);
      for(var n=0;n<commandKeys.length;n++){
        scripts[commandKeys[n]] = {
          "path":doci+commands[commandKeys[n]],
          "type":"command"
        }
      }
      await fmi.writeString(doci+"/tsfm-ex/scripts.json", JSON.stringify(scripts, null, "\t"))
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
		  case "list":
		  case "-l":
		    var nameList = Object.keys(scripts);
		    for(var n=0;n<nameList.length;n++){
		      result.push({
		        "style":"display:block;",
		        "str":nameList[n]
		      });
		    }
		  break;
		  case "update":
		  case "-u":
		    for(var n=0;n<Object.keys(scripts).length;n++){
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
		            "dependence":urlList[parameter[n]].dependence,
		            "shortcuts":[]
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
		    await fmi.writeString(doci+"/tsfm-ex/commands.json", JSON.stringify(commands, null, "\t"))
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
		        if(notOnly && scripts[parameter[n]].dependence){
		          for(var i=0;i<scripts[parameter[n]].dependence.length;i++){
		            if(!parameter.includes(scripts[parameter[n]].dependence[i])){
		              parameter.push(scripts[parameter[n]].dependence[i])
		            }
		          }
		        }
		        if(scripts[parameter[n]].shortcuts){
		          for(var i=0;i<scripts[parameter[n]].shortcuts.length;i++){
		            delete commands[scripts[parameter[n]].shortcuts[i]];
		          }
		        }
		        await fmi.remove(scripts[parameter[n]].path);
		        delete scripts[parameter[n]];
		        await fmi.writeString(doci+"/tsfm-ex/scripts.json", JSON.stringify(scripts, null, "\t"))
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
		  case "package":
		  case "-p":
		    scripts[parameter[1]] = {
		      "path":formatPath(parameter[2], pass),
		      "type":"command",
		      "name":[parameter[2].split("/").pop()].name,
		      "dependence":parameter.slice(3),
		      "shortcuts":[]
		    }
		    commands[parameter[1]] = formatPath(parameter[2], pass).replace(doci, '')
		    await fmi.writeString(doci+"/tsfm-ex/scripts.json", JSON.stringify(scripts, null, "\t"))
		    await fmi.writeString(doci+"/tsfm-ex/commands.json", JSON.stringify(commands, null, "\t"))
		  break;
		  case "name":
		  case "-n":
		    commands[parameter[2]] = commands[parameter[1]]
		    scripts[parameter[1]].shortcuts.push(parameter[2]);
		    await fmi.writeString(doci+"/tsfm-ex/scripts.json", JSON.stringify(scripts, null, "\t"))
		    await fmi.writeString(doci+"/tsfm-ex/commands.json", JSON.stringify(commands, null, "\t"))
		  break;
		  case "version":
		  case "-v":
		    result.push({
		      "style":"",
		      "str":"4.0"
		    })
		  break;
		  case "help":
		  case "-h":
		  default:
		    var text = `
install [script name]    : You can install scripts.
delete [script name]     : You can delete scripts.
search [String]          : You can search scripts.
list                     : You can check installed scripts list.
update                   : You can update installed scripts.
addURL [URL]             : You can add URL of JSON which includes script names and urls.
removeURL [URL]          : You can delete a URL.
package [name] [path]    : You can make command from your local file.
name [command] [shorcut] : You can make shortcut.
version                  : show version.
help                     : show help.
installOnly              : install without dependences.
deleteOnly               : install without dependences.
You can use -i, -d, -s, -l, -u, -a, -r, -p, -n, -v, -h, -io, -do instead of them.`.split("\n");
            for(var n=0;n<text.length;n++){
		      result.push({
		        "style":"display:block",
		        "tag":"pre",
                "notPara":true,
		        "str":text[n]
		      });
		    }
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
