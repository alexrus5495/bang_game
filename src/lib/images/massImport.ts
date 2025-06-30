//NOTE: This function takes modules from 'import.meta.glob' and creates
//an objects with relative paths to the elements inside them.

type ViteGlobImport = Record<string, { default: string }>;

export function createObjectsFromMassImport(
  modules: ViteGlobImport,
): Record<string, string> {
  return Object.fromEntries(
    Object.entries(modules).map(([path, module]) => {
      const fileName = path.split("/").pop() || "";
      const name = fileName.replace(/\.[^/.]+$/, "");
      return [name, module.default];
    }),
  );
}
