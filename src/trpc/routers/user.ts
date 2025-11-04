import { z } from "zod";
import { baseProcedure, createTRPCRouter } from "../init";
import { db } from "@/db/drizzle";
import { user } from "@/db/schema";

export const userRouter = createTRPCRouter({
  getUsers: baseProcedure.query(async () => {
    return await db.select().from(user);
  }),
  addUser: baseProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async (opts) => {
      const {
        input: { name },
      } = opts;

      return await db.insert(user).values({ name }).returning();
    }),
});
