const { createClient } = require("@valkey/client");

const commonConfigs = {
  redisPort: process.env.REDIS_PORT,
  redisHost: process.env.REDIS_HOST,
  index: process.env.REDIS_INDEX || 0,
};

let redisInstance = null;

const connectToValkey = async (config = commonConfigs) => {
  try {
    const url = `valkey://${config.redisHost}:${config.redisPort}/${config.index}`;
    redisInstance = await createClient({ url })
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

const set = async (key, value, client = redisInstance) => {
  try {
    await client.set(key, value);
    return key;
  } catch (error) {
    throw error;
  }
};
const get = async (key, client = redisInstance) => {
  try {
    const value = await client.get(key);
    return value;
  } catch (error) {
    throw error;
  }
};

const hSet = async (key, field, value, client = redisInstance) => {
  try {
    await client.hSet(key, field, value);
    return { field: value };
  } catch (error) {
    throw error;
  }
};

const hGetAll = async (key, client = redisInstance) => {
  try {
    const value = await client.hGetAll(key);
    return value;
  } catch (error) {
    throw error;
  }
};

const deleteKey = async (key, client = redisInstance) => {
  try {
    await client.del(key);
    return key;
  } catch (error) {
    throw error;
  }
};

const disconnect = async (client = redisInstance) => {
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
