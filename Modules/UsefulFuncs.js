// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: light-gray; icon-glyph: filter;
module.exports.day = function(t, dayName){
	if(!dayName){
		var dayName = ['日', '月', '火', '水', '木', '金', '土']
	}
	return (t.getMonth()+1)+"/"+t.getDate()+" ("+dayName[t.getDay()]+")"
}

module.exports.objCheck = function(obj, list){
	var ans;
	for(var k=0;k<list.length;k++){
		if(obj[list[k]]){
			ans = obj[list[k]]
			obj = obj[list[k]]
		}else{
			ans = null
			break;
		}
	}
	return ans;
}

module.exports.objAdd = function(obj, list, element){
	for(var k=0;k<list.length-1;k++){
		if(!obj[list[k]]){
			obj[list[k]] = {}
		}
		obj = obj[list[k]]
	}
	obj[list[list.length-1]] = element
}

module.exports.timeToNum = function(time){
  if(time){
    var str = time.split(":")
    var hour = Number(str[0].trim())
    var minute = Number(str[1].trim())
    return hour*60 + minute
  }else{
    return null;
  }
}

module.exports.numToTime = function(num){
  if(num){
    var hour = Math.floor(num/60)
    var minute = num % 60
    return ("00"+hour).slice(-2) + ":" + ("00"+minute).slice(-2)
  }else{
    return ""
  }
}

module.exports.dayTimeSTR = function(time){
	return time.getFullYear() + "/" + (time.getMonth()+1) + "/" + time.getDate()
}

module.exports.dayStartTime = function(utf){
	if(!utf){
		var utf = Date.now()
	}
	var time = new Date(utf)
	var startTime = new Date(time.getFullYear(), time.getMonth(), time.getDate(), 0, 0)
	var ans = startTime.getTime()
	return ans;
}

module.exports.makeUITableRow = function(backgroundColor, height, cellSpacing, onSelect, dismissOnSelect, isHeader){
	var row = new UITableRow()
	if(backgroundColor)row.backgroundColor = backgroundColor;
	if(height)row.height = height;
	if(cellSpacing)row.cellSpacing = cellSpacing;
	if(onSelect)row.onSelect = onSelect;
	if(dismissOnSelect)row.dismissOnSelect = dismissOnSelect;
	if(isHeader)row.isHeader = isHeader;
	return row;
}

module.exports.makeUITableCellText = function(title, titleColor, titleFont, align, widthWeight, subtitle, subtitleColor, subtitleFont){
	var cell = UITableCell.text(title, subtitle)
	if(titleColor)cell.titleColor = titleColor
	if(titleFont)cell.titleFont = titleFont
	if(subtitleColor)cell.subtitleColor = subtitleColor
	if(subtitleFont)cell.subtitleFont = subtitleFont
	if(widthWeight)cell.widthWeight = widthWeight
	switch(align){
		case "right":
		case 0:
			cell.rightAligned()
			break;
		case "center":
		case 1:
			cell.centerAligned()
			break;
		case "left":
		case 2:
			cell.leftAligned()
			break;
	}
	return cell;
}

module.exports.makeUITableCellButton = function(title, titleFont, align, onTap, dismissOnTap, widthWeight){
	var cell = UITableCell.button(title)
	if(titleFont)cell.titleFont = titleFont
	if(onTap)cell.onTap = onTap
	if(dismissOnTap)cell.dismissOnTap = dismissOnTap
	if(widthWeight)cell.widthWeight = widthWeight
	switch(align){
		case "right":
		case 0:
			cell.rightAligned()
			break;
		case "center":
		case 1:
			cell.centerAligned()
			break;
		case "left":
		case 2:
			cell.leftAligned()
			break;
	}
	return cell;
}