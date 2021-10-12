const files = process.argv.slice(2);
// console.log(files);

const coreModified = (fn) => {
  return Object.values({
    core: /^src\/mesida/,
    configs: /^configs/,
  }).some((regex) => regex.test(fn));
};

const collectSiteIds = (fn) => {
  return fn.match(/^src\/sites\/(\d+)/)?.pop();
};

const main = (files) => {
  let results = new Set();
  for (const file of files) {
    const isCore = coreModified(file);
    // console.log(isCore, file);
    if (isCore) {
      results = new Set(['all']);
      break;
    }
    const siteId = collectSiteIds(file);
    // console.log(siteId, file);
    if (siteId) {
      results.add(siteId);
    }
  }
  return Array.from(results);
};

const results = main(files);
console.log(results.join(' '));
