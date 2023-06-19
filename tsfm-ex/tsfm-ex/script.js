return (async function(){
	var urls = JSON.parse(f.readString(doc+"/tsfm-ex/urls.json"));
	var urlList = {};
	var result = [];
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
		  case "install":
		  case "-i":
		    if(parameter[1]){
		      for(var n=1;n<parameter.length;n++){
		        if(urlList[parameter[n]]){
		          var rq = new Request(urlList[parameter[n]].url);
		          var rqstr = await rq.loadString();
		          switch(urlList[parameter[n]].type){
		            case "command":
		              await f.writeString(doc + "/tsfm-ex/" + urlList[parameter[n]].name, rqstr)
		              commands[parameter[n]]="/tsfm-ex/" + urlList[parameter[n]].name;
		              await f.writeString(doc+"/tsfm-ex/commands.json", JSON.stringify(commands, null, "\t"))
		            break;
		            case "Scriptable":
		              await f.writeString(doc + "/" + urlList[parameter[n]].name, rqstr)
		            break;
		            case "addition":
		              await f.writeString(doc + "/tsfm-ex/" + urlList[parameter[n]].name, rqstr);
		            break;
		          }
		          if(urlList[parameter[n]].dependence){
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
		    for(var n=1;n<parameter.length;n++){
		      if(commands[parameter[n]]){
		        await f.remove(doc + commands[parameter[n]]);
		        delete commands[parameter[n]];
		        await f.writeString(doc+"/tsfm-ex/commands.json", JSON.stringify(commands, null, "\t"))
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
		  case "version":
		  case "-v":
		    result.push({
		      "style":"",
		      "str":"2.6"
		    })
		  break;
		  case "help":
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
You can use -i, -d, -s, -a, -v, -h instead if install, delete, search, addURL, version, help.`.split("\n").join("")
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
