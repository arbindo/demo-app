var axios = require('axios');

module.exports = () => {
    var data = JSON.stringify({
        userName: 'mimock_admin',
        password: 'password',
    });

    var config = {
        method: 'post',
        url: 'http://localhost:8080/api/mimock/v1/user/authenticate',
        headers: {
            'Content-Type': 'application/json',
        },
        data: data,
    };

    return axios(config)
        .then(function (response) {
            const token = response.data.token;

            return {
                token: response.data.token,
                xsrfToken: response.headers['set-cookie'][0]
                    .split('=')[1]
                    .split(';')[0],
            };
        })
        .catch(function (error) {
            console.log(error);
        });
};
