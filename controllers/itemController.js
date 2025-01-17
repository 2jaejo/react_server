const itemService = require('../services/itemService');

exports.getItems = async (req, res) => {
  try {
    const result = await itemService.getItems();
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getItemById = async (req, res) => {
  try {
    const result = await itemService.getItemById(req);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
  
};

exports.addItem = async (req, res) => {
  try {
    const result = await itemService.addItem(req);
    res.status(201).json(result);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

exports.setItem = async (req, res) => { 
  try {
    const result = await itemService.setItem(req);
    res.status(202).json(result);
  } catch (error) {
    res.status(402).json({ message: error.message });
  }
};

exports.delItem = async (req, res) => {
  try {
    const result = await itemService.delItem(req);
    res.status(203).json(result);
  } catch (error) {
    res.status(403).json({ message: error.message });  
  }

};


