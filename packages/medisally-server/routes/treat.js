const express = require("express");
const models = require("../models");

const router = express.Router();

router.post("/treat", (req, res) => {
  const symptomId = undefined;
  const body = req.body;
  const {
    time,
    importance,
    symptomType,
    treatType,
    effect,
    memo,
    voiceUrl,
    videoUrl,
    imageUrls,
  } = body;
  if (!time || !importance || !symptomType || !treatType) {
    res.status(400).send("필수 입력 항목을 입력하지 않음");
  }
  if (req.query.symptomId) {
    symptomId = req.query.symptomId;
    models.Symptom.findOne({
      where: {
        symptomId: id,
      },
    })
      .then((causeSymptom) => {
        models.Symptom.creat({
          symptomId,
          time,
          importance,
          symptomType,
          treatType,
          effect,
          memo,
          voiceUrl,
          videoUrl,
          imageUrls,
          symptom: causeSymptom.dataValues,
        });
      })
      .then((result) => {
        res.send(result);
      });
  } else {
    models.Symptom.create({
      time,
      importance,
      symptomType,
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
