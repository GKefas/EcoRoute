const confirmOrder = (req, res, db) => {
  const { orderID } = req.body;
  const updateQuery = "UPDATE orders SET quantity=0 WHERE orderID=?";
  db.execute(updateQuery, [orderID], (err, result, fields) => {
    if (err) return res.status(400).json();
    return res.status(200).json();
  });
};

export default confirmOrder;
