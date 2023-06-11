// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: orange; icon-glyph: user-clock;
var widget = new ListWidget();
var flag = true;
for(var n of (await CalendarEvent.today(await Calendar.forEvents()))){
	var txt = widget.addText(n.title);
	txt.textColor = new Color(n.calendar.color.hex);
	txt.font = new Font("Arial-BoldMT",15);
	txt.url = "calshow:" + ((Date.now()-Date.UTC(2001,0,1))/1000);
	flag = false;
}
if(flag){
	var str = widget.addText("今日の予定はありません！");
	str.font = new Font("Arial-BoldMT",20);
}
widget.presentMedium()
Script.setWidget(widget);
Script.complete();