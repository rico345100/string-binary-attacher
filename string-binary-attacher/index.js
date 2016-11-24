"use strict";
(function() {
	function attachStringToBinary(buffer, string) {
		if(!buffer instanceof ArrayBuffer) {
			throw new Error('First argument must be an ArrayBuffer instance.');
		}
		else if(!string) {
			return buffer;
		}

		var dv = new DataView(buffer);

		// [0]: Length of string(literally, length of string, not byte length)
		// [1 ~ string length * 2]: String Data
		// [...After...]: Original Data
		var newBufferSize = 1 + (string.length * 2) + buffer.byteLength;
		var newBuffer = new ArrayBuffer(newBufferSize);
		var ndv = new DataView(newBuffer);
		ndv.setUint8(0, string.length, true);
		
		// write string as Uint16
		for(var i = 0; i < string.length; i++) {
			var offset = 1 + (i*2);
			ndv.setUint16(offset, string.charCodeAt(i), true);
		}

		// write rest of data
		for(var i = 0; i < buffer.byteLength; i++) {
			var offset = 1 + (string.length * 2) + i;
			ndv.setUint8(offset, dv.getUint8(i));
		}

		return newBuffer;
	}

	function detachStringFromBinary(buffer) {
		if(!buffer instanceof ArrayBuffer) {
			throw new Error('First argument must be an ArrayBuffer instance.');
		}

		var dv = new DataView(buffer);
		var strLen = dv.getUint8(0, true);
		var extraRange = 1 + strLen * 2;
		var newBuffer = new ArrayBuffer(buffer.byteLength - (extraRange));
		var ndv = new DataView(newBuffer);
		var idx = 0;

		for(var i = extraRange; i < buffer.byteLength; i++) {
			ndv.setUint8(idx++, dv.getUint8(i));
		}

		return newBuffer;
	}

	function extractStringFromBinary(buffer) {
		if(!buffer instanceof ArrayBuffer) {
			throw new Error('First argument must be an ArrayBuffer instance.');
		}

		var dv = new DataView(buffer);
		var strLen = dv.getUint8(0, true);
		var str = '';

		for(var i = 0; i < strLen; i++) {
			var offset = 1 + (i*2);
			str += String.fromCharCode(dv.getUint16(offset, true));
		}

		return str;
	}

	// CommonJS
	if (typeof exports === "object" && typeof module !== "undefined") {
		module.exports = {
			attachStringToBinary: attachStringToBinary,
			detachStringFromBinary: detachStringFromBinary,
			extractStringFromBinary: extractStringFromBinary
		};
	}
	// RequireJS
	else if (typeof define === "function" && define.amd) {
		define(['attachStringToBinary'], attachStringToBinary);
		define(['detachStringFromBinary'], detachStringFromBinary);
		define(['extractStringFromBinary'], extractStringFromBinary);
	}
	else {
		var g;

		if (typeof window !== "undefined") {
			g = window;
		}
		else if (typeof global !== "undefined") {
			g = global;
		}
		else if (typeof self !== "undefined") {
			g = self;
		}

		g.attachStringToBinary = attachStringToBinary;
		g.detachStringFromBinary = detachStringFromBinary;
		g.extractStringFromBinary = extractStringFromBinary;
	}
})();