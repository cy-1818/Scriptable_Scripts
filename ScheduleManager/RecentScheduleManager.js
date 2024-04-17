// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: orange; icon-glyph: calendar-alt;
var dayKey = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
var f = FileManager.iCloud()
var uf = importModule("UsefulFuncs")
var su = importModule("SettingUI")
var grs = importModule("getRecentSchedule")
var toggleList = ["setRest"]

async function main(){
	if(!f.fileExists(f.documentsDirectory()+"/ScheduleManager/SchoolSchedule.json")){
		Safari.open("scriptable:///run/SchoolScheduleManager")
	}
	schedule = JSON.parse(f.readString(f.documentsDirectory()+"/ScheduleManager/SchoolSchedule.json"))
	recentSchedule = {}
	if(f.fileExists(f.documentsDirectory()+"/ScheduleManager/RecentSchedule.json")){
		recentSchedule = JSON.parse(f.readString(f.documentsDirectory()+"/ScheduleManager/RecentSchedule.json"))
	}
	otherSettings = {}
	if(f.fileExists(f.documentsDirectory()+"/ScheduleManager/OtherSettings.json")){
		otherSettings = JSON.parse(f.readString(f.documentsDirectory()+"/ScheduleManager/OtherSettings.json"))
	}
	u = new UITable()
	var nowNum = uf.dayStartTime()
	await makeUI(nowNum)
	u.present(true)
}

