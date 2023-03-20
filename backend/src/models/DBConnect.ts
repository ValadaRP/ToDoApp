import mysql from 'mysql2';





export const DBQuery = async (query:string) => {
    const pool = mysql.createPool({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE
    }).promise();

    const [rows] = await pool.query(query);
    await pool.end();
    return rows;
};

export const DBQueryParam = async (query: string, param: number | string) => {
    const pool = mysql.createPool({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE
    }).promise();

    const [rows] = await pool.query(query, [param]);
    await pool.end();
    return rows[0];
};

export const DBUpdate = async (query: string, id: number | string ,name?: string, content?: string) => {
    const pool = mysql.createPool({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE
    }).promise();

    await pool.query(query, [name, content, id]);
    await pool.end();
}

export const DBCreate = async (query: string, name: string, content: string) => {
    const pool = mysql.createPool({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE
    }).promise();
    await pool.query(query, [name, content]);
    await pool.end();
}
