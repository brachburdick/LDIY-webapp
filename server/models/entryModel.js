// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const { Pool } = require('pg');
const myURI = 'postgres://rlcqnjav:NpLZ2nItWnwb6ZWvUgJOeD9ZUV_iGOHO@raja.db.elephantsql.com/rlcqnjav';
const pool = new Pool({connectionString:myURI});



module.exports = {
  query:(text,params,callback)=>{
    console.log('submitting query: ' , text);
    return pool.query(text,params,callback);
  }
}; // <-- export your model
