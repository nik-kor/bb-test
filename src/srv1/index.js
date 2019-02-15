const { createServer } = require('../lib/server');
const jwt = require('jsonwebtoken');

createServer({
    port: 3001,
    srvName: 'SRV1',
    routes: [
        {
            method: 'GET',
            path: '/hello',
            handler: (_, reply) => {
                reply({ message: 'hello world' });
            },
        }
    ]
});
