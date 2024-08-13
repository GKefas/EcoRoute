const pricing = (req, res, db) => {
  const { gasStationOwner } = req.query;
  const query =
    "SELECT fuelName,fuelPrice,dateUpdated,isPremium FROM gasstations JOIN pricedata ON gasstations.gasStationID=pricedata.gasStationID WHERE gasStationOwner=?";

  db.execute(query, [gasStationOwner], (err, result, fields) => {
    if (err || result[0] === undefined) return res.status(400).json(); //If error or no Data dont return something handle it with the response of 400 at front end
    return res.json(result);
  });
};

export default pricing;
