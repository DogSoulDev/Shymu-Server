//*Controlador que recibe request y response:
function getTasks(req, res) {
  res.status(200).send({ msg: "Task Controller it's working OK!" });
}

// exportar el módulo getTasks:
module.exports = {
  getTasks,
};
