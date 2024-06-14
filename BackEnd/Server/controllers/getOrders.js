const getOrders = (req, res, db) => {
  const { username } = req.body;
  const query =
    "SELECT od.orderID,od.quantity,od.when,pd.fuelName FROM orders od JOIN pricedata pd ON od.productID=pd.productID WHERE od.username=?";

  db.execute(query, [username], (err, result, fields) => {
    if (err) return res.status(400).json(err);
    return res.status(200).json(result);
  });
};

export default getOrders;
