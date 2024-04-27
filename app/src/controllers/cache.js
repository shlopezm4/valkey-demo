const { set, get, hSet, hGetAll, deleteKey } = require("../helpers/valkey");

const successResponse = (message) => ({ status: true, message });
const errorResponse = (message, error) => ({ status: false, message, error });

const setController = async (req, res, next) => {
  try {
    const { key, value } = req?.body;
    const response = await set(key, value);
    return res
      .status(200)
      .send(successResponse(`Successfully Stored key=${response}`));
  } catch (error) {
    return res
      .status(500)
      .send(errorResponse(`Error setting a key!`, error.message));
  }
};
const getController = async (req, res, next) => {
  try {
    const { key } = req?.body;
    const response = await get(key);
    return res.status(200).send({ data: response });
  } catch (error) {
    return res
      .status(500)
      .send(errorResponse(`Error getting a key!`, error.message));
  }
};

const hSetController = async (req, res, next) => {
  try {
    const { key, field, value } = req?.body;
    const response = await hSet(key, field, value);
    return res.status(200).send({ data: response });
  } catch (error) {
    return res
      .status(500)
      .send(errorResponse(`Error setting a HASH key!`, error.message));
  }
};

const hGetControler = async (req, res, next) => {
  try {
    const { key } = req?.body;
    const response = await hGetAll(key);
    return res.status(200).send({ data: response });
  } catch (error) {
    return res
      .status(500)
      .send(errorResponse(`Error getting a HASH key!`, error.message));
  }
};

const deleteController = async (req, res, next) => {
  try {
    const { key } = req?.body;
    const response = await deleteKey(key);
    return res.status(200).send({ data: response });
  } catch (error) {
    return res
      .status(500)
      .send(errorResponse(`Error deleting key!`, error.message));
  }
};

module.exports = {
  setController,
  getController,
  hSetController,
  hGetControler,
  deleteController,
};
