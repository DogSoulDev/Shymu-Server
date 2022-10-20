// const mysql = require("mysql");

// !MySql Connection.
// const db = mysql.createConnection({
//   user: "root",
//   host: "localhost",
//   password: "password",
//   database: "usersSystem",
// });
// app.post("/create", (req, res) => {
//   const userName = req.body.name;
//   const email = req.body.email;
//   const gender = req.body.gender;
//   const genre = req.body.genre;
//   db.query(
//     "INSERT INTO employees (name, email, gender, genre) VALUES (?,?,?,?,?)",
//     [name, age ],
//     (err, result) => {
//       if (err) {
//         console.log(err);
//       } else {
//         res.send("Values Inserted");
//       }
//     }
//   );
// });
// app.get("/users", (req, res) => {
//   db.query("SELECT * FROM employees", (err, result) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.send(result);
//     }
//   });
// });
// app.put("/update", (req, res) => {
//   const id = req.body.id;
//   db.query(
//     "UPDATE employees SET wage = ? WHERE id = ?",
//     [id],
//     (err, result) => {
//       if (err) {
//         console.log(err);
//       } else {
//         res.send(result);
//       }
//     }
//   );
// });

// app.delete("/delete/:id", (req, res) => {
//   const id = req.params.id;
//   db.query("DELETE FROM employees WHERE id = ?", id, (err, result) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.send(result);
//     }
//   });
// });