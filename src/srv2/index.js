const { createServer } = require('../lib/server');

createServer({
    port: 3002,
    srvName: 'SRV2',
    routes: [
        {
            method: 'GET',
            path: '/hello',
            handler: (req, reply) => {
                reply({ message: `hello ${req.query.name}` });
            },
        }
    ]
});
