var attacher = require('./index');

// write 40 bytes as uint32
var bin = new ArrayBuffer(80);
var dv = new DataView(bin);

var num = 0;
for(var i = 0; i < 80; i+=4) {
	dv.setUint32(i, num++, true);
}

var stringForAttach = "Helloworld";
console.log('Before attached byteLength: ' + bin.byteLength);				// Before attached byteLength: 80
var attachedBin = attacher.attachStringToBinary(bin, stringForAttach);
console.log('After attached byteLength: ' + attachedBin.byteLength);		// After attached byteLength: 101

var extractedStr = attacher.extractStringFromBinary(attachedBin);
console.log('Extracted string: ' + extractedStr);							// Extracted string: Helloworld

var detachedBin = attacher.detachStringFromBinary(attachedBin);
console.log('After detached byteLength: ' + detachedBin.byteLength);		// After detached byteLength: 80

var uint32Array = new Uint32Array(detachedBin);
console.log(uint32Array);													// Uint32Array [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19 ]