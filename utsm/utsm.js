// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: purple; icon-glyph: caret-square-down;
var fmi = FileManager.iCloud()
var doci = fmi.documentsDirectory()
if(!(fmi.fileExists(doci+"/tsfm-ex.js") && fmi.fileExists(doci+"/tsfm-ex/commands.json") && fmi.fileExists(doci+"/tsfm-ex/urls.json") && fmi.fileExists(doci+"/tsfm-ex/saves.json") && fmi.fileExists(doci+"/tsfm-ex/script.js") && fmi.fileExists(doci+"/tsfm-ex/scripts.json"))){
	fmi.writeString(doci+"/tsfm-ex.js", await new Request("https://raw.githubusercontent.com/cy-1818/Scriptable_Scripts/main/tsfm-ex/tsfm-ex.js").loadString())
	Safari.open(encodeURI("scriptable:///run/tsfm-ex?command=script&parameter=install|utsm&url=scriptable:///run/utsm"))
}else if(!fmi.fileExists(doci+"/utsm/utsm.json")){
	if(!fmi.fileExists(doci+"/utsm")){
	  await fmi.createDirectory(doci + "/utsm", false)
	}
	var utsm = {
		"lang":Device.language(),
		"sort":"dic",
		"cache":false,
		"show":"OnNetWork",
		"bar":"NONE",
		"settingBar":[],
		"edittingColor":[],
		"unchoosedType":[],
		"unchoosedCreater":[],
		"types":[],
		"creaters":[],
		"height":{
			"setLang":50,
			"settingBar":50,
			"editTranslatedText":30,
			"translatedText":20,
			"editColor":40,
			"editTextText":25,
			"editTextFont":25,
			"editTextSize":25,
			"colorEditor":30
		},
		"color":{
			"pushedButton":"#999999",
			"topBackGround":"#ffffff",
			"scriptTitleBackGround":"#ffff99",
			"scriptButtonsBackGround":"#ffffcc",
			"scriptTitle":"#000000",
			"scriptDescribe":"#003300",
			"createrName":"#555555",
			"local":"#ff0000",
			"NONE":"#ff0000",
			"barBackGround":"#ffffcc",
			"searchBackGround":"#ffffdd",
			"searchText":"#ff0000",
			"searchSTR":"#333333",
			"settingBackGround":"#ffffdd",
			"settingBarBackGround":"#ffff99",
			"settingSubBackGround":"#ffffcc",
			"Create":"#ee0000",
			"setLang":"#000044",
			"editTranslatedTop":"#000044",
			"editTranslatedText":"#000000",
			"translatedText":"#333333",
			"editColorTop":"#000044",
			"editTextTop":"#000044",
			"editTextText":"#333333",
			"editTextFont":"#333333",
			"editTextSize":"#333333",
			"colorEditorred":"#ff0000",
			"colorEditorgreen":"#00ff00",
			"colorEditorblue":"#0000ff"
		},
		"defaultFont":"Symbol",
		"defaultFontSize":15,
		"defaultColor":"#777777",
		"defaultHeight":44,
		"text":{
			"leftButton":{
				"text":"On network",
				"font":"Symbol",
				"size":15
			},
			"rightButton":{
				"text":"On local",
				"font":"Symbol",
				"size":15
			},
			"sortingButton":{
				"text":"⇅",
				"font":"Symbol",
				"size":15
			},
			"choosingButton":{
				"text":"⊃",
				"font":"Symbol",
				"size":15
			},
			"searchingButton":{
				"text":"⚲",
				"font":"Symbol",
				"size":15
			},
			"settingButton":{
				"text":"⌘",
				"font":"Symbol",
				"size":15
			},
			"checkBoxOn":{
				"text":"☑︎",
				"font":"Symbol",
				"size":15
			},
			"checkBoxOff":{
				"text":"☐",
				"font":"Symbol",
				"size":15
			},
			"searchStop":{
				"text":"✕",
				"font":"Symbol",
				"size":15
			},
			"opened":{
				"text":"▼"
			},
			"closed":{
				"text":"▶︎"
			},
			"showColor":{
				"text":"███████████████"
			},
			"leftDoubleArrow":{
				"text":"<<"
			},
			"rightDoubleArrow":{
				"text":">>"
			},
			"leftArrow":{
				"text":"<"
			},
			"rightArrow":{
				"text":">"
			},
			"searchText":{
				"text":"Search text",
				"font":"Symbol",
				"size":15
			},
			"scriptTitle":{
				"size":30
			},
			"createrName":{
				"font":"Arial-ItalicMT",
				"size":15
			},
			"NONE":{
				"font":"Arial-ItalicMT"
			},
			"createdBy":{
				"text":"Created by "
			},
			"InstallButton":{
				"text":"Install"
			},
			"UpdateButton":{
				"text":"Update"
			},
			"WebsiteButton":{
				"text":"Website"
			},
			"DeleteButton":{
				"text":"Delete"
			},
			"RunButton":{
				"text":"Run"
			},
			"local":{
				"text":"local file",
				"font":"Symbol",
				"size":15
			},
			"type":{
				"text":"Script type : ",
				"font":"Symbol",
				"size":15
			},
			"Scriptable":{
				"text":"Scriptable script"
			},
			"Module":{
				"text":"Scriptable Module"
			},
			"command":{
				"text":"tsfm-ex's command"
			},
			"addition":{
				"text":"additional file"
			},
			"dic":{
				"text":"A...z"
			},
			"reDic":{
				"text":"z...A"
			},
			"Create":{
				"text":"Create [lang]-texts.json",
				"font":"Symbol",
				"size":30
			},
			"setLang":{
				"text":"set Langage",
				"font":"Symbol",
				"size":25
			},
			"editTranslatedTop":{
				"text":"edit translated text",
				"font":"Symbol",
				"size":30
			},
			"editTranslatedText":{
				"font":"Symbol",
				"size":25
			},
			"translatedText":{
				"font":"Symbol",
				"size":15
			},
			"editColorTop":{
				"text":"edit color",
				"font":"Symbol",
				"size":30
			},
			"editColor":{
				"font":"Symbol",
				"size":30
			},
			"editTextTop":{
				"text":"edit default text",
				"font":"Symbol",
				"size":30
			},
			"editTextText":{
				"text":"Text : ",
				"font":"Symbol",
				"size":20
			},
			"editTextFont":{
				"text":"Font : ",
				"font":"Symbol",
				"size":20
			},
			"editTextSize":{
				"text":"Size : ",
				"font":"Symbol",
				"size":20
			},
			"newLang":{
				"text":"langage"
			},
			"newColor":{
				"text":"new color"
			},
			"newText":{
				"text":"new text"
			},
			"newFont":{
				"text":"new font"
			},
			"newSize":{
				"text":"new Size"
			}
		}
	}
	fmi.writeString(doci+"/utsm/utsm.json", JSON.stringify(utsm, null, "\t"))
	Safari.open(encodeURI("scriptable:///run/tsfm-ex?command1=script&parameter1=package|utsm-json|utsm/utsm.json|addition&command2=script&parameter2=AddDepend|utsm|utsm-json&url=scriptable:///run/utsm"))
}else{
	u = new UITable()
	utsm = JSON.parse(fmi.readString(doci + "/utsm/utsm.json"));
	utsm.searchSTR = []
	utsm.bar = "NONE"
	utsm.settingBar = []
	utsm.edittingColor = []
	scripts = {}
	if(utsm.cache){
		scripts = utsm.scripts
		utsm.cache = false
	}else{
	  var urls = JSON.parse(fmi.readString(doci + "/tsfm-ex/urls.json"));
	  for(var n=0;n<urls.length;n++){
		  scripts = Object.assign(scripts, JSON.parse(await new Request(urls[n]).loadString()))
	  }
		utsm.scripts = scripts
	}
	localScripts = JSON.parse(fmi.readString(doci + "/tsfm-ex/scripts.json"))
	translatedTexts = null
	if(localScripts.hasOwnProperty("utsm-text-"+utsm.lang)){
		translatedTexts = JSON.parse(fmi.readString(localScripts["utsm-text-"+utsm.lang].path))
	}else if(scripts.hasOwnProperty("utsm-text-"+utsm.lang)){
		utsm.cache = true
		fmi.writeString(doci + "/utsm/utsm.json", JSON.stringify(utsm, null, "\t"))
		Safari.open(encodeURI(`scriptable:///run/tsfm-ex?command=script&parameter=install|${"utsm-text-"+utsm.lang}&url=scriptable:///run/utsm`))
	}else if(fmi.fileExists(doci + "/utsm/" + utsm.lang + "-texts.json")){
		utsm.cache = true
		fmi.writeString(doci + "/utsm/utsm.json", JSON.stringify(utsm, null, "\t"))
		Safari.open(encodeURI(`scriptable:///run/tsfm-ex?command=script&parameter=package|${"utsm-text-"+utsm.lang}|${"utsm/"+utsm.lang+"-texts.json"}|addition&url=scriptable:///run/utsm`))
	}
	u.present(true)
	await load()
}

