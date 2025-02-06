export default async (url: string) => {
  const textData = await $fetch(url);
  if (typeof textData !== "string")
    throw createError({
      statusCode: 500,
      statusMessage: "Expected JSON document!",
    });
  return JSON.parse(textData);
};
