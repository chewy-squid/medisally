const express = require("express");
const models = require("../models");

const router = express.Router();

router.post("/symptom", (req, res) => {
  const treatId = undefined;
  const body = req.body;
  const {
    time,
    importance,
    fiveScale,
    numbScale,
    scaleType,
    memo,
    voiceUrl,
    videoUrl,
    imageUrls,
  } = body;
  if (!time || !importance || !scaleType) {
    res.status(400).send("필수 입력 항목을 입력하지 않음");
  }
  if (req.query.treatId) {
    treatId = req.query.treatId;
    models.Treat.findOne({
      where: {
        treatId: id,
      },
    })
      .then((causeTreat) => {
        models.Symptom.create({
          treatId,
          time,
          importance,
          fiveScale,
          numbScale,
          scaleType,
          memo,
          voiceUrl,
          videoUrl,
          imageUrls,
          treat: causeTreat.dataValues,
        });
      })
      .then((result) => {
        res.send(result);
      });
  } else {
    models.Symptom.create({
      time,
      importance,
      fiveScale,
      numbScale,
      scaleType,
      memo,
      voiceUrl,
      videoUrl,
      imageUrls,
    })
      .then((result) => {
        console.log("증상 기록 생성 결과 :", result);
        res.send({
          result,
        });
      })
      .catch((err) => {
        console.error(err);
        res.status(400).send("증상 기록 생성에 문제가 발생했습니다.");
      });
  }
});

module.exports = router;