async function load(){
	if(utsm.show == "OnNetWork"){
		await showNetwork()
	}else if(utsm.show == "OnLocal"){
		await showLocal()
	}else{
		await showSetting()
	}
}

async function showNetwork(){
	utsm.show = "OnNetWork"
	u.removeAllRows()
	fmi.writeString(doci+"/utsm/utsm.json", JSON.stringify(utsm, null, "\t"))
	topLeftButton = UITableCell.text(txt("leftButton"))
	topRightButton = UITableCell.button(txt("rightButton"))
	topSortingButton = UITableCell.button(txt("sortingButton"))
	topChoosingButton = UITableCell.button(txt("choosingButton"))
	topSearchingButton = UITableCell.button(txt("searchingButton"))
	topSettingButton = UITableCell.button(txt("settingButton"))
	topLeftButton.titleFont = font("leftButton")
	topRightButton.titleFont = font("rightButton")
	topSortingButton.titleFont = font("sortingButton")
	topChoosingButton.titleFont = font("choosingButton")
	topSearchingButton.titleFont = font("searchingButton")
	topSettingButton.titleFont = font("settingButton")
	topLeftButton.centerAligned()
	topRightButton.centerAligned()
	topSortingButton.rightAligned()
	topChoosingButton.rightAligned()
	topSearchingButton.rightAligned()
	topSettingButton.rightAligned()
	topSortingButton.widthWeight = 50
	topChoosingButton.widthWeight = 50
	topSearchingButton.widthWeight = 50
	topSettingButton.widthWeight = 50
	topLeftButton.widthWeight = (Device.screenSize().width-200)/2
	topRightButton.widthWeight = (Device.screenSize().width-200)/2
	topRightButton.onTap = async function(){
	  await showLocal()
	}
	topSortingButton.onTap = async function(){
	  await showBar("sorting")
	}
	topChoosingButton.onTap = async function(){
	  await showBar("choosing")
	}
	topSearchingButton.onTap = async function(){
	  await search()
	}
	topSettingButton.onTap = async function(){
	  await showSetting()
	}
	topRow = new UITableRow()
	topRow.backgroundColor = clr("topBackGround")
	topRow.cellSpacing = 0
	topRow.addCell(topLeftButton)
	topRow.addCell(topRightButton)
	topRow.addCell(topSortingButton)
	topRow.addCell(topChoosingButton)
	topRow.addCell(topSearchingButton)
	topRow.addCell(topSettingButton)
	topRow.isHeader = true
	u.addRow(topRow)
	topLeftButton.titleColor = clr("pushedButton")
	var scriptNames = Object.keys(scripts)
	await showScripts(scriptNames)
	u.reload()
	return 0;
}

