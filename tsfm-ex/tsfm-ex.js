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
	var setup = ["commands.json", "tsfm-ex.html", "cd.js", "ls.js", "exit.js", "script.js", "urls.js"]
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
var input;
var func;
async function Check(){
	return await w.evaluateJavaScript("checker", false);
}
async function Get(){
	return JSON.parse(await w.evaluateJavaScript("get()", false));
}
async function Give(json){
	console.log(`give('${JSON.stringify(json)}');`)
	return await w.evaluateJavaScript(`give('${JSON.stringify(json).split("'").join("\\\'")}');`, false);
}
async function Load(){
	return await w.evaluateJavaScript("load()", false);
}
async function Wait(){
	while(true){
		if(await Check()){
			break;
		}
	}
	console.log("end")
	return 0;
}
w.loadFile(doc+"/tsfm-ex/tsfm-ex.html");
w.present(true);
await w.waitForLoad();
await Give(elements);
await Load();
await MainLoop();

async function MainLoop(){
	while(true){
		console.log(1)
		await Wait();
		elements = await Get();
		input = elements.input.split(" ");
		if(commands.hasOwnProperty(input[0])){
			output = await (new Function("parameter",f.readString(doc+commands[input[0]])))(input.slice(1));
			elements.pass = pass;
			if(output=="break"){
				break;
			}else{
				elements.output = output;
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