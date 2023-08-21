// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: light-gray; icon-glyph: code;
module.exports = (str, nowPath, type) => {
	if(!str){
		str = nowPath.split("/").slice(0,-1).join("/");
	}else if(str.startsWith("/")){
		str = str
	}else if(str.startsWith("iCloud:")){
		type = "iCloud"
		str =  str.replace("iCloud:", "");
	}else if(str.startsWith("local:")){
		type = "local"
		str =  str.replace("local:","");
	}else {
		str = nowPath+"/"+str;
	}
	return ["path":str, "type":type];
}