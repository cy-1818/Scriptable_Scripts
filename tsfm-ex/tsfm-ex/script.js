return (async function(){
    var firstRun = false;
    if(!fmi.fileExists(doci+"/tsfm-ex/scripts.json")){
      firstRun = true;
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
	var notOnly = false;
	var istr = "installed";
	var ifstr = "install complete"
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
		  case "commandlist":
		  case "-cl":
		    var nameList = Object.keys(scripts);
		    for(var n=0;n<nameList.length;n++){
		      if(scripts[nameList[n]].type == "command"){
		        result.push({
		          "style":"display:block;",
		          "str":nameList[n]
		        });
		      }
		    }
		  break;
		  case "Scriptablelist":
		  case "-Sl":
		    var nameList = Object.keys(scripts);
		    for(var n=0;n<nameList.length;n++){
		      if(scripts[nameList[n]].type == "Scriptable"){
		        result.push({
		          "style":"display:block;",
		          "str":nameList[n]
		        });
		      }
		    }
		  break;
		  case "Modulelist":
		  case "-Ml":
		    var nameList = Object.keys(scripts);
		    for(var n=0;n<nameList.length;n++){
		      if(scripts[nameList[n]].type == "Module"){
		        result.push({
		          "style":"display:block;",
		          "str":nameList[n]
		        });
		      }
		    }
		  break;
		  case "additionlist":
		  case "-al":
		    var nameList = Object.keys(scripts);
		    for(var n=0;n<nameList.length;n++){
		      if(scripts[nameList[n]].type == "addition"){
		        result.push({
		          "style":"display:block;",
		          "str":nameList[n]
		        });
		      }
		    }
		  break;
		  case "update":
		  case "-u":
		    for(var n=0;n<Object.keys(scripts).length;n++){
		      parameter.push(Object.keys(scripts)[n])
		    }
		    istr = "updated"
		    ifstr = "update complete"
		  case "install":
		  case "-i":
		    notOnly = true;
		    var depended={};
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
		            case "Module":
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
		            "depended":[],
		            "shortcuts":[]
		          }
		          await fmi.writeString(doci + "/tsfm-ex/scripts.json", JSON.stringify(scripts, null, "\t"))
		          if(notOnly && urlList[parameter[n]].dependence){
		            for(var i=0;i<urlList[parameter[n]].dependence.length;i++){
		              if(!parameter.includes(urlList[parameter[n]].dependence[i])){
		                parameter.push(urlList[parameter[n]].dependence[i])
		              }
		              if(depended[urlList[parameter[n]].dependence[i]] === undefined){
		                depended[urlList[parameter[n]].dependence[i]] = [];
		              }
		              depended[urlList[parameter[n]].dependence[i]].push(parameter[n]);
		            }
		          }
		          await Print([{
		            "style":"",
		            "str":parameter[n]+" was "+istr
		          }])
		        }else if(!scripts[parameter[n]].LOCAL){
		          await Print([{
		            "style":"color:#ff3333",
		            "str":"[ERROR] "
		          },{
		            "style":"",
		            "str":parameter[n]+" was undefined"
		          }])
		        }
		      }
		      var dlist = Object.keys(depended);
		      for(var n=0;n<dlist.length;n++){
		        scripts[dlist[n]].depended = depended[dlist[n]].concat()
		      }
		      await fmi.writeString(doci + "/tsfm-ex/scripts.json", JSON.stringify(scripts, null, "\t"))
		      result.push({
		        "style":"",
		        "str":ifstr
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
		      if(notOnly && scripts[parameter[n]].depended.length>0){
		        await Print([{
		            "style":"color:#ff3333",
		            "str":"[ERROR] "
		          },{
		            "style":"",
		            "str":parameter[n]+" is depended on other scripts. Use \"deleteOnly\" to delete."
		          }])
		      }else if(scripts[parameter[n]]){
		        if(scripts[parameter[n]].type == "command"){
		          delete commands[parameter[n]];
		          await fmi.writeString(doci+"/tsfm-ex/commands.json", JSON.stringify(commands, null, "\t"))
		        }
		        var dependence = scripts[parameter[n]].dependence
		        if(notOnly && dependence){
		          for(var i=0;i<dependence.length;i++){
		            if(scripts[dependence[i]] !== undefined){
		              scripts[dependence[i]].depended.splice(scripts[dependence[i]].depended.indexOf(parameter[n]), 1)
		              if(scripts[dependence[i]].depended.length === 0 && (scripts[dependence[i]].type == "additional" || scripts[dependence[i]].type == "Module")){
		                if(!parameter.includes(dependence[i])){
		                  parameter.push(dependence[i])
		                }
		              }
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
		      "shortcuts":[],
		      "LOCAL":true
		    }
		    if(parameter[3]){
		      scripts[parameter[1]].type = parameter[3];
		    }
		    if(scripts[parameter[1]].type == "command"){
		      commands[parameter[1]] = formatPath(parameter[2], pass).replace(doci, '')
		    }
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
		  case "AddDepend":
		  case "-AD":
		    if(scripts[parameter[1]].dependence===undefined){
		      scripts[parameter[1]].dependence = []
		    }
		    if(scripts[parameter[2]].depended===undefined){
		      scripts[parameter[2]].depended = []
		    }
		    scripts[parameter[1]].dependence.push(parameter[2]);
		    scripts[parameter[2]].depended.push(parameter[1]);
		    await fmi.writeString(doci+"/tsfm-ex/scripts.json", JSON.stringify(scripts, null, "\t"))
		  break;
		  case "DelDepend":
		  case "-DD":
		    if(scripts[parameter[1]].dependence){
		      scripts[parameter[1]].dependence.splice(scripts[parameter[1]].dependence.indexOf(parameter[2]), 1)
		    }
		    if(scripts[parameter[2]].depended){
		      scripts[parameter[2]].depended.splice(scripts[parameter[2]].depended.indexOf(parameter[1]), 1)
		    }
		    await fmi.writeString(doci+"/tsfm-ex/scripts.json", JSON.stringify(scripts, null, "\t"))
		  break;
		  case "version":
		  case "-v":
		    result.push({
		      "style":"",
		      "str":"6.0"
		    })
		  break;
		  case "help":
		  case "-h":
		  default:
		    var text = `
install [script name]        : You can install scripts.
delete [script name]         : You can delete scripts.
search [String]              : You can search scripts.
list                         : You can check installed scripts list.
update                       : You can update installed scripts.
addURL [URL]                 : You can add URL of JSON which includes script names and urls.
removeURL [URL]              : You can delete a URL.
package [name] [path] [type] : You can make command from your local file.
name [command] [shorcut]     : You can make shortcut.
version                      : show version.
help                         : show help.
installOnly                  : install without dependences.
deleteOnly                   : install without dependences.
commandlist                  : You can check installed command scripts list.
Scriptablelist               : You can check installed Scriptable scripts list.
Modulelist                   : You can check installed Module scripts list.
additionlist                 : You can check installed additional scripts list.
AddDepend [name 1] [name 2]  : add dependence from script 1 to script 2.
DelDepend [name 1] [name 2]  : delete dependence from script 1 to script 2.
You can use -i, -d, -s, -l, -u, -a, -r, -p, -n, -v, -h, -io, -do, -cl, -Sl, -Ml, -al, -AD, -DD instead of them.`.split("\n");
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
	if(firstRun){
	  await Command("script", ["package", "scripts-json", "tsfm-ex/scripts.json", "additional"]);
	  await Command("script", ["AddDepend", "script", "scripts-json"]);
	}
	return result;
})()