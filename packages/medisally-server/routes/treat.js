const express = require("express");
const models = require("../models");

const router = express.Router();

router.post("/treat", async (req, res) => {
  let symptomId = 0;
  const treatTypeId = req.query.treatTypeId;
  const userUUID = req.query.UUID;
  const symptomTypeId = req.query.symptomTypeId;
  const treatType = await models.TreatType.findOne({
    where: {
      id: treatTypeId,
    },
  });
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
  const body = req.body;
  const { time, importance, effect, memo, voiceUrl, videoUrl, imageUrls } =
    body;

  if (!time || importance === undefined) {
    res.status(400).send("필수 입력 항목을 입력하지 않음");
  }

  if (req.query.symptomId) {
    symptomId = req.query.symptomId;
    const causeSymptom = await models.Symptom.findOne({
      where: {
        id: symptomId,
      },
    });
    models.Treat.create({
      treatTypeId,
      userUUID,
      symptomTypeId,
      symptomId,
      time,
      importance,
      effect,
      memo,
      voiceUrl,
      videoUrl,
      imageUrls,
      symptom: causeSymptom.dataValues,
      treatType: treatType.dataValues,
      user: user.dataValues,
      symptomType: symptomType,
    }).then((result) => {
      res.send(result);
    });
  } else {
    models.Treat.create({
      treatTypeId,
      userUUID,
      symptomTypeId,
      time,
      importance,
      effect,
      memo,
      voiceUrl,
      videoUrl,
      imageUrls,
      treatType: treatType.dataValues,
      user: user.dataValues,
      symptomType: symptomType.dataValues,
    })
      .then((result) => {
        console.log("복약/처치 기록 생성 결과 :", result);
        res.send({
          result,
        });
      })
      .catch((err) => {
        console.error(err);
        res.status(400).send("복약/처치 기록 생성에 문제가 발생했습니다.");
      });
  }
});

module.exports = router;
