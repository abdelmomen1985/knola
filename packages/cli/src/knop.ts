#!/usr/bin/env node
import envPaths from "env-paths";
import { existsSync } from "fs";
import { mkdir, readFile, writeFile } from "fs/promises";
import yaml from "js-yaml";
import open from "open";
import { parseArgsIntoOptions } from "./utils";
// YAML CACHE
const yamlContent = `
gists: https://gist.github.com/abdelmomen1985
pkgq: https://www.npmjs.com/search?q=
npmq: https://www.npmjs.com/search?q=
repoq: https://github.com/search?type=repositories&q=
gitq: ttps://github.com/search?q=
logoq: https://autocomplete.clearbit.com/v1/companies/suggest?query=
riconq: https://react-icons.github.io/react-icons/search?q=
wcms: https://whatcms.org/?s=
tld: https://tld-list.com/tld/
direc: http://localhost:8055/admin/content/websites
g2: https://www.g2.com/products/
speedev: https://www.speedtyper.dev/play?mode=private
idom: https://instantdomainsearch.com/?q=
`;
(async () => {
  const paths = envPaths("knola", {
    suffix: undefined,
  });
  const knolaChachePath = `${paths.cache}/urls.yaml`;
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
  const [short, ...restArgs] = parseArgsIntoOptions(process.argv);
  open(doc[short] + restArgs);
})();
