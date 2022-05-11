#!/usr/bin/env node
import envPaths from "env-paths";
import { existsSync } from "fs";
import { mkdir, readFile, writeFile } from "fs/promises";
import yaml from "js-yaml";
import { parseArgsIntoOptions } from "./utils";
// YAML CACHE
const yamlContent = `
gist: https://gist.github.com/abdelmomen1985
mist: https://mist.io/abdelmomen1985
`;
(async () => {
  const paths = envPaths("knola", {
    suffix: undefined,
  });
  console.log(paths.cache);
  // TODO later invalidate cache
  let fileContent;
  try {
    fileContent = await readFile(`${paths.cache}/mmn.yaml`, "utf8");
  } catch (error) {
    if (!existsSync(`${paths.cache}`)) await mkdir(`${paths.cache}`);
    await writeFile(`${paths.cache}/mmn.yaml`, yamlContent);
    fileContent = await readFile(`${paths.cache}/mmn.yaml`, "utf8");
  }
  const doc = yaml.load(fileContent);
  const [url, ...restArgs] = parseArgsIntoOptions(process.argv);
  console.log(doc, doc[url] + restArgs);
})();
