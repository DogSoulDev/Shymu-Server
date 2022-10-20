async function handleDbResponse(res, dbResponse) {
  if (dbResponse.error) {
    return res.status(400).send({
      data: null,
      error: dbResponse.error,
    });
  }
  if (dbResponse.data) {
    return res.status(201).send({
      data: dbResponse.data,
      error: null,
    });
  }
  return res.status(404).send({
    data: null,
    error: 'Not Found',
  });
}

module.exports = new handleDbResponse();
