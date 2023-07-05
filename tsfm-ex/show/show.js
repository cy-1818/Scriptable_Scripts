return (async function(){
  var result = [];
  if(parameter[0] && parameter[0]!="-h"){
    var showOptions={}
    showOptionLoop:for(var n=0;n<parameter.length;n++){
      switch(parameter[n]){
        case "-n":
          showOptions.n = true;
        break;
        case "-b":
          showOptions.b = true;
        break;
        case "-s":
          showOptions.s = true;
        break;
        case "-E":
          showOptions.E = true;
        break;
        case "-S":
          n+=1;
          showOptions.S = parameter[n];
        break;
        case "-C":
          n+=1;
          showOptions.C = parameter[n];
        break;
        case "-d":
          showOptions.d = true;
          showOptions.str = parameter.slice(n+1)
          break showOptionLoop;
        case "-c":
          showOptions.d = false;
          showOptions.str = parameter.slice(n+1)
          break showOptionLoop;
        default:
          if(f.fileExists(formatPath(parameter[n], pass))){
            showOptions.d = true;
          }else{
            showOptions.d = false;
          }
          showOptions.str = parameter.slice(n);
          break showOptionLoop;
      }
    }
    if(showOptions.d){
      var strList = [];
      var showPass;
      for(var n=0;n<showOptions.str.length;n++){
        showPass = formatPath(showOptions.str[n], pass);
        if(f.fileExists(showPass)){
          if(f.isDirectory(showPass)){
            strList.push(showOptions.str[n]+" is directory");
            strList.push("");
          }else{
            strList = strList.concat(f.readString(showPass).split("\n"));
            strList.push("");
          }
        }else{
          strList.push(showOptions.str[n]+" was undefined");
          strList.push("");
        }
      }
    }else{
      var strList = showOptions.str;
    }
    if(showOptions.S){
      for(var n=0;n<strList.length;n++){
        if(!strList[n].includes(showOptions.S)){
          strList.splice(n,1);
          n-=1;
        }
      }
    }
    if(showOptions.s){
      for(var n=0;n<strList.length;n++){
        if((!strList[n])&&(!strList[n-1])){
          strList.splice(n,1);
          n-=1;
        }
      }
    }
    if(showOptions.E){
      for(var n=0;n<strList.length;n++){
        strList[n]+="$";
      }
    }
    if(!strList[strList.length-1]){
      strList.pop();
    }
    var showColor = "";
    var showNum = 1;
    var numlen = String(strList.length).length
    if(showOptions.C){
      showColor="color:"+showOptions.C+";"
    }
    for(var n=0;n<strList.length;n++){
      if(showOptions.n || (showOptions.b && strList[n])){
        result.push({
          "tag":"pre",
          "style":"margin:0;padding:0;"+showColor,
          "str":(Array(numlen).join(' ')+showNum).slice(-numlen)+" "+strList[n]
        })
        showNum+=1;
      }else{
        result.push({
          "tag":"pre",
          "style":"margin:0;padding:0;"+showColor,
          "str":strList[n]+" "
        })
      }
    }
  }else{
    var text = `
-n          : show line number
-b          : show line number except empty line
-E          : add "$" the end of line
-s          : compress empty lines
-S [string] : search line including string
-C [color]  : set color
-d          : regard input as file path
-c          : regard input as string

if you didn't set -d or -c, this command will guess file path or string.
`.split("\n")
    for(var n=0;n<text.length;n++){
      result.push({
        "tag":"pre",
        "style":"display:block",
        "notPara":true,
        "str":text[n]
      })
    }
  }
  return result;
})()