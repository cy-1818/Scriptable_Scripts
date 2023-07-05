return (async function(){
  var editPass = formatPath(parameter[0], pass);
  var result = [];
  if(parameter[0]){
    var text = "";
    var type = "new";
    if(f.fileExists(editPass)){
      if(f.isDirectory(editPass)){
        result.push({
          "str":editPass+" is Directory.",
          "style":""
        });
        type = "file";
      }else{
        text = await f.readString(editPass);
        type = "text";
      }
    }
    if(type!="file"){
      text = text.split("\n");
      for(var n=0;n<text.length;n++){
        await Print([{
          "str":text[n],
          "style":"",
          "edit":true
        }])
      }
      var editNum = await Print([{
        "str":"",
        "style":"",
        "edit":true
      }]);
      await Print([{
        "str":"save",
        "style":"color:green",
        "edit":true
      },{
        "str":" save&quit ",
        "style":"",
        "edit":true
      },{
        "str":"quit",
        "style":"",
        "edit":true
      }]);
      var FirstNum = editNum - text.length;
      var NowEdit = FirstNum;
      await Edit(NowEdit,{
        "str":text[0],
        "style":"",
        "getKey":true
      })
      await Run(`getSelection().collapse(form.childNodes[0], ${text[0].length})`);
      var sqNum = 0;
      while(true){
        if(NowEdit == editNum){
          if(await KeyPressed()){
            var editColor = "orange";
            var editKey = await GetKey();
            if(editKey == "ArrowLeft" && sqNum!==0){
              sqNum -= 1;
            }else if(editKey == "ArrowRight" && sqNum!==2){
              sqNum += 1;
            }else if(editKey == "ArrowUp"){
              NowEdit -= 1;
              editColor = "green";
              await Edit(NowEdit, {
                "str":text[NowEdit-FirstNum],
                "style":"",
                "getKey":true
              });
            }else if(editKey == "s"){
              sqNum = 0;
            }else if(editKey == "q"){
              sqNum = 2;
            }else if(editKey == "Enter"){
              if(sqNum == 0 || sqNum == 1){
                text = [];
                for(var n=FirstNum;n<editNum;n++){
                  text.push(await GetText(n))
                }
                f.writeString(editPass, text.join("\n"));
              }
              if(sqNum == 1 || sqNum == 2){
                break;
              }
            }
            await Run(`form.focus()`);
            await Edit(editNum,{
              "str":"",
              "style":""
            });
            await Edit(editNum+1,{
              "str":"save",
              "style":(sqNum===0)? "color:"+editColor:""
            });
            await Edit(editNum+2,{
              "str":" save&quit ",
              "style":(sqNum===1)? "color:"+editColor:""
            });
            await Edit(editNum+3,{
              "str":"quit",
              "style":(sqNum===2)? "color:"+editColor:""
            });
            await Run(`getSelection().collapse(form.childNodes[0], 0)`);
            await Run("selection=getSelect();");
          }
        }else{
          if(await KeyPressed()){
            var editKey = await GetKey();
            text[NowEdit-FirstNum] = await GetText(NowEdit);
            if(editKey == "ArrowLeft"){
              var select = await Run("selection.start-1");
              if(select<0){
                select=0;
              }
              await Run(`getSelection().collapse(form.childNodes[0], ${select})`);
            }else if(editKey == "ArrowRight"){
              var select = await Run("selection.start+1");
              if(select>text[NowEdit-FirstNum].length){
                select=text[NowEdit-FirstNum].length;
              }
              await Run(`getSelection().collapse(form.childNodes[0], ${select})`);
            }else if(editKey == "ArrowDown"){
              var select = await Run("selection.start");
              NowEdit+=1
              if(NowEdit != editNum){
                await Edit(NowEdit, {
                  "str":text[NowEdit-FirstNum],
                  "style":"",
                  "getKey":true
                });
                if(select>text[NowEdit-FirstNum].length){
                  select=text[NowEdit-FirstNum].length
                }
                await Run(`getSelection().collapse(form.childNodes[0], ${select})`);
              }else{
                await Edit(editNum, {
                  "str":"",
                  "style":"",
                  "getKey":true
                });
                await Run(`getSelection().collapse(form.childNodes[0], 0)`);
              }
            }else if(editKey == "ArrowUp" && NowEdit!=FirstNum){
              var select = await Run("selection.start");
              NowEdit-=1
              await Edit(NowEdit, {
                "str":text[NowEdit-FirstNum],
                "style":"",
                "getKey":true
              });
              if(select>text[NowEdit-FirstNum].length){
                select=text[NowEdit-FirstNum].length
              }
              await Run(`getSelection().collapse(form.childNodes[0], ${select})`);
            }else if(editKey == "Enter"){
              var select = await Run("selection.start");
              await DelNode(editNum+1);
              await DelNode(editNum+1);
              await DelNode(editNum+1);
              await Edit(NowEdit, {
                "str":text[NowEdit-FirstNum].slice(0, select),
                "style":""
              });
              await Edit(NowEdit+1, {
                "str":text[NowEdit-FirstNum].slice(select),
                "style":"",
                "getKey":true
              });
              text.splice(NowEdit-FirstNum, 0, text[NowEdit-FirstNum].slice(0, select));
              NowEdit+=1;
              editNum+=1;
              text[NowEdit-FirstNum]=text[NowEdit-FirstNum].slice(select);
              for(var n=NowEdit+1;n<editNum;n++){
                await Edit(n, {
                  "str":text[n-FirstNum],
                  "style":""
                });
              }
              await Print([{
                "str":"",
                "style":"",
                "edit":true
              }]);
              await Print([{
                "str":"save",
                "style":(sqNum===0)? "color:green":"",
                "edit":true
              },{
                "str":" save&quit ",
                "style":(sqNum===1)? "color:green":"",
                "edit":true
              },{
                "str":"quit",
                "style":(sqNum===2)? "color:green":"",
                "edit":true
              }]);
              await Run(`getSelection().collapse(form.childNodes[0], 0)`);
            }else if(editKey == "Backspace"){
              var select = await Run("selection.start");
              if(select === 0 && NowEdit!=FirstNum){
                select = text[NowEdit-FirstNum-1].length
                await DelNode(editNum);
                await DelNode(editNum);
                await DelNode(editNum);
                await DelNode(editNum);
                NowEdit-=1;
                editNum-=1;
                await Edit(NowEdit, {
                  "str":text[NowEdit-FirstNum]+text[NowEdit-FirstNum+1],
                  "style":"",
                  "getKey":true
                });
                text.splice(NowEdit-FirstNum, 2, text[NowEdit-FirstNum]+text[NowEdit-FirstNum+1]);
                for(var n=NowEdit+1;n<editNum;n++){
                  await Edit(n, {
                    "str":text[n-FirstNum],
                    "style":""
                  });
                }
                await Edit(editNum, {
                  "str":"",
                  "style":""
                });
                await Print([{
                  "str":"save",
                  "style":(sqNum===0)? "color:green":"",
                  "edit":true
                },{
                  "str":" save&quit ",
                  "style":(sqNum===1)? "color:green":"",
                  "edit":true
                },{
                  "str":"quit",
                  "style":(sqNum===2)? "color:green":"",
                  "edit":true
                }]);
                await Run(`getSelection().collapse(form.childNodes[0], ${select})`);
              }
            }
            await Run("selection=getSelect();");
          }
        }
      }
      await EndGetKey();
      for(var n=FirstNum;n<editNum+4;n++){
        await DelNode(FirstNum);
      }
    }
  }else{
    result.push({
      "str":"editor [file path] : you can edit file.",
      "style":""
    });
  }
  return result;
})()
