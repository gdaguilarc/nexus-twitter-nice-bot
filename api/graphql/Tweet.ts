import { objectType, extendType, stringArg } from "@nexus/schema";

export const Tweet = objectType({
  name: "Tweet",
  definition(t) {
    t.model.id();
    t.model.tweet_content();
    t.model.positive();
    t.model.negative();
  },
});

export const TweetQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("tweet", {
      nullable: false,
      type: "Tweet",
      list: true,
      resolve(_root, _args, ctx) {
        return ctx.db.tweet.findMany({ where: { positive: 1 } });
      },
    });
  },
});

export const TweetMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("addTweet", {
      type: "Tweet",
      nullable: false,
      args: {
        tweet_content: stringArg({ required: true }),
      },
      resolve(_root, args, ctx) {
        const tweet = {
          tweet_content: args.tweet_content,
          positive: 1,
          negative: 0,
        };
        return ctx.db.tweet.create({ data: tweet });
      },
    });
  },
});
