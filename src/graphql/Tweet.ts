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
        id: intArg({ required: true }),
      },
      async resolve(_root, _args, ctx) {
        return await ctx.prisma.tweet.findOne({
          where: {
            id: _args.id,
          },
        });
      },
    });
  },
});
