import { loadGameAssets } from './assets.js';
import { loadProtos } from './loadProtos.js';
import { testAllConnections } from '../utils/db/testConnection.js';
import pools from '../db/database.js';

const initServer = async () => {
  try {
    await loadGameAssets();
    await loadProtos();
    await testAllConnections(pools);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

export default initServer;
