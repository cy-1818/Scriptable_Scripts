// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// always-run-in-app: true; icon-color: cyan;
// icon-glyph: angle-double-right;
fmi = FileManager.iCloud();
doci = fmi.documentsDirectory();
w = new WebView()
f = FileManager.iCloud();
doc = f.documentsDirectory()
pass = doc;
outDisplay = true;
printOutput = [];
space = "iCloud";
elements = {
	"name":Device.name(),
	"pass":pass,
	"doc":doc,
	"space":space,
	"output":[{
		"style":"",
		"str":"welcome to tsfm-ex! this is tsfm-ex version 5.2."
	}]
}

if(!(fmi.fileExists(doci+"/tsfm-ex/commands.json") && fmi.fileExists(doci+"/tsfm-ex/urls.json") && fmi.fileExists(doci+"/tsfm-ex/tsfm-ex.html"))){
	var alert = new Alert()
	alert.message = "start install"
	alert.addAction("OK")
	console.log(await alert.present())
	if(!fmi.fileExists(doci+"/tsfm-ex")){
	  await fmi.createDirectory(doci + "/tsfm-ex", false)
	}
	var link = "https://raw.githubusercontent.com/cy-1818/Scriptable_Scripts/main/tsfm-ex/tsfm-ex/"
	var setup = ["commands.json", "tsfm-ex.html", "cd.js", "ls.js", "pwd.js", "del.js", "get.js", "exit.js", "script.js", "clear.js", "urls.json"]
	for(var n=0;n<setup.length;n++){
		var rstr = await new Request(link+setup[n]).loadString();
		await fmi.writeString(pass + "/tsfm-ex/" + setup[n], rstr)
		console.log(setup[n] + " is installed")
	}
	alert = new Alert()
	alert.addAction("OK")
	alert.message = "finish install"
	console.log(await alert.present())
}
commands = JSON.parse(fmi.readString(doci+"/tsfm-ex/commands.json"));
Run = (async function(str){
	return await w.evaluateJavaScript(str, false);
})
Command = (async function(command, parameter){
	return await (new Function("parameter",fmi.readString(doci+commands[command])))(parameter);
})
Print=(async function(obj){
	if(outDisplay){
	  await Give(obj);
	  return await w.evaluateJavaScript("print(elements)", false);
  }else{
		printOutput.concat(obj);
		return 0;
	}
})
Edit=(async function(num, obj){
	await Give(obj);
	return await w.evaluateJavaScript(`edit(${num}, elements)`, false);
})
DelNode=(async function(num){
	return await w.evaluateJavaScript(`delnode(${num})`, false);
})
Check = (async function(){
	return await w.evaluateJavaScript("checker", false);
})
Get = (async function(){
	return JSON.parse(await w.evaluateJavaScript("get()", false));
})
Give = (async function(json){
	console.log(`give('${JSON.stringify(json)}');`)
	return await w.evaluateJavaScript(`give('${JSON.stringify(json).split("\\").join("\\\\").split("'").join("\\\'").split("\"").join("\\\"").split("\`").join("\\\`")}');`, false);
})
Load = (async function(){
	return await w.evaluateJavaScript("load()", false);
})
KeyPressed = (async function(){
	return await w.evaluateJavaScript("keyPressed", false);
})
GetKey = (async function(){
	return await w.evaluateJavaScript("tellKey()", false);
})
EndGetKey = (async function(){
	return await w.evaluateJavaScript("endGetKey()", false);
})
GetText = (async function(str){
	if(str == "keyForm"){
	  return await w.evaluateJavaScript("form.innerText", false);
  }else{
		return await w.evaluateJavaScript(`nodes[${str}].innerText`, false);
	}
})
formatPara = function(inputList, oldOutput){
	var paraOutput = []
	for(var paraN=0;paraN<oldOutput.length;paraN++){
		if(!oldOutput[paraN].notPara){
			paraOutput.push(oldOutput[paraN].str)
		}
	}
	return inputList.concat(paraOutput).filter(Boolean);
}
formatPath = function(str, nowPath){
	if(!str){
		return nowPath.split("/").slice(0,-1).join("/");
	}else if(str.startsWith("/")){
		return str;
	}else if(str.startsWith("iCloud:")){
		f = FileManager.iCloud()
		space = "iCloud"
		return str.replace("iCloud:", "");
	}else if(str.startsWith("local:")){
		f = FileManager.local()
		space = "local"
		return str.replace("local:","");
	}else {
		return nowPath+"/"+str;
	}
}

var input;
var func;
async function Wait(){
	while(true){
		if(await Check()){
			break;
		}
	}
	console.log("end")
	return 0;
}

async function MainLoop(){
	while(true){
		console.log(1)
		await Wait();
		elements = await Get();
		input = elements.input.split("|");
		output = []
		for(var pipeIndex=0;pipeIndex<input.length;pipeIndex++){
			input[pipeIndex]=input[pipeIndex].split(" ").filter(Boolean)
			outDisplay = pipeIndex == input.length-1
			printOutput = []
		  if(commands.hasOwnProperty(input[pipeIndex][0])){
			  try{
			    output = await Command(input[pipeIndex][0], formatPara(input[pipeIndex].slice(1), output));
					output = printOutput.concat(output)
		    }catch(e){
				  output = [{
				    "style":"color:#ff3333",
				    "str":`[${e.name}] ${e.message}`
		  	  }]
					break;
			  }
		  }else{
			  output = [{
				  "style":"color:#ff3333",
				  "str":"[ERROR] "
			  },{
				  "style":"",
				  "str":input[pipeIndex][0]+" was undefined as a command"
			  }]
		  }
		}
		elements.pass = pass;
		elements.doc = doc;
		elements.space = space;
		if(output=="break"){
		  if(elements.run){
			  await (new Function("parameter",elements.run))(elements.runparameter);
				delete elements.run;
			}
			break;
		}else{
			elements.output = output;
		}
		await Give(elements);
		await Load();
	}
	return 0;
}

w.loadFile(doci+"/tsfm-ex/tsfm-ex.html");
w.present(true);
await w.waitForLoad();
await Give(elements);
await Load();
await MainLoop();