const makeOrder = (req, res, db) => {
  const { gasStationOwner, fuel, quantity } = req.body;
  const getDataQuery =
    "SELECT pd.productID,gs.username FROM gasstations gs JOIN pricedata pd ON gs.gasStationID=pd.gasStationID WHERE gs.gasStationOwner=? AND pd.fuelName=?";

  db.execute(getDataQuery, [gasStationOwner, fuel], (err, result, fields) => {
    if (err) return res.status(400).json();

    const { username, productID } = result[0];
    const query =
      "INSERT INTO orders(productID,username,quantity,`when`) VALUES (?,?,?,?)";
    const date = new Date();

    db.execute(
      query,
      [
        productID,
        username,
        quantity,
        date.toISOString().slice(0, 19).replace("T", " "),
      ],
      (err, result, fields) => {
        if (err) return res.status(400).json();
        return res.status(200).json();
      }
    );
  });
};

export default makeOrder;
