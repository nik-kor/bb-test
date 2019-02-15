// const config = require('config');
const { createServer } = require('../lib/server');
const jwt = require('jsonwebtoken');
const axios = require('axios');

const jwtSignKey = '123456'; // TODO hide secret

createServer({
    port: 3000,
    srvName: 'GW',
    routes: [
        {
            method: 'GET',
            path: '/hello',
            handler: async (req, reply) => {
                const authHeader = req.headers.authorization;
                const authRE = /Bearer (.*)/;

                if (typeof authHeader !== 'undefined' && authRE.test(authHeader)) { // srv2
                    const token = authRE.exec(authHeader)[1];
                    let userData;
                    try {
                        userData = jwt.verify(token, jwtSignKey);
                    } catch (e) {
                        console.log(e);

                        return reply(new Error('invalid token'));
                    }

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
