const { createClient } = require("@valkey/client");

const commonConfigs = {
  valkeyPort: process.env.VALKEY_PORT,
  valkeyHost: process.env.VALKEY_HOST,
  index: process.env.VALKEY_INDEX || 0,
};

let valkeyInstance = null;

const connectToValkey = async (config = commonConfigs) => {
  try {
    const url = `valkey://${config.valkeyHost}:${config.valkeyPort}/${config.index}`;
    valkeyInstance = await createClient({ url })
      .on("error", (err) => {
        throw err;
      })
      .connect();
    console.log(`Connection to Valkey succeeded!`);
    return true;
  } catch (error) {
    throw error;
  }
};

const set = async (key, value, client = valkeyInstance) => {
  try {
    await client.set(key, value);
    return key;
  } catch (error) {
    throw error;
  }
};
const get = async (key, client = valkeyInstance) => {
  try {
    const value = await client.get(key);
    return value;
  } catch (error) {
    throw error;
  }
};

const hSet = async (key, field, value, client = valkeyInstance) => {
  try {
    await client.hSet(key, field, value);
    return { field: value };
  } catch (error) {
    throw error;
  }
};

const hGetAll = async (key, client = valkeyInstance) => {
  try {
    const value = await client.hGetAll(key);
    return value;
  } catch (error) {
    throw error;
  }
};

const deleteKey = async (key, client = valkeyInstance) => {
  try {
    await client.del(key);
    return key;
  } catch (error) {
    throw error;
  }
};

const disconnect = async (client = valkeyInstance) => {
  try {
    await client.quit();
  } catch (error) {
    throw error;
  }
};

module.exports = {
  connectToValkey,
  set,
  get,
  hSet,
  hGetAll,
  disconnect,
  deleteKey,
};
