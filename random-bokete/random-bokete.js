// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: orange; icon-glyph: grin-squint-tears;
var rq = new Request("https://bokete.jp")
var html = await rq.loadString()
var numStart = html.indexOf("header-news-stats")
var num = Number(html.slice(html.indexOf("<b>",numStart)+3, html.indexOf("</b>",numStart)).split(",").join("").split(" ").join(""))
var f = FileManager.iCloud()
var pass = f.documentsDirectory()+"/bokete"
var limit = args.widgetParameter;
if(!f.fileExists(pass)){
  await f.createDirectory(pass, false)
}
if(limit===null){
  var alert =  new Alert()
  alert.message = "set min stars"
  alert.addTextField("number")
  await alert.present()
  limit = alert.textFieldValue(0)
}
limit = Number(limit)
async function getOGP(url){
  var ogp = await getJSON("https://kotsukotsu-ogp-api.vercel.app/api/ogp?url="+url);
  return ogp;
}
async function getJSON(url){
  var http = new Request(url);
  return await http.loadJSON();
}
async function getImage(url){
  var http = new Request(url);
  return await http.loadImage();
}
async function getBokete(){
  var id = Math.floor(Math.random()*num)
  console.log(id)
  var link = "https://bokete.jp/boke/"+id;
  try{
    var ogp = await getOGP(link)
    console.log(ogp)
    var star= ogp.description.indexOf("★", ogp.title.length+3)
    var stars = Number(ogp.description.slice(star+1,ogp.description.indexOf("」",star)))
    console.log(stars)
    if(stars >= limit){
      var image = await getImage(ogp.image)
      var imageName = "image."+ogp.image.split('.').pop();
      await f.createDirectory(pass+"/"+id, false)
      await f.writeImage(pass+"/"+id+"/"+imageName, image)
      await f.writeString(pass+"/"+id+"/json.json", JSON.stringify({
        "text":ogp.title,
        "id":id,
        "star":stars,
        "image":imageName,
        "url":link
      }))
    }
  }catch(e){
    console.log(e.message)
  }
  return 0;
}
if(!args.widgetParameter&&f.listContents(pass).length<5){
  while(true){
    await getBokete();
  }
}else{
  for(var n=0;n<4;n++){
    await getBokete()
  }
}
var bokes=f.listContents(pass)
var bokeID = bokes[Math.floor(Math.random()*bokes.length)]
var boke=JSON.parse(f.readString(pass+"/"+bokeID+"/json.json"))
var w = new ListWidget()
var imageStack=w.addImage(f.readImage(pass+"/"+bokeID+"/"+boke.image))
var texta=w.addText(boke.text)
var textb=w.addText("★:"+boke.star+" id:"+boke.id)
imageStack.centerAlignImage()
texta.font = new Font("Arial-BoldMT",20);
texta.centerAlignText()
textb.font = new Font("ArialMT",12);
textb.rightAlignText()
w.url=boke.url
w.presentMedium()