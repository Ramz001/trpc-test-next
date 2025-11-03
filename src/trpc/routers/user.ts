import { z } from "zod";
import { baseProcedure, createTRPCRouter } from "../init";
import { db } from "@/db/drizzle";
import { user } from "@/db/schema";

export const userRouter = createTRPCRouter({
  getUsers: baseProcedure.query(() => {
    return [{ id: 1, name: "hello" }];
  }),
  addUser: baseProcedure
    .input(z.object({ name: z.string() }))
    .mutation((opts) => {
      const {
        input: { name },
      } = opts;

      db.insert(user).values({ name });
    }),
});