async function showLocal(){
	utsm.show = "OnLocal"
	u.removeAllRows()
	fmi.writeString(doci+"/utsm/utsm.json", JSON.stringify(utsm, null, "\t"))
	topLeftButton = UITableCell.button(txt("leftButton"))
	topRightButton = UITableCell.text(txt("rightButton"))
	topSortingButton = UITableCell.button(txt("sortingButton"))
	topChoosingButton = UITableCell.button(txt("choosingButton"))
	topSearchingButton = UITableCell.button(txt("searchingButton"))
	topSettingButton = UITableCell.button(txt("settingButton"))
	topLeftButton.titleFont = font("leftButton")
	topRightButton.titleFont = font("rightButton")
	topSortingButton.titleFont = font("sortingButton")
	topChoosingButton.titleFont = font("choosingButton")
	topSearchingButton.titleFont = font("searchingButton")
	topSettingButton.titleFont = font("settingButton")
	topLeftButton.centerAligned()
	topRightButton.centerAligned()
	topSortingButton.rightAligned()
	topChoosingButton.rightAligned()
	topSearchingButton.rightAligned()
	topSettingButton.rightAligned()
	topSortingButton.widthWeight = 50
	topChoosingButton.widthWeight = 50
	topSearchingButton.widthWeight = 50
	topSettingButton.widthWeight = 50
	topLeftButton.widthWeight = (Device.screenSize().width-200)/2
	topRightButton.widthWeight = (Device.screenSize().width-200)/2
	topLeftButton.onTap = async function(){
	  await showNetwork()
	}
	topSortingButton.onTap = async function(){
	  await showBar("sorting")
	}
	topChoosingButton.onTap = async function(){
	  await showBar("choosing")
	}
	topSearchingButton.onTap = async function(){
	  await search()
	}
	topSettingButton.onTap = async function(){
	  await showSetting()
	}
	topRow = new UITableRow()
	topRow.backgroundColor = clr("topBackGround")
	topRow.cellSpacing = 0
	topRow.addCell(topLeftButton)
	topRow.addCell(topRightButton)
	topRow.addCell(topSortingButton)
	topRow.addCell(topChoosingButton)
	topRow.addCell(topSearchingButton)
	topRow.addCell(topSettingButton)
	topRow.isHeader = true
	u.addRow(topRow)
	topRightButton.titleColor = clr("pushedButton")
	var scriptNames = Object.keys(localScripts)
	await showScripts(scriptNames)
	u.reload()
	return 0;
}

