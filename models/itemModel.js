const pool = require('../config/db');

exports.getItems = async () => {
  try {
    const result = await pool.query('SELECT * FROM tb_item');
    return result.rows; 
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.getItemById = async (params) => {
  try {
    const result = await pool.query('SELECT * FROM tb_item where id = $1',params);
    return result.rows; 
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.addItem = async (params) => {
  try {
    const result = await pool.query(
      `INSERT INTO tb_item (
        user_nm
        , user_mail
      ) VALUES (
        $1
        , $2
      ) RETURNING *`
    , params);

    return result.rows[0]; 
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.setItem = async (params) => {
  try {
    const result = await pool.query(
      `UPDATE tb_item SET 
        user_nm = $1 
        , user_mail = $2 
      WHERE id = $3 
      RETURNING * `
    , params);

    return result.rows[0]; 
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.delItem = async (params) => {
  try {
    const result = await pool.query('DELETE FROM tb_item WHERE id = $1 RETURNING *', params);
    return result.rows[0]; 
  } catch (error) {
    throw new Error(error.message);
  }
};
