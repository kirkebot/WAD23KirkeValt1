const Pool = require('pg').Pool;
const pool = new Pool({
    user: "postgres",
    password: "postgres", // Enter your password here
    database: "testWad", //Try to use the same name for your database
    host: "localhost",
    port: "5432"
});

const execute = async(createTblQuery, insertDataQuery) => {
    try {
        await pool.connect();
        await pool.query(createTblQuery);
        await pool.query(insertDataQuery);
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
};

const createTblQuery = ` 
    CREATE TABLE IF NOT EXISTS "wadcourse" (
        "id" SERIAL PRIMARY KEY, 
        "studentcode" VARCHAR(200) NOT NULL,
        "studentname" VARCHAR(200) NOT NULL,
        "hw1" integer,
        "hw2" integer,
        "exam" integer, 
        "final" integer
        );`;

const insertDataQuery = `WITH data (studentcode, studentname, hw1,  hw2, exam, final) AS 
    (
    VALUES
        ('A111', 'John Doe', 22, 11, 45, 77),
        ('A112','Sarah Doe', 23, 24, 20, 67),
        ('A113', 'Laura Doe', 10, 12, 22, 44),
        ('A114', 'Mike Doe', 17, 21, 37, 75),
        ('A115', 'Jack Doe',  6,  8, 0, 14)
    )


    
  INSERT INTO wadcourse(studentcode, studentname, hw1,  hw2, exam, final) 
  SELECT  d.studentcode, d.studentname, d.hw1,  d.hw2, d.exam, d.final
  FROM data d
  WHERE NOT EXISTS (SELECT * FROM wadcourse WHERE id = 1);
`

execute(createTblQuery, insertDataQuery).then(result => {
    if (result) {
        console.log('If does not exists, table "wadcourse" is created');
    }
});

module.exports = pool;