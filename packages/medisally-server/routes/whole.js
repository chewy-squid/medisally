const express = require("express");
const models = require("../models");
const split = require("./parsing");

const router = express.Router();

router.get("/whole", async (req, res) => {
  const userUUID = req.query.UUID;
  const user = await models.User.findOne({
    where: {
      UUID: userUUID,
    },
    include: [
      {
        model: models.SymptomType,
      },
      {
        model: models.Symptom,
      },
      {
        model: models.TreatType,
      },
      {
        model: models.Treat,
      },
    ],
  });
  res.send(user);
});

router.get("/whole-diff", async (req, res) => {
  const userUUID = req.query.UUID;
  const user = await models.User.findOne({
    where: {
      UUID: userUUID,
    },
    include: [
      {
        model: models.SymptomType,
        include: [
          {
            model: models.Symptom,
          },
        ],
      },
      {
        model: models.TreatType,
        include: [
          {
            model: models.Treat,
          },
        ],
      },
    ],
  });
  res.send(user);
});

router.post("/whole", async (req, res) => {
  const request = split(req);
  console.log(request);
  const userUUID = req.query.UUID;
  await models.Symptom.destroy({
    where: {
      userUUID: userUUID,
    },
  });
  await models.Treat.destroy({
    where: {
      userUUID: userUUID,
    },
  });
  await models.SymptomType.destroy({
    where: {
      userUUID: userUUID,
    },
  });
  await models.TreatType.destroy({
    where: {
      userUUID: userUUID,
    },
  });
  await models.User.destroy({
    where: {
      UUID: userUUID,
    },
  });
  await models.User.create(request.user);
  for (type of request.symptomTypes) {
    await models.SymptomType.create(type);
  }
  for (type of request.treatTypes) {
    await models.TreatType.create(type);
  }
  for (record of request.symptoms) {
    await models.Symptom.create(record);
  }
  for (record of request.treats) {
    await models.Treat.create(record);
  }
  res.send("complete");
});

module.exports = router;
