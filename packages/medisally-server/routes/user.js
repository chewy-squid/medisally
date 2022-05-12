const express = require("express");
const models = require("../models");

const router = express.Router();

router.get("/user", (req, res) => {
  const UUID = req.query.UUID;
  models.User.findOne({
    where: {
      UUID: UUID,
    },
  })
    .then((result) => {
      res.send({
        user: result,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(400).send("유저 조회에 에러 발생");
    });
});

router.post("/user", (req, res) => {
  const body = req.body;
  const { nickname, designatedSex, birthDate } = body;
  if (!nickname || !designatedSex || !birthDate) {
    res.status(400).send("필수 입력 항목을 입력하지 않음");
  }
  models.User.create({
    nickname,
    designatedSex,
    birthDate,
  })
    .then((result) => {
      console.log("유저 생성 결과 :", result);
      res.send({
        result,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(400).send("유저 생성에 문제가 발생했습니다.");
    });
});

module.exports = router;
