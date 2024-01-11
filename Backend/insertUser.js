
const {createPool} = require('mysql');
const mysql = require('mysql');

const pool=createPool({
    host: "localhost",
    user: "root",
    password: "Dario@682016"
}
);

function insertUser(email,password) {
    const queryStr=`select * from demo.users WHERE email =`+mysql.escape(email) ;
    pool.query(queryStr,(err,res)=>{
        if(err){
            console.log('error - '+err.message);
            return ;
        }
        console.log(res);
        if(res.length==1){
            console.log('user already exists');
            return ;
        }
        else{
            const queryStr=`insert into demo.users(email,password) values(`+mysql.escape(email)+`,`+mysql.escape(password)+')';
            pool.query(queryStr,(err,res)=>{
                if (err) {
                    console.log('error'+err.message);
                    return ;
                }
                console.log('user inserted'+res);
            })
        }
        return console.log(typeof(res));
    })
    
}

insertUser("demo@dario.com","abc");