async function showScripts(names){
	if(utsm.bar == "sorting"){
		var sortTypeRow = new UITableRow()
		var sortTypes = ["dic", "reDic"]
		for(var n=0;n<sortTypes.length;n++){
			if(utsm.sort == sortTypes[n]){
				var sortTypeCell = UITableCell.text(txt(sortTypes[n]))
				sortTypeCell.titleColor = clr("pushedButton")
			}else{
				var sortTypeCell = UITableCell.button(txt(sortTypes[n]))
				sortTypeCell.onTap = SortButtonOnTap(sortTypes[n])
			}
			sortTypeRow.addCell(sortTypeCell)
		}
		sortTypeRow.backgroundColor = clr("barBackGround")
		u.addRow(sortTypeRow)
	}else if(utsm.bar == "choosing"){
		var chooseTypeRow = new UITableRow()
		for(var n=0;n<utsm.types.length;n++){
			if(utsm.unchoosedType.includes(utsm.types[n])){
				var chooseTypeButton = UITableCell.button(txt("checkBoxOff")+txt(utsm.types[n]))
			}else{
				var chooseTypeButton = UITableCell.button(txt("checkBoxOn")+txt(utsm.types[n]))
			}
			chooseTypeButton.onTap = ChooseTypeButtonOnTap(utsm.types[n])
			chooseTypeRow.addCell(chooseTypeButton)
		}
		chooseTypeRow.backgroundColor = clr("barBackGround")
		u.addRow(chooseTypeRow)
		var chooseCreaterRow = new UITableRow()
		for(var n=0;n<utsm.creaters.length;n++){
			if(utsm.unchoosedCreater.includes(utsm.creaters[n])){
				var chooseCreaterButton = UITableCell.button(txt("checkBoxOff")+txt(utsm.creaters[n]))
			}else{
				var chooseCreaterButton = UITableCell.button(txt("checkBoxOn")+txt(utsm.creaters[n]))
			}
			chooseCreaterButton.onTap = ChooseCreaterButtonOnTap(utsm.creaters[n])
			chooseCreaterRow.addCell(chooseCreaterButton)
		}
		chooseCreaterRow.backgroundColor = clr("barBackGround")
		u.addRow(chooseCreaterRow)
	}
	if(utsm.searchSTR.join()){
		var searchSTRRow = new UITableRow()
		var searchTextCell = UITableCell.text(txt("searchText")+" : ")
		var searchSTRCell = UITableCell.text(utsm.searchSTR.join(" "))
		var searchStopButton = UITableCell.button(txt("searchStop"))
		searchTextCell.leftAligned()
		searchSTRCell.leftAligned()
		searchStopButton.rightAligned()
		searchTextCell.titleColor = clr("searchText")
		searchSTRCell.titleColor = clr("searchSTR")
		searchTextCell.titleFont = font("searchText")
		searchSTRCell.titleFont = font("searchText")
		searchStopButton.onTap = async function(){
			utsm.searchSTR = []
			await load()
		}
		searchSTRRow.addCell(searchTextCell)
		searchSTRRow.addCell(searchSTRCell)
		searchSTRRow.addCell(searchStopButton)
		searchSTRRow.backgroundColor = clr("searchBackGround")
		u.addRow(searchSTRRow)
	}
	switch(utsm.sort){
		case "dic":
			names = names.sort()
			break;
		case "reDic":
			names = names.sort().reverse()
			break;
	}
	for(var n=0;n<names.length;n++){
		if(scripts[names[n]]){
			if(utsm.unchoosedType.includes(scripts[names[n]].type)){
				continue;
			}else if(utsm.unchoosedCreater.includes(scripts[names[n]].creater)){
				continue;
			}
		}else if(localScripts[names[n]]){
			if(utsm.unchoosedType.includes(localScripts[names[n]].type)){
				continue;
			}else if(utsm.unchoosedCreater.includes(localScripts[names[n]].creater)){
				continue;
			}
		}
		var searchFlag = false
		for(var i=0;i<utsm.searchSTR.length;i++){
			if(!names[n].includes(utsm.searchSTR[i])){
				searchFlag = true;
			}
		}
		if(searchFlag){
			continue;
		}
		var scriptRow = new UITableRow()
		var scriptTitle = UITableCell.text(names[n])
		if((localScripts[names[n]] && localScripts[names[n]].LOCAL) || !scripts[names[n]].describe){
			var scriptDescribe = UITableCell.text(txt("NONE"))
			scriptDescribe.titleFont = font("NONE")
			scriptDescribe.titleColor = clr("NONE")
		}else if(scripts[names[n]]["describe-"+utsm.lang]){
			var scriptDescribe = UITableCell.text(scripts[names[n]]["describe-"+utsm.lang])
			scriptDescribe.titleFont = font("scriptDescribe")
			scriptDescribe.titleColor = clr("scriptDescribe")
		}else{
			var scriptDescribe = UITableCell.text(scripts[names[n]].describe)
			scriptDescribe.titleFont = font("scriptDescribe")
			scriptDescribe.titleColor = clr("scriptDescribe")
		}
		scriptTitle.titleFont = font("scriptTitle")
		scriptRow.backgroundColor = clr("scriptTitleBackGround")
		scriptTitle.titleColor = clr("scriptTitle")
		scriptTitle.leftAligned()
		scriptDescribe.leftAligned()
		scriptRow.addCell(scriptTitle)
		scriptRow.addCell(scriptDescribe)
		u.addRow(scriptRow)
		if(localScripts[names[n]] && localScripts[names[n]].LOCAL){
			if(!utsm.types.includes(localScripts[names[n]].type)){
				utsm.types.push(localScripts[names[n]].type)
			}
			var scriptSubRow = new UITableRow()
			var localCell = UITableCell.text(txt("local"))
			var typeCell = UITableCell.text(txt("type")+txt(localScripts[names[n]].type))
			localCell.titleFont = font("local")
			typeCell.titleFont = font("type")
			localCell.titleColor = clr("local")
			typeCell.titleColor = clr("type")
			scriptSubRow.addCell(localCell)
			scriptSubRow.addCell(typeCell)
			scriptSubRow.backgroundColor = clr("scriptTitleBackGround")
			u.addRow(scriptSubRow)
		}else{
			if(!utsm.types.includes(scripts[names[n]].type)){
				utsm.types.push(scripts[names[n]].type)
			}
			if(!utsm.creaters.includes(scripts[names[n]].creater)){
				utsm.creaters.push(scripts[names[n]].creater)
			}
			var scriptSubRow = new UITableRow()
			var createrCell = UITableCell.text(txt("createdBy")+scripts[names[n]].creater)
			var typeCell = UITableCell.text(txt("type")+txt(scripts[names[n]].type))
			createrCell.titleFont = font("createrName")
			typeCell.titleFont = font("type")
			createrCell.titleColor = clr("createrName")
			typeCell.titleColor = clr("type")
			scriptSubRow.addCell(createrCell)
			scriptSubRow.addCell(typeCell)
			scriptSubRow.backgroundColor = clr("scriptTitleBackGround")
			u.addRow(scriptSubRow)
		}
		if(localScripts.hasOwnProperty(names[n])){
			if(localScripts[names[n]].LOCAL){
				var ButtonsRow = new UITableRow()
				var DeleteButton = UITableCell.button(txt("DeleteButton"))
				DeleteButton.onTap = DeleteButtonOnTap(names[n])
				ButtonsRow.backgroundColor = clr("scriptButtonsBackGround")
				ButtonsRow.addCell(DeleteButton)
				if(localScripts[names[n]].type == "Scriptable"){
					var RunButton = UITableCell.button(txt("RunButton"))
					RunButton.onTap = RunButtonOnTap(scripts[names[n]].name.replace(".js", ""))
					ButtonsRow.addCell(RunButton)
				}
				u.addRow(ButtonsRow)
			}else{
				var ButtonsRow = new UITableRow()
				var UpdateButton = UITableCell.button(txt("UpdateButton"))
				var DeleteButton = UITableCell.button(txt("DeleteButton"))
				UpdateButton.onTap = InstallButtonOnTap(names[n])
				ButtonsRow.addCell(UpdateButton)
				if(scripts[names[n]]["document-"+utsm.lang]){
					var WebsiteButton = UITableCell.button(txt("WebsiteButton"))
					WebsiteButton.onTap = WebsiteButtonOnTap(scripts[names[n]]["document-"+utsm.lang])
					ButtonsRow.addCell(WebsiteButton)
				}else if(scripts[names[n]].document){
					var WebsiteButton = UITableCell.button(txt("WebsiteButton"))
					WebsiteButton.onTap = WebsiteButtonOnTap(scripts[names[n]].document)
					ButtonsRow.addCell(WebsiteButton)
				}
				DeleteButton.onTap = DeleteButtonOnTap(names[n])
				ButtonsRow.addCell(DeleteButton)
				ButtonsRow.backgroundColor = clr("scriptButtonsBackGround")
				if(scripts[names[n]].type == "Scriptable"){
					var RunButton = UITableCell.button(txt("RunButton"))
					RunButton.onTap = RunButtonOnTap(scripts[names[n]].name.replace(".js", ""))
					ButtonsRow.addCell(RunButton)
				}
				u.addRow(ButtonsRow)
			}
		}else{
			var ButtonsRow = new UITableRow()
			var InstallButton = UITableCell.button(txt("InstallButton"))
			InstallButton.onTap = InstallButtonOnTap(names[n])
			ButtonsRow.addCell(InstallButton)
			if(scripts[names[n]]["document-"+utsm.lang]){
				var WebsiteButton = UITableCell.button(txt("WebsiteButton"))
				WebsiteButton.onTap = WebsiteButtonOnTap(scripts[names[n]]["document-"+utsm.lang])
				ButtonsRow.addCell(WebsiteButton)
			}else if(scripts[names[n]].document){
				var WebsiteButton = UITableCell.button(txt("WebsiteButton"))
				WebsiteButton.onTap = WebsiteButtonOnTap(scripts[names[n]].document)
				ButtonsRow.addCell(WebsiteButton)
			}
			ButtonsRow.backgroundColor = clr("scriptButtonsBackGround")
			u.addRow(ButtonsRow)
		}
	}
	utsm.cache = false
}

