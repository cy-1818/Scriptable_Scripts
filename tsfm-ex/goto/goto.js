return(async function(){
  var goto = eval(await fmi.readString(doci+"/tsfm-ex/goto_interpreter.js"));
  var result = [];
  if(parameter[0]!="-h"&&parameter[0]!="-v"){
    if(parameter[0]=="-a"){
      goto.getInput=(async function(){
        var ans;
        var gotoNum = await Print([{
          "style":"",
          "str":">>>",
          "edit":true
        },{
          "style":"",
          "str":"",
          "edit":true,
          "getKey":true
        }])
        while(true){
          if(await KeyPressed()){
            if(await GetKey()=="Enter"){
              break;
            }
          }
        }
        ans = await GetText("keyForm");
        await Edit(gotoNum, {
          "style":"",
          "str":">>>"+ans
        });
        await EndGetKey();
        await DelNode(gotoNum-1);
        return ans;
      });
      goto.printOutput=(async function(obj){
        if(obj.type == "output"){
          await Print([{
            "style":"",
            "str":obj.text
          }]);
        }else{
          await Print([{
            "style":"color:#ff3333",
            "str":`${obj.type} on line ${obj.line} : ${obj.text}`
          }]);
        }
      });
      goto.End = (async function(){
        return "end";
      })
      goto.setUp=function(){
        this.values.limit=Infinity;
      }
      parameter.shift();
    }else{
      goto.getInput=(async function(){
        return this.input.shift();;
      })
      goto.input = parameter.slice(1);
    }
    var gotoProgram=await f.readString(formatPath(parameter[0], pass));
    var gotoOutput = await goto.main(gotoProgram);
    if(gotoOutput != "end"){
      for(var n=0;n<gotoOutput.length;n++){
        if(gotoOutput[n].type == "output"){
          result.push({
            "style":"display:block;",
            "str":gotoOutput[n].text
          });
        }else{
          result.push({
            "style":"color:#ff3333;display:block;",
            "str":`${gotoOutput[n].type} on line ${gotoOutput[n].line} : ${gotoOutput[n].text}`
          });
        }
      }
    }
  }else if(parameter[0]=="-h"){
    var text = `
goto [program file path] [parameters] : run goto program.
goto -a [program file path]           : run goto program asynchronously.
goto -h                               : show help document.
goto -v                               : show version.
`.split("\n")
    for(var n=0;n<text.length;n++){
      result.push({
        "style":"display:block",
        "tag":"pre",
        "str":text[n]
      });
    }
  }else{
    result.push({
      "style":"",
      "str":"1.3"
    });
  }
  return result;
})()