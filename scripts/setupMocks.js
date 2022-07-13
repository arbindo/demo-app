const setupImageMock = require('./setupImageMock');
const setupSearchMock = require('./setupSearchMock');
const authenticate = require('./auth');
const axios = require('axios');

const setupMocks = async () => {
    let isServiceUp = false;
    let retryAttempts = 0;
    while (!isServiceUp && retryAttempts < 60) {
        try {
            console.log(
                retryAttempts
                    ? 'Retrying attempt - ' + retryAttempts
                    : 'Checking service status'
            );
            await axios.get('http://localhost:8080/api/mimock/monitoring');
            isServiceUp = true;
        } catch (e) {
            console.log('Waiting for service to start...');
            retryAttempts++;
            await new Promise((resolve) => setTimeout(resolve, 1000));
        }
    }

    if (!isServiceUp) {
        throw new Error('Service did not start');
    }

    const { xsrfToken, token } = await authenticate();

    await setupImageMock(xsrfToken, token);
    await setupSearchMock(xsrfToken, token);
};

setupMocks();
