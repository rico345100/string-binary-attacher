var attacher = require('./index');

// write 20 bytes
var bin = new ArrayBuffer(20);
var dv = new DataView(bin);

for(var i = 0; i < 20; i++) {
	dv.setUint8(i, i);
}

var stringForAttach = "Helloworld";
console.log('Before attached byteLength: ' + bin.byteLength);				// Before attached byteLength: 20
var attachedBin = attacher.attachStringToBinary(bin, stringForAttach);
console.log('After attached byteLength: ' + attachedBin.byteLength);		// After attached byteLength: 41

var extractedStr = attacher.extractStringFromBinary(attachedBin);
console.log('Extracted string: ' + extractedStr);							// Extracted string: Helloworld

var detachedBin = attacher.detachStringFromBinary(attachedBin);
console.log('After detached byteLength: ' + detachedBin.byteLength);		// After detached byteLength: 20

var uint8Array = new Uint8Array(detachedBin);
console.log(uint8Array);													// Uint8Array [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19 ]