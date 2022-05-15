function arrToObj(array) {
  const object = {};
  for (element of array) {
    const key = element.dataValues.id;
    delete element.dataValues.id;
    object[key] = element.dataValues;
  }
  return object;
}

module.exports = arrToObj;
