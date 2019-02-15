// const config = require('config');
const { createServer } = require('../lib/server');
const jwt = require('jsonwebtoken');
const axios = require('axios');

createServer({
    port: 3000,
    srvName: 'GW',
    routes: [
        {
            method: 'GET',
            path: '/hello',
            handler: async (req, reply) => {
                const authHeader = req.headers.authorization;

                if (typeof authHeader !== 'undefined' && /Bearer (.*)/.test(authHeader)) { // srv2
                    const token = /Bearer (.*)/.exec(authHeader)[1];
                    const decoded = jwt.decode(token);
                    const { data: { message } } = await axios.get(`http://localhost:3002/hello?name=${decoded.name}`);

                    reply(message);
                } else { // srv1
                    const { data: { message } } = await axios.get('http://localhost:3001/hello');
                    reply(message);
                }
            },
        }
    ]
});
