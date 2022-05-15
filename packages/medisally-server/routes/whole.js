const express = require("express");
const models = require("../models");
const split = require("./parsing");
const arrToObj = require("./arrToObj");

const router = express.Router();

router.get("/whole", async (req, res) => {
  const userUUID = req.query.UUID;
  const user = await models.User.findOne({
    where: {
      UUID: userUUID,
    },
    attributes: {
      exclude: [
        "nickname",
        "designatedSex",
        "birthDate",
        "UUID",
        "createdAt",
        "updatedAt",
      ],
    },
    include: [
      {
        model: models.SymptomType,
        attributes: {
          exclude: ["createdAt", "updatedAt", "userUUID"],
        },
      },
      {
        model: models.Symptom,
        attributes: {
          exclude: ["createdAt", "updatedAt", "userUUID"],
        },
      },
      {
        model: models.TreatType,
        attributes: {
          exclude: ["createdAt", "updatedAt", "userUUID"],
        },
      },
      {
        model: models.Treat,
        attributes: {
          exclude: ["createdAt", "updatedAt", "userUUID"],
        },
      },
    ],
  });

  user.dataValues.SymptomTypes = arrToObj(user.SymptomTypes);
  user.dataValues.Symptoms = arrToObj(user.Symptoms);
  user.dataValues.TreatTypes = arrToObj(user.TreatTypes);
  user.dataValues.Treats = arrToObj(user.Treats);

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
  const user = await models.User.findOne({
    where: {
      UUID: userUUID,
    },
    attributes: {
      exclude: [
        "nickname",
        "designatedSex",
        "birthDate",
        "UUID",
        "createdAt",
        "updatedAt",
      ],
    },
    include: [
      {
        model: models.SymptomType,
        attributes: {
          exclude: ["createdAt", "updatedAt", "userUUID"],
        },
      },
      {
        model: models.Symptom,
        attributes: {
          exclude: ["createdAt", "updatedAt", "userUUID"],
        },
      },
      {
        model: models.TreatType,
        attributes: {
          exclude: ["createdAt", "updatedAt", "userUUID"],
        },
      },
      {
        model: models.Treat,
        attributes: {
          exclude: ["createdAt", "updatedAt", "userUUID"],
        },
      },
    ],
  });
  user.dataValues.SymptomTypes = arrToObj(user.SymptomTypes);
  user.dataValues.Symptoms = arrToObj(user.Symptoms);
  user.dataValues.TreatTypes = arrToObj(user.TreatTypes);
  user.dataValues.Treats = arrToObj(user.Treats);
  res.send(user);
});

module.exports = router;
