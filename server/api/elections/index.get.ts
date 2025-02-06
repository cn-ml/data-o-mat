import { z } from "zod";
import fetchRepoFileValidated from "~/shared/utils/fetchRepoFileValidated";
import { yearSchema } from "./[year]/[slug]/index.get";

const electionSchema = z.object({
  id: z.number(),
  name: z.string(),
  date: z.string().date(),
  path: z.string(),
});

type Election = z.output<typeof electionSchema>;

const electionListSchema = z.array(electionSchema);

function transformElection({ name, date, path }: Election) {
  const items = path.split("/", 4);
  const [data, year, slug] = items;
  if (
    items.length !== 3 ||
    data !== "data" ||
    year === undefined ||
    slug === undefined
  )
    throw createError({
      statusCode: 500,
      statusMessage: `Invalid election path ${path}!`,
    });
  return {
    name,
    date,
    year: yearSchema.parse(year),
    slug,
  };
}

export default defineCachedEventHandler(
  async (_event) => {
    const elections = await fetchRepoFileValidated(
      "election.json",
      electionListSchema
    );
    elections.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
    return elections.map(transformElection);
  },
  {
    name: "elections",
    getKey(_event) {
      return "";
    },
    maxAge: 60 * 60,
  }
);
