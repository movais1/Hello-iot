
var sensorLib = require('node-dht-sensor');
sensorLib.initialize(11, 12);

var Gpio = require('onoff').Gpio,

sensor = new Gpio(17, 'in', 'both');
led = new Gpio(4, 'out');
sensor.watch(function (err, value) {
	if(err) throw(err);
	console.log(value ? 'Turn on Light' : 'Turn Off the light');
	led.writeSync(value);
	read();
});
function read(){
var readout =sensorLib.read();
console.log('Temperature: ' + readout.temperature.toFixed(2) + 'C, ' + ' humidity: ' + readout.humidity.toFixed(2) + '%');
} 

function exit(err){
if (err) console.log('Error' + err);
sensor.unexport();
led.unexport();
console.log('bye')
process.exit();
}
process.on('SIGINT', exit);
