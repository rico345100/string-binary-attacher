# string-binary-attacher
string-binary-attacher is module for sending extra strings as binary with arraybuffer.

## Why should I use this?
Let's assume that you want to send some binary data to the othercomputer.
In JavaScript, you can send them with WebSocket or XHR as ArrayBuffer.
But if you want to send some kind of metadata, you should send the data as string seperately.
It means you need to extra request for sending metadata.
In JavaScript, string is not a binary data, and internally it is 16bit characters.
So theoretically, you can send string as binary.
So, back to the point, if you can send some string with binary data once, you can actually save the overhead of calling 2 or more request.
This module is designed for that purpose, convert JavaScript string to Uint16 data and combine with specified ArrayBuffer.
You can easily attach or detach string as binary with providing methods from this module.


## API
### ArrayBuffer attachStringToBinary(ArrayBuffer buffer, String string)
Attach specified string to specified buffer. Returns new ArrayBuffer.

```javascript
var attacher = require('string-binary-attacher');

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
```

### ArrayBuffer detachStringFromBinary(ArrayBuffer buffer)
Detach attached string from ArrayBuffer. Make sure that the buffer in argument is result of attachStringToBinary. Returns new ArrayBuffer.

```javascript
var attacher = require('string-binary-attacher');

// write 20 bytes
var bin = new ArrayBuffer(20);
var dv = new DataView(bin);

for(var i = 0; i < 20; i++) {
	dv.setUint8(i, i);
}

var stringForAttach = "Helloworld";
var attachedBin = attacher.attachStringToBinary(bin, stringForAttach);
var detachedBin = attacher.detachStringFromBinary(attachedBin);

var uint8Array = new Uint8Array(detachedBin);
console.log(uint8Array);													// Uint8Array [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19 ]
```

### String extractStringFromBinary(ArrayBuffer buffer)
Extract attached string from ArrayBuffer. Make sure that the buffer in argument is result of attachStringToBinary. Returns extracted string.

```javascript
var attacher = require('string-binary-attacher');

// write 20 bytes
var bin = new ArrayBuffer(20);
var dv = new DataView(bin);

for(var i = 0; i < 20; i++) {
	dv.setUint8(i, i);
}

var stringForAttach = "Helloworld";
var attachedBin = attacher.attachStringToBinary(bin, stringForAttach);

var extractedStr = attacher.extractStringFromBinary(attachedBin);
console.log('Extracted string: ' + extractedStr);						// Extracted string: Helloworld		
```

## License
MIT License. Free to use!

### P.S.
Note that converted and attached string as binary is written as big-endian. Most of time, you don't need know about this, but if you want to manipulate those binary data manually, you have to convert it to suitable endianness.