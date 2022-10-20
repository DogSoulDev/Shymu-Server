//! Verificar funcionamiento

function getPublicId(url) {
  const splitedURL = url.split('/');
  const lastItems = splitedURL.splice(7).join('/');
  let publicId = lastItems.split('.')[0];

  return publicId;
}

module.exports = { getPublicId };
