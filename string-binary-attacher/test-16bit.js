var attacher = require('./index');

// write 40 bytes as uint16
var bin = new ArrayBuffer(40);
var dv = new DataView(bin);

var num = 0;
for(var i = 0; i < 40; i+=2) {
	dv.setUint16(i, num++, true);
}

var stringForAttach = "Helloworld";
console.log('Before attached byteLength: ' + bin.byteLength);				// Before attached byteLength: 40
var attachedBin = attacher.attachStringToBinary(bin, stringForAttach);
console.log('After attached byteLength: ' + attachedBin.byteLength);		// After attached byteLength: 61

var extractedStr = attacher.extractStringFromBinary(attachedBin);
console.log('Extracted string: ' + extractedStr);							// Extracted string: Helloworld

var detachedBin = attacher.detachStringFromBinary(attachedBin);
console.log('After detached byteLength: ' + detachedBin.byteLength);		// After detached byteLength: 40

var uint16Array = new Uint16Array(detachedBin);
console.log(uint16Array);													// Uint16Array [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19 ]