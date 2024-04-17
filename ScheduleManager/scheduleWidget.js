// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: blue; icon-glyph: list-ol;
var widget = new ListWidget();
var uf = importModule("UsefulFuncs");
var grs = importModule("getRecentSchedule")
var now = new Date("2024/4/16 13:00")
var rs = (await grs(uf.dayStartTime(now.getTime()), 1))
var ds = rs[uf.dayTimeSTR(now)]
var nowNum = now.getHours()*60 + now.getMinutes()
var headText = widget.addText(uf.day(now))
var stack = widget.addStack()
var classStack = stack.addStack()
stack.addSpacer(10)
var startStack = stack.addStack()
stack.addSpacer(10)
var endStack = stack.addStack()
classStack.layoutVertically()
startStack.layoutVertically()
endStack.layoutVertically()
var flag = true;
for(var n=0;n<ds.classes.length;n++){
	var text = classStack.addText(ds.classes[n].className)
	startStack.addText(uf.numToTime(ds.classes[n].start))
	endStack.addText(uf.numToTime(ds.classes[n].end))
	if(ds.classes[n].start<nowNum && ds.classes[n].end>nowNum){
		text.textColor = Color.red()
		headText.text+=" "+ds.classes[n].timeName
	}else if(n+1!=ds.classes.length && ds.classes[n].end<nowNum && ds.classes[n+1].start>nowNum){
		var rest = classStack.addText("休み時間")
		startStack.addText(uf.numToTime(ds.classes[n].end))
		endStack.addText(uf.numToTime(ds.classes[n+1].start))
		rest.textColor = Color.red()
	}
}
Script.setWidget(widget)
widget.presentLarge()