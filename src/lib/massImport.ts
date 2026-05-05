/**
 * This function takes the result of 'import.meta.glob' and returns
 * an object with relative paths to the elements inside them.
 *
 **/
export function createObjectsFromMassImport<T>(
  modules: Record<string, { default: T }>,
): Record<string, T> {
  return Object.fromEntries(
    Object.entries(modules).map(([path, module]) => {
      const fileName = path.split("/").pop() || "";
      const name = fileName.replace(/\.[^/.]+$/, "");
      return [name, module.default];
    }),
  );
}
