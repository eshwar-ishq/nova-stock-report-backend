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
const combinedstocks = `select i.id, i.MSKU, i.Item_name, i.Quantity, tl.LocationName, tb.Brand , tpc.Product_Category, tc.category, i.Purchase_amt,
                            i.Item_Amount, i.Batch, i.Manf_date, i.Expiry_date, i.Date_modified, i.Available_Qty, i.Blocked_Qty, i.Sheet_name  from Inventory i 
    left join tbl_brands tb on tb.idno = i.Brand 
    left join tbl_product_category tpc on tpc.idno = i.Product_Category 
    left join tbl_category tc on tc.idno = i.Category 
    left join tbl_location tl on tl.LocationId = i.Location`;

    //  Below code is used for satic website
app.get('/allpmcstocks/:LocationName', (req, res) => {
    let page = Number(req.query.page) ;
    let limit = Number(req.query.limit) ;
    let offset = (page - 1) * limit;

    connection.query(combinedstocks, (err, result) => {
        if (err) {
            console.log('error is fetcing data')
        }
        const keys = Object.keys(req.query);
        console.log(req.query)

        // const final = result.slice(offset, offset + limit);
        // console.log(final, numberOfItem = final.length);
        const storedData = result.filter((item) => item.LocationName.toString() === req.params.LocationName);
        return res.json(storedData);
    })
})


//  Below code is used for dynamic website (ReactJs)
app.get("/all", (req, res) => {
    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 30;
    let offset = (page - 1) * limit;
    const LocationName = req.query.LocationName;

    // console.log("LocationName from frontend:", LocationName);

    connection.query(combinedstocks, (err, result) => {
        if (err) {
            console.log(err, "error in / url");
            return res.status(500).json({ error: "Internal Server Error" });
        }

        let filteredData = result;

        if (LocationName) {
            // Filter only if LocationName is provided (case-insensitive and trim)
            filteredData = result.filter(
                item => item.LocationName.trim().toLowerCase() === LocationName.trim().toLowerCase()
            );
        }

        // return res.json(filteredData.slice(offset, offset + limit));
        return res.json(filteredData)
    });
});


//  Below code is used for satic website
// app.get('/combinedstocks/:LocationName', (req, res) => {
//     let page = Number(req.query.page) ;
//     let limit = Number(req.query.limit) ;
//     let offset = (page - 1) * limit;
    
//     connection.query(combinedstocks, (err, result) => {
//         if (err) {
//             console.log("error in stock brand api", err)
//         }
//         const storedData = result.filter((item) => item.LocationName.toString() === req.params.LocationName);
//         return res.json(storedData.slice(offset, offset + limit));
//     })
// })