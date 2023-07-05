return(async function(){
  var apple = JSON.parse(fmi.readString(doci+"/tsfm-ex/badapple.json"));
  var startTime = Date.now()
  var appleNum = await Print([{
      "style":"color:white",
      "str":"",
      "tag":"pre",
      "edit":true
  }])
  index = Math.floor((Date.now()-startTime)/100)
  for(var n=0;n<29;n++){
    await Print([{
      "style":"color:white;margin:0;padding:0;",
      "str":"",
      "tag":"pre",
      "edit":true
    }])
  }
  await Print([{
    "style":"",
    "str":">",
  },{
    "style":"",
    "str":"",
    "getKey":true
  }])
  while(index!=apple.length){
    for(var n=0;n<30;n++){
      await Edit(appleNum+n, {
        "style":"color:white;margin:0;padding:0;",
        "str":apple[index][n]
      });
    }
    index = Math.floor((Date.now()-startTime)/100)
    if(await KeyPressed()){
      if(await GetKey()=="c"){
        await EndGetKey();
        break;
      }
    }
  }
  for(var n=0;n<30;n++){
    await DelNode(appleNum);
  }
  apple = null;
  startTime = null;
  appleNum = null;
  index = null;
  return [];
})()
