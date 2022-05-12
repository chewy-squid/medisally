function split(req) {
  const body = req.body;
  console.log("body는", body);
  const symptomTypes = body.SymptomTypes;
  const symptoms = body.Symptoms;
  const treatTypes = body.TreatTypes;
  const treats = body.Treats;
  let {
    nickname,
    designatedSex,
    birthDate,
    UUID,
    createdAt,
    updatedAt,
    ...rest
  } = body;
  const user = {
    nickname,
    designatedSex,
    birthDate,
    UUID,
    createdAt,
    updatedAt,
  };

  return { user, symptomTypes, symptoms, treatTypes, treats };
}

module.exports = split;
