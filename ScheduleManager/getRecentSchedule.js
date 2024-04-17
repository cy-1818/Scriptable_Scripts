// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: light-gray; icon-glyph: calendar;
var dayKey = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
var f = FileManager.iCloud()
var uf = importModule("UsefulFuncs")

module.exports = getRecentSchedule;

async function getRecentSchedule(utc, len, all){
	var time = new Date(utc)
	var ans = {}
	if(!f.fileExists(f.documentsDirectory()+"/ScheduleManager/SchoolSchedule.json")){
		var SchoolScheduleManager = importModule("SchoolScheduleManager")
		await SchoolScheduleManager.main()
	}
	schedule = JSON.parse(f.readString(f.documentsDirectory()+"/ScheduleManager/SchoolSchedule.json"))
	recentSchedule = {}
	if(f.fileExists(f.documentsDirectory()+"/ScheduleManager/RecentSchedule.json")){
		recentSchedule = JSON.parse(f.readString(f.documentsDirectory()+"/ScheduleManager/RecentSchedule.json"))
	}
	for(var n=0;n<len;n++){
		var dayObj = {}
		if(recentSchedule.restCals && recentSchedule.restCals.length!==0){
			restCals = []
			for(var k of recentSchedule.restCals){
				restCals.push(await Calendar.forEventsByTitle(k))
			}
			var rest = await CalendarEvent.between(time, new Date(time.getTime()+86400000), restCals)
		}else{
			var rest = []
		}
		dayObj.weekName = schedule.week[Math.floor(((time.getTime()-schedule.startDay)/604800000)%schedule.week.length)]
		dayObj.day = dayKey[time.getDay()]
		if(rest.length===0){
			dayObj.rest = false
			dayObj.pattern = schedule.classes[dayObj.weekName][dayKey[time.getDay()]]["pattern"]
			if(!dayObj.pattern){
				dayObj.pattern = "*"
			}
			dayObj.classes = []
			for(var m=0;m<schedule.maxNum;m++){
				var classObj = {}
				classObj.className = schedule.classes[dayObj.weekName][dayKey[time.getDay()]]["classes"][m]
				classObj.timeName = schedule.patterns[dayObj.pattern][m].name
				classObj.start = schedule.patterns[dayObj.pattern][m].start
				classObj.end = schedule.patterns[dayObj.pattern][m].end
				classObj.classChanged = false;
				var changedClass = uf.objCheck(recentSchedule, [uf.dayTimeSTR(time), String(m), "scheduleChange"])
				if(changedClass){
					classObj.className = changedClass
					classObj.classChanged = true;
				}
				var changedStart = uf.objCheck(recentSchedule, [uf.dayTimeSTR(time), String(m), "start"])
				if(changedStart){
					classObj.start = changedStart
				}
				var changedEnd = uf.objCheck(recentSchedule, [uf.dayTimeSTR(time), String(m), "end"])
				if(changedEnd){
					classObj.end = changedEnd
				}
				if(all || classObj.className){
					dayObj.classes.push(classObj)
				}
			}
		}else{
			dayObj.rest = true
			dayObj.restName = rest[0].title
		}
		ans[uf.dayTimeSTR(time)] = dayObj
		time = new Date(time.getTime()+86400000)
	}
	return ans;
}