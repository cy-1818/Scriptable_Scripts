// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-blue; icon-glyph: copy;
ui = new UITable()
f = FileManager.iCloud()
showedPass = ""
rows = {
	name:"",
	next:{},
	pass:[],
	pare:"rows",
	flag:false
}
img = ["jpeg","jpg","png","mp4","mov"]
web = ["html","htm","m4a","mp3","History"]
function addHead(){
	var head = new UITableRow()
	var headBack = head.addButton("back")
	var headFirst = head.addButton("none")
	var headSecond = head.addButton("cache")
	var headThird = head.addButton("documents")
	var headFourth = head.addButton("library")
	var headFifth = head.addButton("temporary")
	headBack.onTap = () =>{
		ui.removeAllRows()
		rows = {
			name:"",
			next:{},
			pass:rows.pass.slice(0,-1),
			pare:"rows",
			flag:false
		}
		makeUI(rows)
		drawRows(rows)
	}
	headFirst.onTap = () =>{
		ui.removeAllRows()
		rows = {
			name:"",
			next:{},
			pass:[],
			pare:"rows",
			flag:false
		}
		makeUI(rows)
		drawRows(rows)
	}
	headSecond.onTap = () =>{
		ui.removeAllRows()
		rows = {
			name:"",
			next:{},
			pass:f.cacheDirectory().split('/'),
			pare:"rows",
			flag:false
		}
		makeUI(rows)
		drawRows(rows)
	}
	headThird.onTap = () =>{
		ui.removeAllRows()
		rows = {
			name:"",
			next:{},
			pass:f.documentsDirectory().split('/'),
			pare:"rows",
			flag:false
		}
		makeUI(rows)
		drawRows(rows)
	}
	headFourth.onTap = () =>{
		ui.removeAllRows()
		rows = {
			name:"",
			next:{},
			pass:f.libraryDirectory().split('/'),
			pare:"rows",
			flag:false
		}
		makeUI(rows)
		drawRows(rows)
	}
	headFifth.onTap = () =>{
		ui.removeAllRows()
		rows = {
			name:"",
			next:{},
			pass:f.temporaryDirectory().split('/'),
			pare:"rows",
			flag:false
		}
		makeUI(rows)
		drawRows(rows)
	}
	ui.addRow(head)
	var passRow = new UITableRow()
	showedPass = rows.pass.join('/')
	passRow.addText(`pass : ${showedPass}`)
	ui.addRow(passRow)
}
function drawRows(row){
	for(var n in row.next){
		ui.addRow(row.next[n].row)
		var wallRow = new UITableRow()
		wallRow.height = 3
		wallRow.backgroundColor = new Color("#111")
		ui.addRow(wallRow)
		if(row.next[n].flag){
			drawRows(row.next[n])
		}
	}
	ui.reload();
}
function makeUI(obj){
	var flag = true
	console.log(obj.pass)
	var type = f.fileExtension(obj.pass.join('/'))
	console.log(type)
	if(f.isDirectory(obj.pass.join('/'))){
		obj.flag = !obj.flag
		var list = f.listContents(obj.pass.join('/'))
		for(var i in list){
			flag = !flag
			console.log(list[i])
			obj.next[i] = {}
			obj.next[i]["name"] = list[i]
			obj.next[i]["next"] = {}
			obj.next[i]["pass"] = obj.pass.concat()
			obj.next[i]["pass"].push(list[i])
			obj.next[i]["row"] = new UITableRow()
			obj.next[i]["row"].height=27
			if(f.isDirectory(obj.next[i].pass.join('/'))){
				obj.next[i]["row"].cellSpacing = 10
				obj.next[i]["d"] = obj.next[i]["row"].addText("(D)")
				obj.next[i]["d"].widthWeight = 1
			}else{
				obj.next[i]["row"].cellSpacing = 10
				obj.next[i]["d"] = obj.next[i]["row"].addText("   ")
				obj.next[i]["d"].widthWeight = 1
			}
			var txt = '   | '.repeat(obj.pass.length)+list[i]
			obj.next[i]["cell"] = obj.next[i]["row"].addButton(txt)
			obj.next[i]["cell"].widthWeight = 16
			obj.next[i]["pare"] = `${obj.pare}.next[${i}]`
			obj.next[i]["cell"].onTap = new Function(`
				${makeUI}
				${addHead}
				${drawRows}
				showedPass = ${obj.next[i].pare}.pass.join('/')
				makeUI(${obj.next[i].pare});
				drawRows(rows);`)
// 			if(flag){
// 				obj.next[i]["row"].backgroundColor = new Color("#171717")
// 			}
			obj.next[i]["size"] = obj.next[i]["row"].addText("("+f.fileSize(obj.next[i].pass.join('/'))+")")
			obj.next[i]["size"].widthWeight = 8
		}
	}else if(img.includes(type)){
		QuickLook.present(f.readImage(obj.pass.join('/')), true)
	}else if(web.includes(type)){
		WebView.loadFile(obj.pass.join('/'), null, true)
	}else{
		if(f.readString(obj.pass.join('/'))===null){
			var alert = new Alert()
			alert.message = `size:null,type:${type}`
			alert.present()
			WebView.loadFile(obj.pass.join('/'), null, true)
		}else{
			QuickLook.present(f.readString(obj.pass.join('/')), true)
		}
	}
	ui.removeAllRows()
	addHead()
}
makeUI(rows)
drawRows(rows)
await ui.present(true)
// QuickLook.present(JSON.stringify(rows,null,"	"),false)