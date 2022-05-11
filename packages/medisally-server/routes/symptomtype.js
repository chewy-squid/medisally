const express = require("express");
const models = require("../models");

const router = express.Router();

router.post("/symptom-type", async (req, res) => {
  const userUUID = req.query.UUID;
  console.log(userUUID);
  const body = req.body;
  const { name, color, treatType } = body;
  if (!name || !color) {
    res.status(400).send("필수 입력 항목을 입력하지 않음");
  }
  console.log(name, color, treatType);
  const user = await models.User.findOne({
    where: {
      UUID: userUUID,
    },
  });
  models.SymptomType.create({
    UserUUID: userUUID,
    name,
    color,
    treatType,
    user: user.dataValues,
  }).then((result) => {
    res.send(result);
  });
});

//유저 별 symptom-type 불러오기
router.get("/symptom-type", async (req, res) => {
  const userUUID = req.query.UUID;
  models.User.findOne({
    where: {
      UUID: userUUID,
    },
    include: [
      {
        model: models.SymptomType,
      },
    ],
  })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
