var net = require('net');
var struct = require('python-struct');


module.exports = {
    confirmScan: function (port, ipv4) {
        var content = '"Scanned"';

        var jsonHeader = {
            'byteorder': 'little',
            'content-type': 'text/json',
            'content-encoding': 'utf-8',
            'content-length': content.length
        };
        
        var jsonHeaderBytes = JSON.stringify(jsonHeader);
        var messageHeader = struct.pack('>H', jsonHeaderBytes.length);
        
        message = messageHeader + jsonHeaderBytes + content;
        
        var client = new net.Socket();

        client.connect(port, ipv4, function () {
            console.log('Connected');
        })
        .on("error", (err) => {
            console.log('not Connected');
            console.log(err);
        })
        .on('connect', (conn) => {
            console.log('sending message');
            client.write(message);
        })
        
    }
};