async function makeUI(utc){
	u.removeAllRows()
	var ws = await grs(utc, 7, true)
	var weekRow = new UITableRow()
	var dateRow = new UITableRow()
	var sbjRow = []
	var time = new Date(utc)
	dateRow.cellSpacing = 60
	u.addRow(weekRow)
	u.addRow(dateRow)
	var backCell = UITableCell.button("Back")
	backCell.onTap = async function(){
		await makeUI(utc - 604800000)
	}
	var setCell = UITableCell.button("Setting")
	setCell.onTap = async function(){
		await makeSettingUI()
	}
	var nextCell = UITableCell.button("Next")
	nextCell.onTap = async function(){
		await makeUI(utc + 604800000)
	}
	nextCell.rightAligned()
	setCell.centerAligned()
	weekRow.addCell(backCell)
	weekRow.addCell(setCell)
	weekRow.addCell(nextCell)
	for(var m=0;m<schedule.maxNum;m++){
		sbjRow[m] = new UITableRow()
		sbjRow[m].cellSpacing = 60
		u.addRow(sbjRow[m])
	}
	for(var n=0;n<7;n++){
		var ds = ws[uf.dayTimeSTR(time)]
		var dateCell = UITableCell.text(uf.day(time))
		dateCell.centerAligned()
		dateRow.addCell(dateCell)
		if(ds.rest){
			sbjRow[0].addCell(UITableCell.text(ds.restName))
			for(var m=1;m<schedule.maxNum;m++){
				sbjRow[m].addCell(UITableCell.text(" "))
			}
		}else{
			for(var m=0;m<schedule.maxNum;m++){
				sbj = ds.classes[m].className
				var sbjCell = UITableCell.button(sbj)
				sbjCell.centerAligned()
				sbjCell.onTap = (function(cellTime, cellNum, cellSBJ, cellSBJEdited, cellUTC, cellPattern, cellStartTime, cellEndTime){
					return (async function(){
						var a = new Alert()
						a.title = cellSBJ + (cellSBJEdited ? " (時間割変更済)" : "");
						
						a.addAction("時間割変更")
						a.addAction("課題を追加")
						a.addAction("課題を確認・削除")
						a.addAction("詳細を追加")
						a.addAction("詳細を確認・削除")
						a.addAction("時間を変更")
						a.addAction("前に予定を追加")
						a.addCancelAction("cancel")
						var ans = await a.presentAlert()
						switch(ans){
							case 0:
								a = new Alert()
								a.title = "変更後の授業を選んでください"
								if(cellSBJEdited){
									a.addAction("時間割変更を解除")
								}
								for(var n=0;n<schedule.subjs.length;n++){
									a.addAction(schedule.subjs[n])
								}
								a.addAction("その他")
								ans = await a.presentAlert()
								if(ans===0 && cellSBJEdited){
									delete recentSchedule[uf.dayTimeSTR(cellTime)][String(cellNum)]["scheduleChange"]
								}else{
									if(cellSBJEdited){
										ans -= 1;
									}
									if(ans == schedule.subjs.length){
										var a = new Alert()
										a.title = "授業名"
										a.addTextField()
										var ind = await a.presentAlert()
										if(ind==-1){
											uf.objAdd(recentSchedule, [uf.dayTimeSTR(cellTime), String(cellNum), "scheduleChange"], a.textFieldValue(0))
										}
									}else{
										uf.objAdd(recentSchedule, [uf.dayTimeSTR(cellTime), String(cellNum), "scheduleChange"], schedule.subjs[ans])
									}
								}
								break;
							case 1:
								var a = new Alert()
								a.title = "課題"
								a.addTextField("")
								var ind = await a.presentAlert()
								var astr = a.textFieldValue(0)
								if(ind==-1){
									uf.objAdd(recentSchedule, [uf.dayTimeSTR(cellTime), String(cellNum), "homework", astr], false)
								}
								break;
							case 2:
								var homeworks = uf.objCheck(recentSchedule, [uf.dayTimeSTR(cellTime), String(cellNum), "homework"])
								var homeworkNames = Object.keys(homeworks)
								var a = new Alert()
								a.title = "課題"
								for(var n=0;n<homeworkNames.length;n++){
									a.addAction(homeworkNames[n])
								}
								a.addAction("閉じる")
								var ind = await a.presentSheet()
								if(ind != homeworkNames.length){
									var b = new Alert()
									if(homeworks[homeworkNames[ind]]){
										b.addAction("完了を取り消し")
									}else{
										b.addAction("完了")
									}
									b.addAction("削除")
									b.addAction("閉じる")
									var bind = await b.presentAlert()
									if(bind ===0){
										homeworks[homeworkNames[ind]] = !homeworks[homeworkNames[ind]]
									}else if(bind==1){
										delete homeworks[homeworkNames[ind]]
									}
								}
								break;
							case 3:
								var todoList = uf.objCheck(recentSchedule, [uf.dayTimeSTR(cellTime), String(cellNum), "detail"])
								if(!todoList){
									todoList = []
								}
								var a = new Alert()
								a.title = "詳細"
								a.addTextField("")
								var ind = await a.presentAlert()
								var astr = a.textFieldValue(0)
								if(ind==-1){
									todoList.push(astr)
								}
								uf.objAdd(recentSchedule, [uf.dayTimeSTR(cellTime), String(cellNum), "detail"], todoList)
								break;
							case 4:
								var todoList = uf.objCheck(recentSchedule, [uf.dayTimeSTR(cellTime), String(cellNum), "detail"])
								if(!todoList){
									todoList = []
								}
								var a = new Alert()
								a.title = "詳細"
								for(var n=0;n<todoList.length;n++){
									a.addAction(todoList[n])
								}
								a.addAction("閉じる")
								var ind = await a.presentSheet()
								if(ind != todoList.length){
									todoList.splice(ind, 1)
								}
								uf.objAdd(recentSchedule, [uf.dayTimeSTR(cellTime), String(cellNum), "detail"], todoList)
								break;
							case 5:
								var a = new Alert()
								a.addAction("開始時間")
								a.addAction("終了時間")
								a.addAction("閉じる")
								var ind = await a.presentAlert()
								var b = new Alert()
								var btxt = uf.numToTime(ind===0 ? cellStartTime : cellEndTime)
								b.message = "開始時間"
								b.addTextField("", btxt)
								var bind = await b.presentAlert()
								var bstr = b.textFieldValue(0)
								if(bind==-1 && bstr != btxt){
									uf.objAdd(recentSchedule, [uf.dayTimeSTR(cellTime), String(cellNum), ind===0 ? "start" : "end"], uf.timeToNum(bstr))
								}
								break;
						}
						f.writeString(f.documentsDirectory()+"/ScheduleManager/RecentSchedule.json", JSON.stringify(recentSchedule, null, "\t"))
						f.writeString(f.documentsDirectory()+"/ScheduleManager/OtherSettings.json", JSON.stringify(otherSettings, null, "\t"))
						await makeUI(cellUTC)
					})
				})(time, m, sbj, ds.classes[m].classChanged, utc, ds.pattern, ds.classes[m].start, ds.classes[m].end)
				sbjRow[m].addCell(sbjCell)
			}
		}
		time = new Date(time.getTime()+86400000)
	}
	u.reload()
}

async function makeSettingUI(){
	f.writeString(f.documentsDirectory()+"/ScheduleManager/RecentSchedule.json", JSON.stringify(recentSchedule, null, "\t"))
	u.removeAllRows()
	var head = new UITableRow()
	var close = UITableCell.button("close setting")
	close.onTap = async function(){
		await makeUI(uf.dayStartTime())
	}
	head.addCell(close)
	u.addRow(head)
	var setRestCalenderRow = uf.makeUITableRow(Color.white()/*, 20, null, su.toggleButton("setRest", toggleList)*/)
	var setRestCalenderCell = uf.makeUITableCellText("休日の設定", Color.black())
	u.addRow(setRestCalenderRow)
	if(toggleList.includes("setRest")){
		if(!recentSchedule.restCals){
			recentSchedule.restCals = []
		}
		var cals = await Calendar.forEvents()
		su.SelectionUI(recentSchedule.restCals, null, cals.map(e=>e.title), u, 4, true, null, ["ffffee", "eeffff"])
	}
	u.reload()
}

su.load = makeSettingUI;

await main();