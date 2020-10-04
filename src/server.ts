import { ApolloServer } from "apollo-server-express";
import { createContext } from "./context";
import { schema } from "./schema";
import express from "express";
import cors from "cors";

import { origin, port } from "../env";

const app = express();

app.use(cors({ credentials: true, origin }));
app.use(express.json());

const server = new ApolloServer({
  schema,
  context: createContext,
});

server.applyMiddleware({
  app,
  cors: false,
  path: "/graphql",
});

app.listen(port, () => {
  console.log(`🚀😏 GraphQL service ready at http://localhost:${port}/graphql`);
});
