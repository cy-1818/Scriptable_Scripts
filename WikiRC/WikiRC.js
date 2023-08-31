// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: pink; icon-glyph: align-left;
var urls = {};
var para = JSON.parse(args.widgetParameter)
if(!para){
	para = {}
}
var widget = new ListWidget();
if(config.widgetFamily){
	var widgetFamily = config.widgetFamily
}else{
	var widgetFamily = "extraLarge"
}
var WidgetSize = importModule("WidgetSize")
var size = WidgetSize(widgetFamily, widget)
var line = para.line ? para.line : 10;
var scheme = para.scheme ? para.scheme : "https";
var site = para.site ? para.site : "https://en.wikipedia.org/w/api.php?"
var color = para.color ? new Color(para.color) : new Color("#000")
var link = para.link ? para.link.replace("https", scheme) : scheme + "://en.wikipedia.org/wiki/"
var stack = widget.addStack()
stack.size=size;
stack.backgroundColor = new Color("#fff")
var font = para.font ? para.font : "Arial";
var fontSize = para.fontSize ? para.fontSize : size.height/(line+1);

Request.prototype.addBody = function(obj){
	var list=[];
	for(var n=0;n<Object.keys(obj).length;n++){
		list.push(`${Object.keys(obj)[n]}=${obj[Object.keys(obj)[n]]}`);
	}
	this.url += encodeURI(list.join('&'));
}
function StringDate(date){
  return ("00"+date.getHours()).slice(-2)+" : "+("00"+date.getMinutes()).slice(-2);
}
function LastDate(date){
  return date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate();
}
async function getJSON(site, body){
	var http = new Request(site);
	http.addBody(body);
	console.log(http)
	return await http.loadJSON();
}
async function getURL(site, pageTitle){
	if(urls[pageTitle]===undefined){
		var pageInfoBody = {
			"action":"query",
			"format":"json",
			"prop":"info",
			"titles":pageTitle,
			"inprop":"url",
			"formatversion":"2"
		}
		var pageInfo = await getJSON(site, pageInfoBody);
		urls[pageTitle] = pageInfo.query.pages[0].fullurl;
	}
	return urls[pageTitle];
}

urls = {};
var RCBody = {
	"action":"query",
	"format":"json",
	"list":"recentchanges",
	"rclimit":line,
	"rcprop":"title|timestamp|user|loginfo"};
var Infobody = {
	"action":"query",
	"format":"json",
	"meta":"siteinfo",
	"siprop":"general",
	"sifilteriw":"local"}
var rc = (await getJSON(site, RCBody)).query.recentchanges;
var info = (await getJSON(site, Infobody)).query.general;
console.log(rc)
var title = stack.addStack();
var final = new Date(rc[0].timestamp)
var titleLeft = title.addText(info.sitename)
titleLeft.url = info.base.replace("https", scheme);
titleLeft.font = new Font(font, fontSize);
var titleCenter = title.addText(" Latest change:"+LastDate(final))
titleCenter.url = encodeURI(link + "Special:RecentChanges");
titleCenter.font = new Font(font, fontSize);
var titleRight = title.addText(` (${Math.floor((Date.now()-final)/1000/60/60/24)})`)
titleRight.font = new Font(font, fontSize);
titleLeft.textColor = new Color("#000")
titleCenter.textColor = new Color("#000")
titleRight.textColor = new Color("#000")
stack.layoutVertically();
stack.borderWidth = 1;
stack.borderColor = color;
var pageInfo;
var stacks = [];
var timeStack = [];
var pageStack = [];
var userStack = [];
var timeTexts = [];
var pageNames = [];
var userNames = [];
for(var n=0;n<line;n++){
	stacks[n] = stack.addStack();
	stacks[n].layoutHorizontally();
	stacks[n].topAlignContent();
	timeStack[n] = stacks[n].addStack();
	pageStack[n] = stacks[n].addStack();
	userStack[n] = stacks[n].addStack();
	timeStack[n].size = new Size(fontSize*3.5, size.height/(line+1));
	pageStack[n].size = new Size((size.width-fontSize*3.5)/7*4, size.height/(line+1));
	userStack[n].size = new Size((size.width-fontSize*3.5)/7*3, size.height/(line+1));
	timeStack[n].layoutVertically();
	pageStack[n].layoutVertically();
	userStack[n].layoutVertically();
	timeTexts[n] = timeStack[n].addText(StringDate(new Date(rc[n].timestamp)));
	userNames[n] = userStack[n].addText(rc[n].user);
	timeTexts[n].leftAlignText();
	userNames[n].leftAlignText();
	timeTexts[n].font = new Font(font, fontSize);
	userNames[n].font = new Font(font, fontSize);
	timeTexts[n].textColor = new Color("#000")
	userNames[n].textColor = new Color("#4506ad");
	//pageStack[n].url = await getURL(site, rc[n].title);
	//userStack[n].url = await getURL(site, "User:"+rc[n].user);
	userStack[n].url = encodeURI(link + "User:"+rc[n].user);
	if(rc[n].logtype=="newusers"){
		pageNames[n] = pageStack[n].addText("new User");
		pageNames[n].textColor = new Color("#4506ad");
		pageStack[n].url = encodeURI(link + "Special:log?type=newusers");
	}else if(rc[n].logtype=="delete"){
		pageNames[n] = pageStack[n].addText(rc[n].title);
		pageNames[n].textColor = new Color("#ba0000");
		pageStack[n].url = encodeURI(link + "Special:log?type=delete");
	}else if(rc[n].logtype=="block"){
		pageNames[n] = pageStack[n].addText(rc[n].title);
		pageNames[n].textColor = new Color("#3b2600");
		pageStack[n].url = encodeURI(link + "Special:log?type=block");
	}else if(rc[n].type == "new"){
		pageNames[n] = pageStack[n].addText(rc[n].title);
		pageNames[n].textColor = new Color("#ff4506");
		pageStack[n].url = encodeURI(link + rc[n].title);
	}else if(rc[n].type != "edit"){
		pageNames[n] = pageStack[n].addText(rc[n].title);
		pageNames[n].textColor = new Color("#06ad45");
		pageStack[n].url = encodeURI(link + rc[n].title);
	}else{
		pageNames[n] = pageStack[n].addText(rc[n].title);
		pageNames[n].textColor = new Color("#0645ad");
		pageStack[n].url = encodeURI(link + rc[n].title);
	}
	pageNames[n].leftAlignText();
	pageNames[n].font = new Font(font, fontSize);
}
widget.presentExtraLarge();
Script.setWidget(widget);
Script.complete();