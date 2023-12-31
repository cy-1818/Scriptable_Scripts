// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: cyan; icon-glyph: angle-double-right;
fmi = FileManager.iCloud();
doci = fmi.documentsDirectory();
w = new WebView()
f = FileManager.iCloud();
doc = f.documentsDirectory()
pass = doc;
outDisplay = true;
printOutput = [];
space = "iCloud";

if(!(fmi.fileExists(doci+"/tsfm-ex/commands.json") && fmi.fileExists(doci+"/tsfm-ex/urls.json") && fmi.fileExists(doci+"/tsfm-ex/tsfm-ex.html") && fmi.fileExists(doci+"/tsfm-ex/saves.json") && fmi.fileExists(doci+"/tsfm-ex/script.js"))){
	var alert = new Alert()
	alert.message = "start install"
	alert.addAction("OK")
	console.log(await alert.present())
	if(!fmi.fileExists(doci+"/tsfm-ex")){
	  await fmi.createDirectory(doci + "/tsfm-ex", false)
	}
	var link = "https://raw.githubusercontent.com/cy-1818/Scriptable_Scripts/main/tsfm-ex/tsfm-ex/"
	var setup = ["commands.json", "tsfm-ex.html", "cd.js", "ls.js", "pwd.js", "del.js", "get.js", "exit.js", "script.js", "clear.js", "editor.js", "urls.json", "saves.json"]
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
saves = JSON.parse(fmi.readString(doci+"/tsfm-ex/saves.json"));
elements = {
	"name":Device.name(),
	"pass":pass,
	"doc":doc,
	"space":space,
	"output":[{
		"style":"",
		"str":saves.welcome ? saves.welcome : "welcome to tsfm-ex! this is tsfm-ex version 8.1."
	}]
}
if(!saves.hasOwnProperty("guessedTexts")){
	saves.guessedTexts = {
		"|type|": "command",
		"|command|": "script",
		"|parameter|": [
			"commandlist"
		],
		"|next|":{}
	}
}
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
		printOutput = printOutput.concat(obj);
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
	return await w.evaluateJavaScript(`give('${JSON.stringify(json).split("\\").join("\\\\").split("'").join("\\\'").split("\"").join("\\\"").split("\`").join("\\\`")}');`, false);
})
Load = (async function(){
	return await w.evaluateJavaScript("load()", false);
})
LoadSaves = (async function(json){
	return await w.evaluateJavaScript(`loadSaves('${JSON.stringify(json).split("\\").join("\\\\").split("'").join("\\\'").split("\"").join("\\\"").split("\`").join("\\\`")}');`, false);
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
		var check = await Check()
		if(check == "command"){
			var commandObj = JSON.parse(await Run("JSON.stringify(commandObj)"))
			var commandOutput = await Command(commandObj.command, commandObj.parameter)
			await w.evaluateJavaScript(`commandGet('${JSON.stringify(commandOutput).split("\\").join("\\\\").split("'").join("\\\'").split("\"").join("\\\"").split("\`").join("\\\`")}');`, false)
		}else if(check){
			break;
		}
	}
	console.log("end")
	return 0;
}

async function MainLoop(){
	while(true){
		await Wait();
		elements = await Get();
		saves = await Run("saves")
		input = elements.input.split("|");
		output = []
		for(var pipeIndex=0;pipeIndex<input.length;pipeIndex++){
			if(input[pipeIndex] === ""){
				break;
			}
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
		await LoadSaves(saves)
		await Give(elements);
		await Load();
	}
	return 0;
}
var qpara = args.queryParameters
if(qpara.command){
	outDisplay = false
	printOutput = []
	var ans = await Command(qpara.command, qpara.parameter.split("|"))
	saves.LatestRequestEnd = Date.now()
	saves.LatestRequestResult = printOutput.concat(ans)
	await fmi.writeString(doci+"/tsfm-ex/saves.json", JSON.stringify(saves, null, "\t"))
	if(qpara.url){
	  Safari.open(qpara.url)
  }
}else if(qpara.command1){
	var qn = 1;
	var qresult = []
	outDisplay = false
	while(true){
		printOutput = []
		var ans = await Command(qpara["command"+qn], qpara["parameter"+qn].split("|"))
		qresult.push(printOutput.concat(ans))
		qn++;
		if(qpara["command"+qn]===undefined){
			break;
		}
	}
	saves.LatestRequestEnd = Date.now()
	saves.LatestRequestResult = printOutput.concat(ans)
	await fmi.writeString(doci+"/tsfm-ex/saves.json", JSON.stringify(saves, null, "\t"))
	if(qpara.url){
	  Safari.open(qpara.url)
  }
}else{
	w.loadFile(doci+"/tsfm-ex/tsfm-ex.html");
	w.present(true);
	await w.waitForLoad();
	await LoadSaves(saves);
	await Give(elements);
	await Load();
	await MainLoop();
}