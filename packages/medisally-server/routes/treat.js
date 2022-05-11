const express = require("express");
const models = require("../models");

const router = express.Router();

router.post("/treat", async (req, res) => {
  let symptomId = 0;
  const body = req.body;
  const {
    time,
    importance,
    treatType,
    effect,
    memo,
    voiceUrl,
    videoUrl,
    imageUrls,
  } = body;

  if (req.query.symptomId) {
    symptomId = req.query.symptomId;
    const causeSymptom = await models.Symptom.findOne({
      where: {
        id: symptomId,
      },
    });
    models.Treat.create({
      symptomId,
      time,
      importance,
      treatType,
      effect,
      memo,
      voiceUrl,
      videoUrl,
      imageUrls,
      symptom: causeSymptom.dataValues,
    }).then((result) => {
      res.send(result);
    });
  } else {
    models.Treat.create({
      time,
      importance,
      treatType,
      effect,
      memo,
      voiceUrl,
      videoUrl,
      imageUrls,
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
