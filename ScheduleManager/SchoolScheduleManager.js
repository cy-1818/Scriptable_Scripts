// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: teal; icon-glyph: school;
async function main(edit){
	var obj = {}
	var a = new Alert()
	var f = FileManager.iCloud()
	var w = new WebView()
	a.message = "save file?"
	a.addAction("save")
	a.addCancelAction("cancel")
	w.loadURL("https://cy-1818.github.io/class-schedule-editor/")
	var p = w.waitForLoad()
	var q = a.presentAlert()
	await p;
	if(edit && f.fileExists(f.documentsDirectory()+"/ScheduleManager/SchoolSchedule.json")){
		obj = JSON.parse(f.readString(f.documentsDirectory()+"/ScheduleManager/SchoolSchedule.json"))
		var objSTR = JSON.stringify(obj).split("\\").join("\\\\").split("'").join("\\\'").split("\"").join("\\\"").split("\`").join("\\\`")
		await w.evaluateJavaScript(`
			(function(){
				formatType = 2;
				document.getElementById("changeJSON").remove();
				document.getElementById("getDataButtons").innerHTML="左上のcloseボタンを押してください。"
				noprompt()
				loadJSON('${objSTR}')
				makeTimeTable();
				return 0;
			})()
			`, false)
	}else{
		await w.evaluateJavaScript(`
			(function(){
				formatType = 2;
				document.getElementById("changeJSON").remove()
				document.getElementById("getDataButtons").innerHTML="左上のcloseボタンを押してください。"
				noprompt()
				return 0;
			})()
			`, false)
	}
	w.present(true)
	var ans = await q;
	if(ans===0){
		var lastObj = await w.evaluateJavaScript("finalFormat()", false)
		if(obj.startDay){
			lastObj.startDay = obj.startDay
		}
		var str = JSON.stringify(lastObj, null, "\t")
		f.writeString(f.documentsDirectory()+"/ScheduleManager/SchoolSchedule.json", str)
		if(!obj.startDay){
			await setStartDay()
		}
	}
}

async function setStartDay(){
	var f = FileManager.iCloud()
	var obj = JSON.parse(f.readString(f.documentsDirectory()+"/ScheduleManager/SchoolSchedule.json"))
	var a = new Alert()
	a.message = `はじめの${obj.week[0]}の始まる日付を選んでください`
	a.addTextField()
	await a.presentAlert()
	var date = new Date(a.textFieldValue(0))
	if(date == "Invalid Date"){
		await showAlert("日付として認識できませんでした。")
		await setStartDay()
	}else if(date.getDay()!==0){
		await showAlert("日曜日を指定してください。")
		await setStartDay()
	}else{
		obj.startDay = date.getTime()
		f.writeString(f.documentsDirectory()+"/ScheduleManager/SchoolSchedule.json", JSON.stringify(obj, null, "\t"))
		
	}
}

async function showAlert(str){
	var alert = new Alert()
	alert.message = str
	await alert.presentAlert()
}

await main(true)