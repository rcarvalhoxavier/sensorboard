const axios = require('axios');

class SensorBoardApi {
    static SaveMeasurement(measure) {
       //    return axios.post(urls.MAIN_URL + 'measuremente', measure);
       console.log(measure);
    }
}

module.exports = SensorBoardApi;