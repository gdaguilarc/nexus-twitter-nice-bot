import { objectType, extendType, stringArg, intArg } from "@nexus/schema";

export const Tweet = objectType({
  name: "Tweet",
  definition(t) {
    t.model.id();
    t.model.Content();
    t.model.Negative();
    t.model.Positive();
  },
});

export const TweetQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("getAllTweet", {
      nullable: false,
      type: "Tweet",
      list: true,
      async resolve(_root, _args, ctx) {
        return await ctx.prisma.tweet.findMany();
      },
    });
    t.field("getTweet", {
      nullable: true,
      type: "Tweet",
      args: {
        id: stringArg({ required: true }),
      },
      async resolve(_root, _args, ctx) {
        return await ctx.prisma.tweet.findOne({
          where: {
            id: _args.id,
          },
        });
      },
    });
    t.field("countTweets", {
      nullable: true,
      type: "Int",
      async resolve(_root, _args, ctx) {
        return await ctx.prisma.tweet.count();
      },
    });
    t.field("countTweetsByWord", {
      nullable: true,
      type: "Int",
      args: {
        word: stringArg({ required: true }),
      },
      async resolve(_root, _args, ctx) {
        return await ctx.prisma.tweet.count({
          where: { Content: { contains: _args.word } },
        });
      },
    });
    t.field("countTweetsAggresive", {
      nullable: true,
      type: "Int",
      async resolve(_root, _args, ctx) {
        return await ctx.prisma.tweet.count({
          where: { Positive: 1 },
        });
      },
    });
    t.field("countTweetsNotAggresive", {
      nullable: true,
      type: "Int",
      async resolve(_root, _args, ctx) {
        return await ctx.prisma.tweet.count({
          where: { Negative: 1 },
        });
      },
    });
  },
});
