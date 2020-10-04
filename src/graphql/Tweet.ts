import { objectType, extendType, stringArg, intArg } from "@nexus/schema";

export const Tweet = objectType({
  name: "Tweet",
  definition(t) {
    t.model.id();
    t.model.tweet_content();
    t.model.positive();
    t.model.negative();
  },
});
