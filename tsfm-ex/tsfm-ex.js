// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: cyan; icon-glyph: angle-double-right;
w = new WebView()
f = FileManager.iCloud();
doc = f.documentsDirectory()
pass = doc;
elements = {
	"name":Device.name(),
	"pass":pass,
	"doc":doc,
	"output":[{
		"style":"",
		"str":"welcome to tsfm-ex!"
	}]
}

if(!f.fileExists(pass+"/tsfm-ex")){
	var alert = new Alert()
	alert.message = "start install"
	alert.addAction("OK")
	console.log(await alert.present())
	await f.createDirectory(pass + "/tsfm-ex", false)
	var link = "https://raw.githubusercontent.com/cy-1818/Scriptable_Scripts/main/tsfm-ex/tsfm-ex/"
	var setup = ["commands.json", "tsfm-ex.html", "cd.js", "ls.js", "exit.js", "script.js", "urls.json"]
	for(var n=0;n<setup.length;n++){
		var rstr = await new Request(link+setup[n]).loadString();
		await f.writeString(pass + "/tsfm-ex/" + setup[n], rstr)
		console.log(setup[n] + " is installed")
	}
	alert = new Alert()
	alert.addAction("OK")
	alert.message = "finish install"
	console.log(await alert.present())
}
commands = JSON.parse(f.readString(doc+"/tsfm-ex/commands.json"));
Run = (async function(str){
	return await w.evaluateJavaScript(str, false);
})
Print=(async function(obj){
	await Give(obj);
	return await w.evaluateJavaScript("print(elements)", false);
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
	return await w.evaluateJavaScript(`give('${JSON.stringify(json).split("\\").join("\\\\").split("'").join("\\\'")}');`, false);
})
Load = (async function(){
	return await w.evaluateJavaScript("load()", false);
})

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
		input = elements.input.split(" ");
		if(commands.hasOwnProperty(input[0])){
			try{
			  output = await (new Function("parameter",f.readString(doc+commands[input[0]])))(input.slice(1));
			  elements.pass = pass;
			  if(output=="break"){
					if(elements.run){
				    await (new Function("parameter",elements.run))(elements.runparameter);
						delete elements.run;
				  }
				  break;
		  	}else{
				  elements.output = output;
			  }
		  }catch(e){
				elements.output = [{
				  "style":"color:#ff3333",
				  "str":`[${e.name}] ${e.message}`
		  	}]
			}
		}else{
			elements.output = [{
				"style":"color:#ff3333",
				"str":"[ERROR] "
			},{
				"style":"",
				"str":input[0]+" was undefined as a command"
			}]
		}
		await Give(elements);
		await Load();
	}
	return 0;
}

w.loadFile(doc+"/tsfm-ex/tsfm-ex.html");
w.present(true);
await w.waitForLoad();
await Give(elements);
await Load();
await MainLoop();