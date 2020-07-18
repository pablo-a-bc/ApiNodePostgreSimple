const{Pool}=require('pg');
const pool= new Pool({
    host: 'localhost',
    user:'postgres',
    password:'Pablo666',
    database: 'firstapi',
    port: 5432,
});
const {Response} = require('../models/responsemodel');

const getUsers = async (req,res)=>{ 
  try {
      
    const response =await  pool.query('SELECT * FROM users');
    if(response.rows.length > 0)
    {
    res.status(200).json(response.rows);
    }
    else
    {
    res.status(404).json('No hay datos');
    }

  } catch (error) {
      
    res.status(500).json("Excepción" + error);
  }

};
const createUsers = async (req,res)=>{ 
const {name, email} = req.body;
const consulta = await pool.query('INSERT INTO users (name, email) VALUES ($1,$2)',[name,email]);
console.log(consulta);
res.send('user created');
};

const deleteUsers = async (req,res)=>{ 
const id = req.params.id;
const response = await pool.query('DELETE FROM users WHERE id= $1',[id]);
res.send('user deleted');
};
  
const searchUsers = async (req,res) => { 
    const id = req.params.id;
    const response = await pool.query('SELECT * FROM users WHERE id= $1',[id]);
    res.json(response.rows);
};

const updateUsers= async (req,res) => { 
    const {id,name, email} = req.body;
    const response = await pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3',[
        name,
        email,
        id
    ]);
    console.log(response);
    res.send('User Updated');
};

module.exports= {
    getUsers,
    createUsers,
    deleteUsers,
    searchUsers,
    updateUsers
}