function SortButtonOnTap(name){
	return async function(){
		utsm.sort = name
		await load()
	}
}

function ChooseTypeButtonOnTap(name){
	return async function(){
		var ind = utsm.unchoosedType.indexOf(name)
		if(ind == -1){
			utsm.unchoosedType.push(name)
		}else{
			utsm.unchoosedType.splice(ind, 1)
		}
		await load()
	}
}

function ChooseCreaterButtonOnTap(name){
	return async function(){
		var ind = utsm.unchoosedCreater.indexOf(name)
		if(ind == -1){
			utsm.unchoosedCreater.push(name)
		}else{
			utsm.unchoosedCreater.splice(ind, 1)
		}
		await load()
	}
}

function InstallButtonOnTap(name){
	return function(){
		utsm.cache = true
		fmi.writeString(doci+"/utsm/utsm.json", JSON.stringify(utsm, null, "\t"))
		Safari.open(encodeURI(`scriptable:///run/tsfm-ex?command=script&parameter=install|${name}&url=scriptable:///run/utsm`))
	}
}

function WebsiteButtonOnTap(url){
	return function(){
		WebView.loadURL(encodeURI(url), null, true)
	}
}

function DeleteButtonOnTap(name){
	return function(){
		utsm.cache = true
		fmi.writeString(doci+"/utsm/utsm.json", JSON.stringify(utsm, null, "\t"))
		Safari.open(encodeURI(`scriptable:///run/tsfm-ex?command=script&parameter=delete|${name}&url=scriptable:///run/utsm`))
	}
}

function RunButtonOnTap(name){
	return function(){
		utsm.cache = false
		fmi.writeString(doci+"/utsm/utsm.json", JSON.stringify(utsm, null, "\t"))
		Safari.open(encodeURI("scriptable:///run/"+name))
	}
}

async function showBar(name){
	if(utsm.bar == name){
		utsm.bar = "NONE"
	}else{
		utsm.bar = name
	}
	await load()
}

async function search(){
	var a = new Alert()
	a.message = txt("searchText")
	a.addTextField(utsm.searchSTR)
	await a.present()
	utsm.searchSTR = a.textFieldValue(0).split(" ")
	await load()
}

