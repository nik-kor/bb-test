const { createServer } = require('../lib/server');

createServer({
    port: 3002,
    srvName: 'SRV2(with username)',
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
