const changePrice = (req, res, db) => {
  const { gasStationOwner, fuel, price } = req.body;
  const regex = /^\d+\.\d{3}$/;
  if (!regex.test(price)) return res.status(400).json("Wrong price format");

  const query =
    "SELECT productID FROM gasstations JOIN pricedata ON gasstations.gasStationID=pricedata.gasStationID WHERE gasStationOwner=? AND fuelName=?";

  db.execute(query, [gasStationOwner, fuel], (err, result, fields) => {
    if (err || result[0] === undefined) return res.status(400).json(err);
    const updateQuery =
      "UPDATE pricedata SET fuelPrice=?,dateUpdated=? WHERE productID=?";
    const date = new Date();
    db.execute(
      updateQuery,
      [
        price,
        date.toISOString().slice(0, 19).replace("T", " "),
        result[0].productID,
      ],
      (err, result, fields) => {
        if (err) return res.status(400).json();
        return res.status(200).json();
      }
    );
  });
};

export default changePrice;