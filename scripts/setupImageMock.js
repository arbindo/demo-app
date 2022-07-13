var axios = require('axios');
var FormData = require('form-data');
var fs = require('fs');

module.exports = async (xsrfToken, token) => {
    var data = new FormData();
    data.append('name', 'Starfleet image mock');
    data.append('description', 'Image mock for starfleet');
    data.append(
        'route',
        '/starwars/images/6/60/Xwing-SWB.jpg/revision/latest/scale-to-width-down/2000'
    );
    data.append('statusCode', '200');
    data.append('httpMethod', 'GET');
    data.append('responseContentType', 'image/webp');
    data.append('queryParams', 'cb=20160704070524');
    data.append('shouldDoExactHeaderMatching', 'false');
    data.append('requestBodyType', 'application/json');
    data.append('binaryFile', fs.createReadStream('./mock_image.webp'));

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
    };

    await axios(config)
        .then(function (response) {
            console.log({ message: 'Mock created : ' + response.data.data.id });
        })
        .catch(function (error) {
            console.log(error.response.data);
        });
};
