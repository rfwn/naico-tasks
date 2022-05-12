const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema");

class Server {
  constructor(port) {
    this.port = port;
    this.app = express();
  }

  start() {
    this.app.use(
      "/graphql",
      graphqlHTTP({
        schema,
        graphiql: true,
      })
    );

    this.app.listen(this.port, () => {
      console.log(`Server started on port ${this.port}`);
    });
  }
}

module.exports = new Server(4000);