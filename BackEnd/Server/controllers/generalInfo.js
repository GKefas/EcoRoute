const GeneralInfo = (req, res, db) => {
  let query =
    "SELECT COUNT(gs.gasStationID) AS CountGasStations FROM gasstations gs";

  db.execute(query, [], (err, result, fields) => {
    if (err || result[0] === undefined) return res.status(400).json(); //If error or no Data dont return something handle it with the response of 400 at front end ... else don't do the 2nd query for prices

    let data = {};
    Object.assign(data, result[0]); //Using Object.assign() method in case some type coercion and its not safe to do with a assign symbol (=) to convert data from array to Object
    query =
      "SELECT MAX(pd.fuelPrice) AS MaxPrice, MIN(pd.fuelPrice) AS MinPrice, ROUND(AVG(pd.fuelPrice), 3) AS AvgPrice FROM pricedata pd";

    db.execute(query, [], (err, result, fields) => {
      if (err || result[0] === undefined) return res.status(400).json(); //If error or no Data dont return something handle it with the response of 400 at front end
      return res.json(Object.assign(data, result[0])); //Assign data to data Variable and send it to the front end
    });
  });
};

export default GeneralInfo;
