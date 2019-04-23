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
            client.write(message);
        });
    }
};
// confirmScan(31000, "192.168.0.41");
// client.on('data', function(data) {
//     console.log('Received: ' + data);
//     client.destroy(); // kill client after server's response
// });

// var io = require('socket.io-client');
// console.log("1");
// var socket = io.connect('http://10.200.9.94:31000');
// console.log("2");
// var mess = [];
// console.log("3");
// mess.push(
//     type = "text/json",
//     encoding = "utf-8",
//     content = "lalala"
// );
// console.log("4");
// socket.send(mess);
// console.log("5");
// socket.close();
// console.log("6");
// var io = require('socket.io-client');
// var socket = io.connect('http://localhost:65432', {reconnect: true});

// // Add a connect listener
// socket.on('connect', function (socket) {
//     console.log('Connected!');
// });
// socket.emit('CH01', 'me', 'test msg');

// var io = require('socket.io-client'),
// socket = io.connect('http://localhost:65432');
// socket.on('connect', function () { console.log("socket connected"); });
// socket.emit('private message', { user: 'me', msg: 'whazzzup?' });

// const spawn = require("child_process").spawn;
// const pythonProcess = spawn('py', ["MainScanned.py", "10.200.9.94", "31000", "Scanned"]);


// const path = require('path')
// const {spawn} = require('child_process')

// // /**
// //  * Run python script, pass in `-u` to not buffer console output 
// //  * @return {ChildProcess}
// //  */
// function runScript(){
//   return spawn('py', [
//     "-u", 
//     path.join(__dirname, "MainScanned.py"),
//     "192.168.0.41", "31000", "Scanned"
//   ]);
// }

// const subprocess = runScript()

// // print output of script
// subprocess.stdout.on('data', (data) => {
//   console.log(`data:${data}`);
// });
// subprocess.stderr.on('data', (data) => {
//   console.log(`error:${data}`);
// });
// subprocess.stderr.on('close', () => {
//   console.log("Closed");
// });