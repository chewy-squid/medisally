const express = require("express");
const models = require("../models");

const router = express.Router();

router.post("/treat-type", async (req, res) => {
  const { name } = req.body;
  const userUUID = req.query.UUID;
  const symptomTypeId = req.query.symptomTypeId;
  const user = await models.User.findOne({
    where: {
      UUID: userUUID,
    },
  });
  const symptomType = await models.SymptomType.findOne({
    where: {
      id: symptomTypeId,
    },
  });
  if (!name) {
    res.status(400).send("필수 입력 항목을 입력하지 않음");
  }
  models.TreatType.create({
    userUUID,
    symptomTypeId,
    name,
    user: user.dataValues,
    symptomType: symptomType.dataValues,
  }).then((result) => {
    res.send(result);
  });
});

module.exports = router;
