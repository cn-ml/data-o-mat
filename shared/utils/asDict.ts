type KeySelector<T> = keyof {
  [Key in keyof T as T[Key] extends PropertyKey ? Key : never]: T[Key];
};

export default <
  T extends { [key in Key]: PropertyKey },
  Key extends KeySelector<T>
>(
  items: T[],
  key: Key
) => {
  const keys = new Set(items.map((i) => i[key]));
  if (keys.size !== items.length)
    throw createError({
      statusCode: 500,
      statusMessage: "Dictionary keys are not unique!",
    });
  const entries = items.map((i) => [i[key], i] as const);
  return Object.fromEntries(entries);
};
