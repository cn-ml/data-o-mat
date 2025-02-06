import { z } from "zod";
import asDict from "~/shared/utils/asDict";
import fetchRepoFileValidated from "~/shared/utils/fetchRepoFileValidated";

export const yearSchema = z.coerce.number().int().gt(1900).lt(2100);

const paramsSchema = z.object({
  year: yearSchema,
  slug: z.string(),
});

const overviewSchema = z.object({
  title: z.string(),
  date: z.string().date(),
  info: z.string().url(),
  slug: z.string(),
  data_source: z.string().url(),
});

const answerSchema = z.object({
  id: z.number().int().nonnegative(),
  message: z.string(),
});

const answerListSchema = z.array(answerSchema);

const statementSchema = z.object({
  id: z.number().int().nonnegative(),
  label: z.string(),
  text: z.string(),
});

const statementListSchema = z.array(statementSchema);

const partySchema = z.object({
  id: z.number().int().nonnegative(),
  name: z.string(),
  longname: z.string(),
});

const partyListSchema = z.array(partySchema);

const commentSchema = z.object({
  id: z.number().int().nonnegative(),
  text: z.string(),
});

const commentListSchema = z.array(commentSchema);

const opinionSchema = z.object({
  id: z.number().int().nonnegative(),
  party: partySchema.shape.id,
  statement: statementSchema.shape.id,
  answer: answerSchema.shape.id,
  comment: commentSchema.shape.id,
});

const opinionListSchema = z.array(opinionSchema);

export default defineCachedEventHandler(
  async (event) => {
    const { year, slug } = await getValidatedRouterParams(
      event,
      paramsSchema.parseAsync
    );
    const path = `data/${year}/${slug}`;
    const overview = await fetchRepoFileValidated(
      `${path}/overview.json`,
      overviewSchema
    );
    const answers = asDict(
      await fetchRepoFileValidated(`${path}/answer.json`, answerListSchema),
      "id"
    );
    const statements = asDict(
      await fetchRepoFileValidated(
        `${path}/statement.json`,
        statementListSchema
      ),
      "id"
    );
    const parties = asDict(
      await fetchRepoFileValidated(`${path}/party.json`, partyListSchema),
      "id"
    );
    const comments = asDict(
      await fetchRepoFileValidated(`${path}/comment.json`, commentListSchema),
      "id"
    );
    const opinions = asDict(
      (
        await fetchRepoFileValidated(`${path}/opinion.json`, opinionListSchema)
      ).map((i) => ({ ...i, comment: comments[i.comment].text })),
      "id"
    );
    return { ...overview, answers, statements, parties, opinions };
  },
  {
    name: "election",
    async getKey(event) {
      const { year, slug } = await getValidatedRouterParams(
        event,
        paramsSchema.parseAsync
      );
      return `${year}-${slug}`;
    },
    maxAge: 24 * 60 * 60,
  }
);
