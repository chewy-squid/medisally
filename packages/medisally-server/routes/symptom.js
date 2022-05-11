const express = require("express");
const models = require("../models");

const router = express.Router();

//증상 등록하기
router.post("/symptom", async (req, res) => {
  let treatId = 0;
  const symptomTypeId = req.query.symptomTypeId;
  const userUUID = req.query.userUUID;
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
    const causeTreat = await models.Treat.findOne({
      where: {
        id: treatId,
      },
    });

    models.Symptom.create({
      userUUID,
      symptomTypeId,
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
      user: user.dataValues,
      treat: causeTreat.dataValues,
      symptomType: symptomType.dataValues,
    }).then((result) => {
      res.send(result);
    });
  } else {
    models.Symptom.create({
      userUUID,
      symptomTypeId,
      time,
      importance,
      fiveScale,
      numbScale,
      scaleType,
      memo,
      voiceUrl,
      videoUrl,
      imageUrls,
      user: user.dataValues,
      symptomType: symptomType.dataValues,
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

//유저별 증상 가져오기
router.get("/symptom", async (req, res) => {});

//증상 종류별 증상 가져오기

//날짜별 증상 가져오기

//증상 지정, 날짜별 증상 가져오기

module.exports = router;
