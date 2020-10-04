import { DateTimeResolver } from "graphql-scalars";
import { nexusPrisma } from "nexus-plugin-prisma";
import { makeSchema } from "@nexus/schema";
import * as typeDefs from "./graphql";
import { join } from "path";

export const schema = makeSchema({
  types: typeDefs,
  typegenAutoConfig: {
    sources: [
      {
        source: "@prisma/client",
        alias: "prisma",
      },
      {
        source: require.resolve("./context"),
        alias: "ContextModule",
      },
    ],
    contextType: "ContextModule.Context",
  },
  plugins: [
    nexusPrisma({
      experimentalCRUD: true,
    }),
  ],
  outputs: {
    typegen: join(__dirname, "..", "nexus-typegen.ts"),
    schema: join(__dirname, "..", "schema.graphql"),
  },
});
