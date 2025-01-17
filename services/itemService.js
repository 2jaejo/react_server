const itemModel = require('../models/itemModel');

exports.getItems = async () => {
  try {
    return await itemModel.getItems();
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.getItemById = async (req) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      throw new Error('Invalid ID');
    }
    const params = [id];
    return await itemModel.getItemById(params);
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.addItem = async (req) => {
  try {
    const { name } = req.body;
    const params = [name, name+"@gmail.com"];
    return await itemModel.addItem(params);
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.setItem = async (req) => {
  try {
    const { id, name } = req.body;
    const params = [name, name+"@gmail.com", id];
    return await itemModel.setItem(params);
  } catch (error) {
    throw new Error(error.message);
  }
}

exports.delItem = async (req) => {
  try {
    const id = parseInt(req.params.id, 10);
    const params = [id];
    return await itemModel.delItem(params);
  } catch (error) {
    throw new Error(error.message);
  }
}
