const { execSync } = require('child_process');

// Pages to audit with friendly names
const pages = [
  { file: 'faq.html', name: 'FAQ Page' },
  { file: 'contact.html', name: 'Location Page' }
];

function getLastCommitDate(file) {
  try {
    const result = execSync(`git log -1 --format=%cI -- "${file}"`, { encoding: 'utf8' }).trim();
    return new Date(result);
  } catch (err) {
    return null;
  }
}

function daysBetween(date) {
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.floor((Date.now() - date.getTime()) / msPerDay);
}

const staleItems = [];

for (const page of pages) {
  const lastDate = getLastCommitDate(page.file);
  if (!lastDate) {
    // Skip if file not found or git command failed
    continue;
  }
  const age = daysBetween(lastDate);
  if (age > 180) {
    staleItems.push({
      name: page.name,
      file: page.file,
      lastUpdated: lastDate.toISOString().split('T')[0],
      ageDays: age
    });
  }
}

console.log(JSON.stringify({ staleItems }, null, 2));
