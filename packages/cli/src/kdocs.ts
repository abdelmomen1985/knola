import envPaths from "env-paths";
import { existsSync } from "fs";
import { mkdir, readFile, writeFile } from "fs/promises";
import yaml from "js-yaml";
import open from "open";
import { parseArgsIntoOptions } from "./utils";

const yamlContent = `
astro: https://docs.astro.build/en/getting-started/
chromeext: https://developer.chrome.com/docs/extensions/
react: https://reactjs.org/docs/getting-started.html
vite: https://vitejs.dev/guide/
storybook: https://storybook.js.org/docs/react/get-started/introduction
`;

export default async function kdocs() {
  const paths = envPaths("knola", {
    suffix: undefined,
  });
  const knolaChachePath = `${paths.cache}/docs.yaml`;
  // TODO later invalidate cache
  let fileContent;
  try {
    fileContent = await readFile(knolaChachePath, "utf8");
  } catch (error) {
    if (!existsSync(paths.cache)) await mkdir(paths.cache);
    await writeFile(knolaChachePath, yamlContent);
    fileContent = await readFile(knolaChachePath, "utf8");
  }
  const doc = yaml.load(fileContent);
  const [, short, ...restArgs] = parseArgsIntoOptions(process.argv);
  if (doc[short]) open(doc[short] + restArgs);
}
