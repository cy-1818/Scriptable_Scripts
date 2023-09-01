// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// always-run-in-app: true; icon-color: deep-purple;
// icon-glyph: grip-horizontal;
var f = FileManager.iCloud()
var doc = f.documentsDirectory()
var para = args.widgetParameter
var multiWidget = new ListWidget()
var nowStack = multiWidget
var AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
var stacks=[]
var sliceStrings = [".presentAccessory", ".presentExtraLarge", ".presentMedium", ".presentLarge()", ".presentSmall()", "Script."]
if(para===null){
	if(config.widgetFamily){
		var wf = config.widgetFamily;
	}else{
		var wf = "extraLarge"
	}
	var WidgetSize = importModule("WidgetSize")
	var manualSize = WidgetSize(wf, multiWidget)
	para = `[{"name":"MultiWidgetManual.js", "x":${manualSize.width}, "y":${manualSize.height}}]`
}else{
	if(para.startsWith("r ")){
		var FormatPath = importModule("FormatPath")
		var formatedPath = FormatPath(para.split(" ")[1], doc, "iCloud")
		if(formatedPath.type=="iCloud"){
			para = f.readString(formatedPath.path)
		}else if(formatedPath.type=="local"){
			var fl = FileManager.local()
			para = fl.readString(formatedPath.path)
		}
	}
}
function sliceProgram(str){
	var list = str.split("\n")
	for(var k=0;k<list.length;k++){
	  for(var i=0;i<sliceStrings.length;i++){
			if(list[k].includes(sliceStrings[i])){
				list[k]="";
				break;
			}
		}
	}
	return list.join("\n")
}
async function monoStack(stack,x,y,family,parameter,program, space){
  program = sliceProgram(program)
  var setArg = `
var args={"widgetParameter":${JSON.stringify(parameter)}};
var config={"runsInWidget":true,"widgetFamily":"${family}"};
`;
  monoWidget = stack.addStack()
  monoWidget.layoutVertically()
  monoWidget.centerAlignContent()
  monoWidget.useDefaultPadding()
	monoWidget.size = new Size(x, y)
	if(space){
		monoWidget.spacing = space;
	}
  program=setArg+program.replace("new ListWidget()", "monoWidget")
  var func = new AsyncFunction(program);
  await func()
	console.log(monoWidget)
}
try{
	var npara = JSON.parse(para);
	async function StackList(obj, wid){
		console.log(obj)
		for(var k in obj){
			var val = obj[k]
			if(val.hasOwnProperty("v")){
				var nwid = wid.addStack()
				nwid.layoutVertically()
				if(val.hasOwnProperty("s")){
					nwid.spacing = val.s
				}
				if(val.hasOwnProperty("bg")){
					nwid.backgroundColor = new Color(val.bg)
				}
				await StackList(val.v, nwid)
			}else if(val.hasOwnProperty("h")){
				var nwid = wid.addStack()
				nwid.layoutHorizontally()
				if(val.hasOwnProperty("s")){
					nwid.spacing = val.s
				}
				if(val.hasOwnProperty("bg")){
					nwid.backgroundColor = new Color(val.bg)
				}
				await StackList(val.h, nwid)
			}else if(val.hasOwnProperty("name")){
				var wname = val.name;
				var wscript = f.readString(doc+"/"+wname)
				var wx = val.x
				var wy = val.y
				if(val.hasOwnProperty("p")){
					var wpara = val.p
				}else{
					var wpara = null
				}
				if(val.hasOwnProperty("f")){
					var wfami = val.f
				}else{
					var wfami = null
				}
				if(val.hasOwnProperty("s")){
					var wspace = val.s
				}else{
					var wspace = null
				}
				await monoStack(wid, wx, wy, wfami, wpara, wscript, wspace)
			}
		}
	}
	await StackList(npara, multiWidget)
}catch(e){
	console.log("old")
	console.log(e)
	para = para.split(")").join(" )")
	while(true){
		console.log("next")
	  console.log(para)
		console.log(stacks)
		if(para==""){
			break;
		}else if(para.startsWith("v(")){
			stacks.push(nowStack.addStack())
			nowStack = stacks[stacks.length-1]
			nowStack.layoutVertically()
			para=para.slice(2)
		}else if(para.startsWith("h(")){
			stacks.push(nowStack.addStack())
			nowStack = stacks[stacks.length-1]
			nowStack.layoutHorizontally()
			para=para.slice(2)
		}else if(para.startsWith(" ")){
			para = para.slice(1)
		}else if(para.startsWith(",")){
			para = para.slice(1)
		}else if(para.startsWith(")")){
			nowStack = stacks[stacks.length-2]
			stacks.pop()
			para = para.slice(1)
		}else{
			var script = f.readString(doc+"/"+para.slice(0,para.indexOf(".js")+3))
			var reg = /[^\\]\"/
			para = para.slice(para.indexOf(".js")+3)
			para=para.trim()
			console.log(para)
			var setstr = para.slice(0,para.indexOf(" "))
			para=para.slice(para.indexOf(" ")+1)
			console.log(para)
			var mx,my,mp,mf;
			if(isNaN(Number(setstr))){
				mx=Number(para.slice(0,para.indexOf(" ")))
				para=para.slice(para.indexOf(" ")+1)
			}else{
				mx=Number(setstr)
			}
			var sind = para.indexOf(" ")
			var cind = para.indexOf(",")
			if(cind==-1||sind<cind){
			  my=Number(para.slice(0,sind))
			  para=para.slice(sind+1)
			}else{
				my=Number(para.slice(0,cind))
			  para=para.slice(cind+1)
			}
			if(setstr.includes("p")){
				para=para.slice(1)
				mp=para.slice(0,para.search(reg)+1)
			  para=para.slice(para.search(reg)+3)
			}else{
				mp=null;
			}
			if(setstr.includes("f")){
				var sind = para.indexOf(" ")
			  var cind = para.indexOf(",")
			  if(sind<cind){
			    mf=para.slice(0,sind)
			    para=para.slice(sind+1)
			  }else{
				  mf=para.slice(0,cind)
			    para=para.slice(cind+1)
			  }
			}else{
				mf=null;
			}
			await monoStack(nowStack, mx, my, mf, mp, script)
		}
	}
}
multiWidget.presentExtraLarge()
Script.setWidget(multiWidget)