async function showSetting(){
	utsm.show = "Setting"
	u.removeAllRows()
	fmi.writeString(doci+"/utsm/utsm.json", JSON.stringify(utsm, null, "\t"))
	topLeftButton = UITableCell.button(txt("leftButton"))
	topRightButton = UITableCell.button(txt("rightButton"))
	topSettingButton = UITableCell.text(txt("settingButton"))
	topLeftButton.titleFont = font("leftButton")
	topRightButton.titleFont = font("rightButton")
	topSettingButton.titleFont = font("settingButton")
	topLeftButton.centerAligned()
	topRightButton.centerAligned()
	topSettingButton.rightAligned()
	topSettingButton.widthWeight = 200
	topLeftButton.widthWeight = (Device.screenSize().width-200)/2
	topRightButton.widthWeight = (Device.screenSize().width-200)/2
	topLeftButton.onTap = async function(){
	  await showNetwork()
	}
	topRightButton.onTap = async function(){
	  await showLocal()
	}
	topSettingButton.titleColor = clr("pushedButton")
	topRow = new UITableRow()
	topRow.backgroundColor = clr("topBackGround")
	topRow.addCell(topLeftButton)
	topRow.addCell(topRightButton)
	topRow.addCell(topSettingButton)
	topRow.isHeader = true
	u.addRow(topRow)
	var setLangRow = new UITableRow()
	var setLangCell = UITableCell.text(txt("setLang"))
	setLangCell.titleColor = clr("setLang")
	setLangCell.titleFont = font("setLang")
	setLangCell.leftAligned()
	setLangRow.height = height("setLang")
	setLangRow.backgroundColor = clr("settingBackGround")
	setLangRow.dismissOnSelect = false
	setLangRow.onSelect = async function(){
		var a = new Alert()
		a.message = txt("newLang")
		a.addTextField(txt("newLang"), utsm.lang)
		await a.present()
		utsm.lang = a.textFieldValue(0)
		fmi.writeString(doci+"/utsm/utsm.json", JSON.stringify(utsm, null, "\t"))
		Safari.open("scriptable:///run/utsm")
	}
	setLangRow.addCell(setLangCell)
	u.addRow(setLangRow)
	if(!translatedTexts){
		var translateTextRow = new UITableRow()
		var translateTextCell = UITableCell.button(txt("Create").replace("[lang]", utsm.lang))
		translateTextCell.centerAligned()
		translateTextCell.titleColor = clr("Create")
		translateTextCell.titleFont = font("Create")
		translateTextCell.onTap = function(){
			translatedTexts = {}
			var texts = Object.keys(utsm.text)
			for(var n=0;n<texts.length;n++){
				translatedTexts[texts[n]] = utsm.text[texts[n]].text
			}
			fmi.writeString(doci + "/utsm/" + utsm.lang + "-texts.json", JSON.stringify(translatedTexts, null, "\t"))
		}
		translateTextRow.backgroundColor = clr("settingSubBackGround")
		translateTextRow.addCell(translateTextCell)
		u.addRow(translateTextRow)
	}else{
		var editTranslatedTopRow = new UITableRow()
		if(utsm.settingBar.includes("editTranslatedText")){
			var editTranslatedTopCell = UITableCell.text(txt("editTranslatedTop")+txt("opened"))
			editTranslatedTopCell.titleFont = font("editTranslatedTop")
			editTranslatedTopCell.titleColor = clr("editTranslatedTop")
			editTranslatedTopRow.onSelect = SettingBarOnSelect("editTranslatedText")
			editTranslatedTopRow.dismissOnSelect = false
			editTranslatedTopRow.backgroundColor = clr("settingBarBackGround")
			editTranslatedTopRow.height = height("settingBar")
			editTranslatedTopRow.addCell(editTranslatedTopCell)
			u.addRow(editTranslatedTopRow)
			var texts = Object.keys(utsm.text)
			for(var n = 0;n<texts.length;n++){
				var editTranslatedTextRow = new UITableRow()
				var editTranslatedTextCell = UITableCell.text(texts[n])
				editTranslatedTextCell.titleFont = font("editTranslatedText")
				editTranslatedTextCell.titleColor = clr("editTranslatedText")
				editTranslatedTextRow.onSelect = EditTranslatedTextOnSelect(texts[n])
				editTranslatedTextRow.dismissOnSelect = false
				editTranslatedTextRow.backgroundColor = clr("settingBackGround")
				editTranslatedTextRow.height = height("editTranslatedText")
				editTranslatedTextRow.addCell(editTranslatedTextCell)
				u.addRow(editTranslatedTextRow)
				var translatedTextRow = new UITableRow()
				if(translatedTexts[texts[n]]){
					var translatedTextCell = UITableCell.text(translatedTexts[texts[n]])
					translatedTextCell.titleFont = font("translatedText")
					translatedTextCell.titleColor = clr("translatedText")
				}else{
					var translatedTextCell = UITableCell.text(txt("NONE"))
					translatedTextCell.titleFont = font("NONE")
					translatedTextCell.titleColor = clr("NONE")
				}
				translatedTextRow.onSelect = EditTranslatedTextOnSelect(texts[n])
				translatedTextRow.dismissOnSelect = false
				translatedTextRow.backgroundColor = clr("settingBackGround")
				translatedTextRow.height = height("translatedText")
				translatedTextRow.addCell(translatedTextCell)
				u.addRow(translatedTextRow)
			}
		}else{
			var editTranslatedTopCell = UITableCell.text(txt("editTranslatedTop")+txt("closed"))
			editTranslatedTopCell.titleFont = font("editTranslatedTop")
			editTranslatedTopCell.titleColor = clr("editTranslatedTop")
			editTranslatedTopRow.onSelect = SettingBarOnSelect("editTranslatedText")
			editTranslatedTopRow.dismissOnSelect = false
			editTranslatedTopRow.backgroundColor = clr("settingBarBackGround")
			editTranslatedTopRow.height = height("settingBar")
			editTranslatedTopRow.addCell(editTranslatedTopCell)
			u.addRow(editTranslatedTopRow)
		}
	}
	var editColorTopRow = new UITableRow()
	if(utsm.settingBar.includes("editColor")){
		var editColorTopCell = UITableCell.text(txt("editColorTop")+txt("opened"))
		editColorTopCell.titleFont = font("editColorTop")
		editColorTopCell.titleColor = clr("editColorTop")
		editColorTopRow.onSelect = SettingBarOnSelect("editColor")
		editColorTopRow.dismissOnSelect = false
		editColorTopRow.height = height("settingBar")
		editColorTopRow.backgroundColor = clr("settingBarBackGround")
		editColorTopRow.addCell(editColorTopCell)
		u.addRow(editColorTopRow)
		var colors = Object.keys(utsm.color)
		for(var n=0;n<colors.length;n++){
			var editColorRow = new UITableRow()
			var editColorCell = UITableCell.text(colors[n])
			editColorCell.titleColor = clr("editColor")
			editColorCell.titleFont = font("editColor")
			editColorCell.rightAligned()
			editColorRow.addCell(editColorCell)
			var showColorCell = UITableCell.text(txt("showColor"))
			showColorCell.titleColor = clr(colors[n])
			showColorCell.titleFont = font("showColor")
			showColorCell.centerAligned()
			editColorRow.addCell(showColorCell)
			var colorCodeCell = UITableCell.button(utsm.color[colors[n]])
			colorCodeCell.titleFont = font("editColorCode")
			colorCodeCell.onTap = ColorCodeCellOnTap(colors[n])
			colorCodeCell.leftAligned()
			editColorRow.addCell(colorCodeCell)
			editColorRow.height = height("editColor")
			editColorRow.backgroundColor = clr("settingBackGround")
			editColorRow.dismissOnSelect = false
			editColorRow.onSelect = EditColorRowOnSelect(colors[n])
			u.addRow(editColorRow)
			if(utsm.edittingColor.includes(colors[n])){
				var colorEditorRow = new UITableRow()
				ColorEditor("red", colors[n], colorEditorRow)
				ColorEditor("green", colors[n], colorEditorRow)
				ColorEditor("blue", colors[n], colorEditorRow)
				colorEditorRow.height = height("colorEditor")
				colorEditorRow.backgroundColor = clr("settingSubBackGround")
				u.addRow(colorEditorRow)
			}
		}
	}else{
		var editColorTopCell = UITableCell.text(txt("editColorTop")+txt("closed"))
		editColorTopCell.titleFont = font("editColorTop")
		editColorTopCell.titleColor = clr("editColorTop")
		editColorTopRow.onSelect = SettingBarOnSelect("editColor")
		editColorTopRow.dismissOnSelect = false
		editColorTopRow.height = height("settingBar")
		editColorTopRow.backgroundColor = clr("settingBarBackGround")
		editColorTopRow.addCell(editColorTopCell)
		u.addRow(editColorTopRow)
	}
	var editTextTopRow = new UITableRow()
	if(utsm.settingBar.includes("editText")){
		var editTextTopCell = UITableCell.text(txt("editTextTop")+txt("opened"))
		editTextTopCell.titleFont = font("editTextTop")
		editTextTopCell.titleColor = clr("editTextTop")
		editTextTopRow.onSelect = SettingBarOnSelect("editText")
		editTextTopRow.dismissOnSelect = false
		editTextTopRow.height = height("settingBar")
		editTextTopRow.backgroundColor = clr("settingBarBackGround")
		editTextTopRow.addCell(editTextTopCell)
		u.addRow(editTextTopRow)
		var texts = Object.keys(utsm.text)
		for(var n=0;n<texts.length;n++){
			var editTextRow = new UITableRow()
			var editTextCell = UITableCell.text(texts[n])
			editTextCell.titleColor = clr("editText")
			editTextCell.titleFont = font("editText")
			editTextRow.backgroundColor = clr("settingBackGround")
			editTextRow.addCell(editTextCell)
			u.addRow(editTextRow)
			var editTextTextRow = new UITableRow()
			if(utsm.text[texts[n]].text){
				var editTextTextCell = UITableCell.text(txt("editTextText") + utsm.text[texts[n]].text)
			}else{
				var editTextTextCell = UITableCell.text(txt("editTextText") + txt("NONE"))
			}
			editTextTextCell.titleColor = clr("editTextText")
			editTextTextCell.titleFont = font("editTextText")
			editTextTextRow.backgroundColor = clr("settingSubBackGround")
			editTextTextRow.height = height("editTextText")
			editTextTextRow.onSelect = EditTextTextRowOnSelect(texts[n])
			editTextTextRow.dismissOnSelect = false
			editTextTextRow.addCell(editTextTextCell)
			u.addRow(editTextTextRow)
			var editTextFontRow = new UITableRow()
			if(utsm.text[texts[n]].font){
				var editTextFontCell = UITableCell.text(txt("editTextFont") + utsm.text[texts[n]].font)
			}else{
				var editTextFontCell = UITableCell.text(txt("editTextFont") + txt("NONE"))
			}
			editTextFontCell.titleColor = clr("editTextFont")
			editTextFontCell.titleFont = font("editTextFont")
			editTextFontRow.backgroundColor = clr("settingSubBackGround")
			editTextFontRow.height = height("editTextFont")
			editTextFontRow.onSelect = EditTextFontRowOnSelect(texts[n])
			editTextFontRow.dismissOnSelect = false
			editTextFontRow.addCell(editTextFontCell)
			u.addRow(editTextFontRow)
			var editTextSizeRow = new UITableRow()
			if(utsm.text[texts[n]].size){
				var editTextSizeCell = UITableCell.text(txt("editTextSize") + utsm.text[texts[n]].size)
			}else{
				var editTextSizeCell = UITableCell.text(txt("editTextSize") + txt("NONE"))
			}
			editTextSizeCell.titleColor = clr("editTextSize")
			editTextSizeCell.titleFont = font("editTextSize")
			editTextSizeRow.backgroundColor = clr("settingSubBackGround")
			editTextSizeRow.height = height("editTextSize")
			editTextSizeRow.onSelect = EditTextSizeRowOnSelect(texts[n])
			editTextSizeRow.dismissOnSelect = false
			editTextSizeRow.addCell(editTextSizeCell)
			u.addRow(editTextSizeRow)
		}
	}else{
		var editTextTopCell = UITableCell.text(txt("editTextTop")+txt("closed"))
		editTextTopCell.titleFont = font("editTextTop")
		editTextTopCell.titleColor = clr("editTextTop")
		editTextTopRow.onSelect = SettingBarOnSelect("editText")
		editTextTopRow.dismissOnSelect = false
		editTextTopRow.height = height("settingBar")
		editTextTopRow.backgroundColor = clr("settingBarBackGround")
		editTextTopRow.addCell(editTextTopCell)
		u.addRow(editTextTopRow)
	}
	u.reload()
	return 0;
}

