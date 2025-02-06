import type { ZodType, ZodTypeDef } from "zod";
import fetchJson from "./fetchJson";

export default async <
  Output,
  Def extends ZodTypeDef = ZodTypeDef,
  Input = Output
>(
  url: string,
  schema: ZodType<Output, Def, Input>
) => {
  const data = await fetchJson(url);
  return await schema.parseAsync(data);
};
