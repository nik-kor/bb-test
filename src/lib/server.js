const Hapi = require('hapi');
const good = require('good');

module.exports.createServer = ({ srvName, port, routes }) => {
    const server = new Hapi.Server();

    server.connection({ port });

    server.register(
        [
            {
                register: good,
                options: {
                    reporters: {
                        myConsoleReporter: [
                            {
                                module: 'good-squeeze',
                                name: 'Squeeze',
                                args: [{ log: '*', response: '*' }],
                            },
                            {
                                module: 'good-console',
                            },
                            'stdout',
                        ],
                    },
                },
            },
        ]
    );

    routes.forEach(r => {
        server.route(r);
    });

    server.start(err => {
        if (err) {
            throw new Error(err);
        }

        console.log(`Running ${srvName} on ${port}`);
    });
};
