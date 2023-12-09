
const sql_query = 'select * from stockandmanagement_Inventory'

const getAllProducts = async (req,res) => {
    res.status(200).json({msg:'getting all products'})
};

const getAllProductsTesting = async (req,res) => {
    res.status(200).json({msg: 'getting all products tesing'})
};

const getBelmontStocks = async (req,res) => {
    createConnection.connect()
}

module.exports = {getAllProducts,getAllProductsTesting};