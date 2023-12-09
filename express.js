const express = require('express');
const mysql = require('mysql');
const PORT = 5000;
const cors = require('cors');

const app = express();

// app.use(express.static('public'));
app.use(cors());

// creating a mysql connection:     
const connection = mysql.createConnection({
    // host : 'sql12.freesqldatabase.com',
    // user : 'sql12654551',
    // password : 'CVTFPFfHA8',
    // database : 'sql12654551'
    host: '183.82.62.219',
    user: 'dbuser',
    password: 'A@123456',
    database: 'stockandmanagement'

})

// Listening and connecting to server 
app.listen(PORT, () => {
    console.log('App listening on port http://localhost:5000');
    connection.connect(() => {
        console.log('connection successful');
    })
})

const sql_query = 'select * from stockandmanagement.Inventory';

app.get('/allpmcstocks', (req, res) => {
    let page = Number(req.query.page) ;
    let limit = Number(req.query.limit) ;
    let offset = (page - 1) * limit;

    connection.query(sql_query, (err, result) => {
        if (err) {
            console.log('error is fetcing data')
        }
        const keys = Object.keys(req.query);
        console.log(req.query)

        // const final = result.slice(offset, offset + limit);
        // console.log(final, numberOfItem = final.length);
        return res.json(result);
        // return res.json(result);

        // if (keys.length === 0) return res.json({result, NumberOfItems: result.length});
        // let finalResult = result;

        

        // keys.forEach(key => {
        //     finalResult = finalResult.filter((record) => record[key]?.toString() === req.query[key]);
        // })
        // let finalFetchedResult = finalResult.slice(offset, offset + limit);
        // console.log(offset)
        // console.log(limit)
        // return res.json({finalFetchedResult, NumberOfItems: finalFetchedResult.length});
    })
})


app.get('/pmsstock/:Location', (req, res) => {
    let page = Number(req.query.page) ;
    let limit = Number(req.query.limit) ;
    let offset = (page - 1) * limit;

    // const sql_query1 = `SELECT * FROM stockandmanagement.Inventory LIMIT ${limit} OFFSET ${offset} `;

    connection.query(sql_query, (err, result) => {
        if (err) {
            console.log('error is fetcing data')
        }
        const keys = Object.keys(req.query);
        // console.log(req.query)
        // console.log(req.params)
        // let query = req.query;

        const storedData = result.filter((item) => item.Location.toString() === req.params.Location);
        
        return res.json(storedData.slice(offset, offset + limit))
        // return res.json({storedData, NumberOfItems: storedData.length});
        // if ((req.params.Location == 19) || (req.params.Location == 20) || (req.params.Location == 17) || (req.params.Location == 1)){
        //     console.log('if condition is true')
        //     return res.json({storedData, NumberOfItems: storedData.length});
        // } else{
        //     return res.json(storedData.slice(offset, offset + limit))
        // }

    })
})

	// app.get('/all/:Location', (req, res) => {
//     let page = req.query.page;
//     let limit = req.query.limit || 20;
//     let offset = (page - 1) * limit;

//     connection.query(sql_query, (err, result) => {
//         if (err) console.log(err, 'connection error')

//         const keys = Object.keys(req.query);
//         let finalResult = result;

//         if (req.params.Location !== 0) {
//             const storedData = result.filter((item) => item.Location.toString() === req.params.Location);
//             // console.log(storedData)
//             // const storedFetchedData = storedData.slice(offset, offset + limit)
//             // console.log(offset,limit)
//             return res.send({ storedData, NumberOfItems: storedData.length });

//         } else if ((req.params.Location !== 0) && (req.query.page !== 0)) {
//             keys.forEach(key => {
//                 finalResult = finalResult.filter((record) => record[key]?.toString() === req.query[key]);
//             })
//             let finalFetchedResult = finalResult.slice(offset, offset + limit);
//             return res.json({finalFetchedResult, NumberOfItems: finalFetchedResult.length});

//             // const storedData = result.filter((item) => item.Location.toString() === req.params.Location);
//             // const storedFetchedData = storedData.slice(offset, offset + limit)
//             // return res.json(storedFetchedData);
//         } else {
//             // const storedData = result.filter((item) => item.Location.toString() === req.params.Location);
//             return res.json({result,  NumberOfItems: result.length})
//         }
//         // const storedData = result.filter((item) => item.Location.toString() === req.params.Location);
//         // const storedFetchedData = storedData.slice(offset, offset * limit)
//         // return res.json({storedFetchedData, NumberOfItems: storedFetchedData.length});

//     })
// })