// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: gray; icon-glyph: cogs;
module.exports.load = function(){
	Error("Override settingUI module's load function!'")
}

module.exports.ToggleButton = function(name, obj){
	return async function(){
		var ind = obj.indexOf(name)
		if(ind == -1){
			obj.push(name)
		}else{
			obj.splice(ind, 1)
		}
		await module.exports.load()
	}
}

module.exports.AskText = function(obj, key, newText, name, func){
	if(!newText)newText = "newText"
	if(!name)name = key
	if(!func)func = String
	var th = this
	return async function(){
		var a = new Alert()
		a.message = newText
		a.addTextField(name, obj[key])
		await a.present()
		obj[key] = func(a.textFieldValue(0))
		await th.load()
	}
}

module.exports.NumEditor = function(obj, key, row, font, color, leftDoubleArrow, leftArrow, rightArrow, rightDoubleArrow, smallNum, bigNum, min, max, func){
	if(!font)font = new Font("Symbol", 10);
	if(!color)color = Color.black()
	if(!leftDoubleArrow)leftDoubleArrow="<<";
	if(!leftArrow)leftArrow="<";
	if(!rightArrow)rightArrow=">";
	if(!rightDoubleArrow)rightDoubleArrow=">>";
	if(!smallNum)smallNum = 1
	if(!bigNum)bigNum = 10
	if(!min)min = -100
	if(!max)max = 100
	if(!func)func=function(){return 0}
	var numEditorLeftDoubleArrow = UITableCell.button(leftDoubleArrow)
	var numEditorLeftArrow = UITableCell.button(leftArrow)
	var numEditorCenter = UITableCell.text(String(obj[key]))
	var numEditorRightArrow = UITableCell.button(rightArrow)
	var numEditorRightDoubleArrow = UITableCell.button(rightDoubleArrow)
	numEditorLeftDoubleArrow.titleFont = font
	numEditorLeftArrow.titleFont = font
	numEditorCenter.titleFont = font
	numEditorRightArrow.titleFont = font
	numEditorRightDoubleArrow.titleFont = font
	numEditorCenter.titleColor = color
	numEditorLeftDoubleArrow.onTap = this.NumEditorOnTap(obj, key, -bigNum, min, max, func)
	numEditorLeftArrow.onTap = this.NumEditorOnTap(obj, key, -smallNum, min, max, func)
	numEditorRightArrow.onTap = this.NumEditorOnTap(obj, key, smallNum, min, max, func)
	numEditorRightDoubleArrow.onTap = this.NumEditorOnTap(obj, key, bigNum, min, max, func)
	row.addCell(numEditorLeftDoubleArrow)
	row.addCell(numEditorLeftArrow)
	row.addCell(numEditorCenter)
	row.addCell(numEditorRightArrow)
	row.addCell(numEditorRightDoubleArrow)
}

module.exports.NumEditorOnTap = function(obj, key, num, min, max, func){
	var th = this
	return async function(){
		var newNum = obj[key]+num
		if(newNum<min){
			newNum = min
		}else if(newNum>max){
			newNum = max
		}
		obj[key] = newNum
		await func(obj, key)
		await th.load()
	}
}

module.exports.ColorEditor = function(obj, key, row, font, leftDoubleArrow, leftArrow, rightArrow, rightDoubleArrow){
	var nowColor = obj[key]
	var flag = false
	if(typeof(nowColor)=="string"){
		nowColor = new Color(nowColor)
		flag = true
	}
	var colorObj = {
		"red":nowColor.red*255,
		"green":nowColor.green*255,
		"blue":nowColor.blue*255
	}
	var colorNames = ["red", "green", "blue"]
	for(var n=0;n<3;n++){
		this.NumEditor(colorObj, colorNames[n], row, font, Color[colorNames[n]](), leftDoubleArrow, leftArrow, rightArrow, rightDoubleArrow, 1, 10, 0, 255, (function(cobj, ckey, cflag){
			return function(nobj, nkey){
				newColor = "#" + nobj.red.toString(16).padStart(2, "0") + nobj.green.toString(16).padStart(2, "0") + nobj.blue.toString(16).padStart(2, "0")
				if(cflag){
					cobj[ckey] = newColor
				}else{
					cobj[ckey] = new Color(newColor)
				}
			}
		})(obj, key, flag))
	}
}

module.exports.AskSelection = async function(obj, key, options, message){
	if(!message)message = "selection"
	var th = this
	return async function(){
		var a = new Alert()
		a.message = message
		for(var n=0;n<options.length;n++){
			a.addAction(options[n])
		}
		var ans = await a.presentAlert()
		obj[key] = options[ans]
		await th.load()
	}
}

module.exports.SelectionUI = function(obj, key, options, ui, width, multi, font, bgcolor, checkBoxOn, checkBoxOff){
	if(!ui)ui = new UITable()
	if(!width)width = 3
	if(!multi)multi = false
	if(!font)font = new Font("Symbol", 10)
	if(!bgcolor)bgcolor = Color.black()
	if(!checkBoxOn)checkBoxOn="☑︎"
	if(!checkBoxOff)checkBoxOff="◻︎"
	if(Array.isArray(options)){
		var optionLen = options.length
		var optionObj = {}
		for(var j=0;j<optionLen;j++){
			optionObj[options[j]]=false
		}
	}else{
		var optionLen = Object.keys(options).length
		var optionObj = options
	}
	if(!multi && obj && key && optionObj[obj[key]]!==undefined){
		optionObj[obj[key]] = true
	}
	if(multi && Array.isArray(obj)){
		for(var j in optionObj){
			if(obj.includes(j)){
				optionObj[j]=true
			}else{
				optionObj[j]=false
			}
		}
	}
	var rows = []
	var num=0;
	for(var option in optionObj){
		if(num%width===0){
			var row = new UITableRow()
			if(Array.isArray(bgcolor)){
				var bg = bgcolor[(num/width)%bgcolor.length]
			}else{
				var bg = bgcolor
			}
			if(typeof(bg)=="string"){
				bg = new Color(bg)
			}
			row.backgroundColor = bg
			ui.addRow(row)
			rows.push(row)
		}
		var cell = UITableCell.button((optionObj[option] ? checkBoxOn : checkBoxOff) + option)
		cell.leftAligned()
		cell.titleFont = font
		cell.onTap = this.SelectionUIOnTap(obj, key, option, optionObj, !optionObj[option], multi)
		row.addCell(cell)
		num++;
	}
	return rows;
}

module.exports.SelectionUIOnTap = function(obj, key, option, optionObj, bool, multi){
	var th = this
	return async function(){
		if(multi){
			if(Array.isArray(obj)){
				if(bool){
					obj.push(option)
				}else{
					obj.splice(obj.indexOf(option), 1)
				}
			}
		}else{
			if(obj && key)obj[key]=option
			for(var k in optionObj){
				if(k!=option){
					optionObj[k]=false
				}
			}
		}
		optionObj[option] = bool
		await th.load()
	}
}