function SettingBarOnSelect(name){
	return async function(){
		var ind = utsm.settingBar.indexOf(name)
		if(ind == -1){
			utsm.settingBar.push(name)
		}else{
			utsm.settingBar.splice(ind, 1)
		}
		await load()
	}
}

function EditTranslatedTextOnSelect(name){
	return async function(){
		var a = new Alert()
		a.message = txt("newText")
		a.addTextField(name, translatedTexts[name])
		await a.present()
		translatedTexts[name] = a.textFieldValue(0)
		fmi.writeString(localScripts["utsm-text-"+utsm.lang].path, JSON.stringify(translatedTexts, null, "\t"))
		await load()
	}
}

function ColorCodeCellOnTap(name){
	return async function(){
		var a = new Alert()
		a.message = txt("newColor")
		a.addTextField(name, String(utsm.color[name].size))
		await a.present()
		utsm.color[name].size = Number(a.textFieldValue(0))
		await load()
	}
}

function EditColorRowOnSelect(name){
	return async function(){
		fmi.writeString(doci+"/utsm/utsm.json", JSON.stringify(utsm, null, "\t"))
		var ind = utsm.edittingColor.indexOf(name)
		if(ind == -1){
			utsm.edittingColor.push(name)
		}else{
			utsm.edittingColor.splice(ind, 1)
		}
		await load()
	}
}

