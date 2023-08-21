// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: gray; icon-glyph: expand;
module.exports = (family, widget) => {
	var screenSize = Device.screenSize();
	if(screenSize.height < screenSize.width){
		var screenSTR = screenSize.height+"×"+screenSize.width
	}else{
	  var screenSTR = screenSize.width+"×"+screenSize.height
	}
	var sizes = {
		"1192×1590":{
			"small":new Size(188, 188),
			"medium":new Size(412, 188),
			"large":new Size(412, 412),
			"extraLarge":new Size(860, 412)
		},
		"1024×1366":{
			"small":new Size(170, 170),
			"medium":new Size(378.5, 170),
			"large":new Size(378.5, 378.5),
			"extraLarge":new Size(795, 378.5)
		},
		"970×1389":{
			"small":new Size(162, 162),
			"medium":new Size(350, 162),
			"large":new Size(350, 350),
			"extraLarge":new Size(726, 350)
		},
		"954×1373":{
			"small":new Size(162, 162),
			"medium":new Size(350, 162),
			"large":new Size(350, 350),
			"extraLarge":new Size(726, 350)
		},
		"834×1194":{
			"small":new Size(155, 155),
			"medium":new Size(342, 155),
			"large":new Size(342, 342),
			"extraLarge":new Size(715.5, 342)
		},
		"834×1112":{
			"small":new Size(150, 150),
			"medium":new Size(327.5, 150),
			"large":new Size(327.5, 327.5),
			"extraLarge":new Size(682, 327.5)
		},
		"820×1180":{
			"small":new Size(155, 155),
			"medium":new Size(342, 155),
			"large":new Size(342, 342),
			"extraLarge":new Size(715.5, 342)
		},
		"810×1080":{
			"small":new Size(146, 146),
			"medium":new Size(320.5, 146),
			"large":new Size(320.5, 320.5),
			"extraLarge":new Size(669, 320.5)
		},
		"744×1133":{
			"small":new Size(141, 141),
			"medium":new Size(305.5, 141),
			"large":new Size(305.5, 305.5),
			"extraLarge":new Size(634.5, 305.5)
		},
		"768×1024":{
			"small":new Size(141, 141),
			"medium":new Size(305.5, 141),
			"large":new Size(305.5, 305.5),
			"extraLarge":new Size(634.5, 305.5)
		},
		"430×932":{
			"small":new Size(170, 170),
			"medium":new Size(364, 170),
			"large":new Size(364, 382),
			"accessoryCircular":new Size(76, 76),
			"accessoryRectangular":new Size(172, 76),
			"accessoryInline":new Size(257, 26)
		},
		"428×926":{
			"small":new Size(170, 170),
			"medium":new Size(364, 170),
			"large":new Size(364, 382),
			"accessoryCircular":new Size(76, 76),
			"accessoryRectangular":new Size(172, 76),
			"accessoryInline":new Size(257, 26)
		},
		"414×896":{
			"small":new Size(169, 169),
			"medium":new Size(360, 169),
			"large":new Size(360, 379),
			"accessoryCircular":new Size(76, 76),
			"accessoryRectangular":new Size(160, 72),
			"accessoryInline":new Size(248, 26)
		},
		"414×736":{
			"small":new Size(159, 159),
			"medium":new Size(348, 157),
			"large":new Size(348, 357),
			"accessoryCircular":new Size(76, 76),
			"accessoryRectangular":new Size(170, 76),
			"accessoryInline":new Size(248, 26)
		},
		"393×852":{
			"small":new Size(158, 158),
			"medium":new Size(338, 158),
			"large":new Size(338, 354),
			"accessoryCircular":new Size(72, 72),
			"accessoryRectangular":new Size(160, 72),
			"accessoryInline":new Size(234, 26)
		},
		"390×844":{
			"small":new Size(158, 158),
			"medium":new Size(338, 158),
			"large":new Size(338, 354),
			"accessoryCircular":new Size(72, 72),
			"accessoryRectangular":new Size(160, 72),
			"accessoryInline":new Size(234, 26)
		},
		"375×812":{
			"small":new Size(155, 155),
			"medium":new Size(329, 155),
			"large":new Size(329, 345),
			"accessoryCircular":new Size(72, 72),
			"accessoryRectangular":new Size(157, 72),
			"accessoryInline":new Size(157, 72)
		},
		"375×667":{
			"small":new Size(148, 148),
			"medium":new Size(321, 148),
			"large":new Size(321, 324),
			"accessoryCircular":new Size(68, 68),
			"accessoryRectangular":new Size(153, 68),
			"accessoryInline":new Size(225, 26)
		},
		"360×780":{
			"small":new Size(155, 155),
			"medium":new Size(329, 155),
			"large":new Size(329, 345),
			"accessoryCircular":new Size(72, 72),
			"accessoryRectangular":new Size(157, 72),
			"accessoryInline":new Size(225, 26)
		},
		"320×568":{
			"small":new Size(141, 141),
			"medium":new Size(292, 141),
			"large":new Size(292, 311)
		}
	}
	if(widget === undefined || widget.presentSmall !== undefined){
	  return sizes[screenSTR][family]
	}else{
		return widget.size
	}
}