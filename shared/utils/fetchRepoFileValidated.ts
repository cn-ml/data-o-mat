import type { ZodType, ZodTypeDef } from "zod";
import fetchRepoFile from "./fetchRepoFile";

export default async <
  Output,
  Def extends ZodTypeDef = ZodTypeDef,
  Input = Output
>(
  path: string,
  schema: ZodType<Output, Def, Input>
) => {
  const data = await fetchRepoFile(path);
  return await schema.parseAsync(data);
};