function ColorEditor(color, name, row){
	var colorNum = clr(name)[color]*255
	var colorEditorLeftDoubleArrow = UITableCell.button(txt("leftDoubleArrow"))
	var colorEditorLeftArrow = UITableCell.button(txt("leftArrow"))
	var colorEditorCenter = UITableCell.text(String(colorNum))
	var colorEditorRightArrow = UITableCell.button(txt("rightArrow"))
	var colorEditorRightDoubleArrow = UITableCell.button(txt("rightDoubleArrow"))
	colorEditorLeftDoubleArrow.onTap = ColorEditorOnTap(color, name, colorNum-10)
	colorEditorLeftArrow.onTap = ColorEditorOnTap(color, name, colorNum-1)
	colorEditorRightArrow.onTap = ColorEditorOnTap(color, name, colorNum+1)
	colorEditorRightDoubleArrow.onTap = ColorEditorOnTap(color, name, colorNum+10)
	colorEditorCenter.titleColor = clr("colorEditor"+color)
	colorEditorCenter.titleFont = font("colorEditor"+color)
	row.addCell(colorEditorLeftDoubleArrow)
	row.addCell(colorEditorLeftArrow)
	row.addCell(colorEditorCenter)
	row.addCell(colorEditorRightArrow)
	row.addCell(colorEditorRightDoubleArrow)
}

function ColorEditorOnTap(color, name, num){
	return async function(){
		if(num<0){
			num = 0
		}else if(num>255){
			num = 255
		}
		num = Math.floor(num)
		var oldColor = clr(name)
		var colorObj = {
			"red":oldColor.red*255,
			"green":oldColor.green*255,
			"blue":oldColor.blue*255
		}
		colorObj[color] = num
		utsm.color[name] = "#" + colorObj.red.toString(16).padStart(2, "0") + colorObj.green.toString(16).padStart(2, "0") + colorObj.blue.toString(16).padStart(2, "0")
		await load()
	}
}

function EditTextTextRowOnSelect(name){
	return async function(){
		var a = new Alert()
		a.message = txt("newText")
		a.addTextField(name, utsm.text[name].text)
		await a.present()
		utsm.text[name].text = a.textFieldValue(0)
		await load()
	}
}

function EditTextFontRowOnSelect(name){
	return async function(){
		var a = new Alert()
		a.message = txt("newFont")
		a.addTextField(name, utsm.text[name].font)
		await a.present()
		utsm.text[name].font = a.textFieldValue(0)
		await load()
	}
}

function EditTextSizeRowOnSelect(name){
	return async function(){
		var a = new Alert()
		a.message = txt("newSize")
		a.addTextField(name, String(utsm.text[name].size))
		await a.present()
		utsm.text[name].size = Number(a.textFieldValue(0))
		await load()
	}
}

function txt(text){
	if(translatedTexts){
		if(translatedTexts[text]){
			return translatedTexts[text]
		}else if(!utsm.text[text]){
			return text
		}else if(utsm.text[text].text){
			return utsm.text[text].text
		}else{
			return text
		}
	}else if(!utsm.text[text]){
		return text
	}else if(utsm.text[text].text){
		return utsm.text[text].text
	}else{
		return text
	}
}

function font(text){
	var txtfont = utsm.defaultFont
	var txtsize = utsm.defaultFontSize
	try{
		txtfont = utsm.text[text].font
		if(!txtfont){
			txtfont = utsm.defaultFont
		}
	}catch(e){}
	try{
		txtsize = utsm.text[text].size
		if(!txtsize){
			txtsize = utsm.defaultFontSize
		}
	}catch(e){}
	return new Font(txtfont, txtsize)
}

function clr(color){
	if(utsm.color[color]){
		return new Color(utsm.color[color]);
	}else{
		return new Color(utsm.defaultColor);
	}
}

function height(name){
	if(utsm.height[name]){
		return utsm.height[name];
	}else{
		return utsm.defaultHeight;
	}
}