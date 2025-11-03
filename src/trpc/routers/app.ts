import { z } from "zod";
import { baseProcedure, createTRPCRouter } from "../init";
import { userRouter } from "./user";

export const appRouter = createTRPCRouter({
  user: userRouter,
  hello: baseProcedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query((opts) => {
      return {
        greeting: `hello ${opts.input.text}`,
      };
    }),
});

export type AppRouter = typeof appRouter;
