// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-purple; icon-glyph: file-alt;
var ex = new ListWidget()
var stack = ex.addStack()
stack.layoutVertically()
stack.addText('You must write parameter to use this widget.')
stack.addText('To set a widget, write "xxx.js [width] [height]" (xxx.js must be a widget program)')
stack.addText('If you want to set parameter or widget family, write"yyy.js pf [width] [height] [parameter] [family]"')
stack.addText('p and f is optional, so you can also use only "p" or "f". And "fp" means same as "pf".')
stack.addText('You can arrange widgets. Usin "v()" or "h()", you can arrange them vertically or horizontally.')
ex.presentExtraLarge()