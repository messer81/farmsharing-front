const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, 'farms.json');

function readFarms() {
  try {
    const raw = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to read farms DB:', e);
    return [];
  }
}

function getAllFarms() {
  return readFarms();
}

function getFarmById(id) {
  return readFarms().find(f => f.id === Number(id));
}

function getFarmsByBounds({ north, south, east, west }) {
  const farms = readFarms();
  if ([north, south, east, west].some(v => typeof v === 'undefined')) return farms;
  return farms.filter(f =>
    typeof f.latitude === 'number' && typeof f.longitude === 'number' &&
    f.latitude <= north && f.latitude >= south &&
    f.longitude <= east && f.longitude >= west
  );
}

module.exports = {
  getAllFarms,
  getFarmById,
  getFarmsByBounds,
};


