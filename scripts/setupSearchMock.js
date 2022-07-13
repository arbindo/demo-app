var axios = require('axios');
var authenticate = require('./auth');
var FormData = require('form-data');

module.exports = async (xsrfToken, token) => {
    var data = new FormData();
    data.append('name', 'Starfleet mock');
    data.append('description', 'Mock for starfleet search api');
    data.append('route', '/search');
    data.append('statusCode', '200');
    data.append('httpMethod', 'POST');
    data.append('queryParams', '');
    data.append('requestHeader', '');
    data.append('responseContentType', 'application/json');
    data.append('shouldDoExactHeaderMatching', 'false');
    data.append('requestBody', '{ "shipName": "x-wing" }');
    data.append('requestBodyType', 'application/json');
    data.append(
        'expectedTextResponse',
        `
    {

        "name": "X-wing",
        "model": "T-65 X-wing",
        "manufacturer": "Incom Corporation",
        "cost_in_credits": "149999",
        "length": "12.5",
        "max_atmosphering_speed": "1050",
        "crew": "1",
        "passengers": "0",
        "cargo_capacity": "110",
        "consumables": "1 week",
        "hyperdrive_rating": "1.0",
        "MGLT": "100",
        "starship_class": "Starfighter",
        "image": "http://localhost:8080/starwars/images/6/60/Xwing-SWB.jpg/revision/latest/scale-to-width-down/2000?cb=20160704070524"
    }
    `
    );
    data.append('responseHeaders', '{"owner": "The rebel alliance"}');

    var config = {
        method: 'post',
        url: 'http://localhost:8080/api/mimock/v1/mocks',
        headers: {
            Authorization: 'Bearer ' + token,
            'X-XSRF-TOKEN': xsrfToken,
            Cookie: 'XSRF-TOKEN=' + xsrfToken,
            ...data.getHeaders(),
        },
        data: data,
        withCredentials: true,
    };

    return axios(config)
        .then(function (response) {
            console.log({ message: 'Mock created : ' + response.data.data.id });
        })
        .catch(function (error) {
            console.log(error.response.data);
        });
};
