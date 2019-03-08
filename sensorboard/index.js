const sensorboardApi = require('./api/sensorboardApi');
const five = require('johnny-five');
const config = require('./config.json');

const nano = require('nano')('http://admin:admin@localhost:5984');
const board = new five.Board()
const db = nano.use('sensorboard');


console.log(config.sensors);


board.on('ready', () => {

    var sensors = config.sensors.map(createSensor);
    console.log(sensors);
    /*
    let rev;
    proximity.on("data", function () {
        return (rev === undefined ?
            db.insert({ _id: this.id, id_sensor: this.id, id_client: '555555', type: 'proximity', value: this.cm })
            : db.insert({ _id: this.id, _rev: rev, id_sensor: this.id, id_client: '555555', type: 'proximity', value: this.cm }))
            .then((response) => {
                console.log("Proximity: " + this.id + " " + this.cm + " cm");
                console.log(response);
                rev = response.rev;
            })
    }) */

});

function createSensor(sensor) {
    switch (sensor.type) {
        case 'proximity':
            return createSensorProximity(sensor);
        default:
            return undefinedk
    }
}

function createSensorProximity(sensor) {
    var proximity =  new five.Proximity({
        controller: sensor.controller,
        pin: sensor.pin,
        freq: sensor.freq
    });

    proximity.on("data", function () {
        sensorboardApi.SaveMeasurement({ _id: sensor.id,  id_sensor: this.id, id_client: sensor.id_client, type: 'proximity', value: this.cm });        
    })

    return proximity;

}