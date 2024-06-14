const login = (req, res, db) => {
  const { username, password } = req.body;
  const query =
    "SELECT username,password FROM users WHERE username=? AND password =?";

  db.execute(query, [username, password], (err, result, fields) => {
    if (err) return res.status(400).json();
    if (result[0] === undefined) return res.status(400).json("Invalid");
    return res.status(200).json(username);
  });
};

export default login;
