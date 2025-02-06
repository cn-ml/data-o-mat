export default (path: string) => {
  const { dataRepo } = useRuntimeConfig();
  return new URL(path, dataRepo).href;
};
