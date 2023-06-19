return(async function(){
  var apple = JSON.parse(f.readString(doc+"/tsfm-ex/badapple.json"));
  var startTime = Date.now()
  var appleNum = await Print([{
      "style":"color:white",
      "str":"",
      "tag":"pre",
      "edit":true
  }])
  while(Date.now()<startTime+218000){
    await Edit(appleNum, {
      "style":"color:white",
      "str":apple[Math.floor((Date.now()-startTime)/100)].join("<br/>")
    });
  }
  await DelNode(appleNum);
  return [];
})()