import mysql from 'mysql2';

const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
}).promise();

export const DBQuery = async (query:string) => {
    const [rows] = await pool.query(query);
    await pool.end();
    return rows;
};

export const DBQueryParam = async (query: string, param: number | string) => {
    const [rows] = await pool.query(query, [param]);
    return rows[0];
};
