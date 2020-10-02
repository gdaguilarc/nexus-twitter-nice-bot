import { makeSchema } from "@nexus/schema";
import { join } from "path";
import * as typeDefs from "./graphql";
import { nexusPrisma } from "nexus-plugin-prisma";

export const schema = makeSchema({
  types: typeDefs,
  typegenAutoConfig: {
    sources: [
      {
        source: require.resolve(".prisma/client/index.d.ts"),
        alias: "prisma",
      },
      {
        source: require.resolve("./context"),
        alias: "ContextModule",
      },
    ],
    contextType: "ContextModule.Context",
  },
  plugins: [nexusPrisma()],
  outputs: {
    typegen: join(__dirname, "..", "nexus-typegen.ts"),
    schema: join(__dirname, "..", "schema.graphql"),
  },
});
