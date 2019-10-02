var ShareJS, ShareJSOpts, connect, port, server;

connect = require('connect');

ShareJS = require('share').server;

ShareJSOpts = {
  browserChannel: {
    cors: "*"
  },
  db: {
    type: "none"
  }
};

server = connect();

server.use(connect['static'](__dirname + "/static"));

ShareJS.attach(server, ShareJSOpts);

port = 5000;

server.listen(port, function() {
  return console.log("Listening on " + port);
});
