const deleteOrder = (req, res, db) => {
  const { orderID } = req.body;
  const deleteQuery = "DELETE FROM orders WHERE orderID=?";
  db.execute(deleteQuery, [orderID], (err, result, fields) => {
    if (err) return res.status(400).json();
    return res.status(200).json();
  });
};

export default deleteOrder;
