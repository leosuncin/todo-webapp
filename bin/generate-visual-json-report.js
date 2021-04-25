#! /bin/env node
// SEE https://github.com/oblador/loki/issues/76#issuecomment-595777550
const { readdir, writeFile } = require('fs/promises');
const { resolve, relative } = require('path');

const lokiDir = resolve(__dirname, '..', '.loki');
const actualDir = resolve(lokiDir, 'current');
const expectedDir = resolve(lokiDir, 'reference');
const diffDir = resolve(lokiDir, 'difference');

(async function main() {
  const diffs = await readdir(diffDir);

  await writeFile(
    resolve(lokiDir, 'report.json'),
    JSON.stringify({
      newItems: [],
      deletedItems: [],
      passedItems: [],
      failedItems: diffs,
      expectedItems: diffs,
      actualItems: diffs,
      diffItems: diffs,
      actualDir: relative(lokiDir, actualDir),
      expectedDir: relative(lokiDir, expectedDir),
      diffDir: relative(lokiDir, diffDir),
    }),
  );
})();
