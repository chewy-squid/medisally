const express = require("express");
const cors = require("cors");
const models = require("./models");
const dayjs = require("dayjs");
const { Op } = require("sequelize");
const multer = require("multer");
const userRouter = require("./routes/user.js");
const symptomTypeRouter = require("./routes/symptomtype.js");
const symptomRouter = require("./routes/symptom.js");
const treatRouter = require("./routes/treat.js");

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

app.use("/", userRouter);
app.use("/", symptomTypeRouter);
app.use("/", symptomRouter);
app.use("/", treatRouter);

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, "uploads/");
    },
    filename(req, file, done) {
      //"파일명+현재시간" 이름으로 파일이 업로드됨.
      done(
        null,
        file.originalname +
          String(dayjs(Date.now()).format("YYYY-MM-DD HH-mm-ss"))
      );
    },
  }),
});

//이미지 url array 되돌려주기
app.post("/image", upload.array("images"), (req, res) => {
  const files = req.files;
  const imageUrls = [];
  for (const imageInfo of files) {
    imageUrls.push(imageInfo.path);
  }
  res.send({ imageUrls: imageUrls });
});

//비디오 url 되돌려주기
app.post("/video", upload.single("video"), (req, res) => {
  const file = req.file;
  res.send({
    videoUrl: file.path,
  });
});

//voice url 되돌려주기
app.post("/voice", upload.single("voice"), (req, res) => {
  const file = req.file;
  res.send({
    voiceUrl: file.path,
  });
});

//증상 기록 수정하기
app.put("/symptoms/:id", (req, res) => {
  const body = req.body;
  const {
    time,
    importance,
    symptomType,
    fiveScale,
    numbScale,
    scaleType,
    memo,
    voiceUrl,
    videoUrl,
    imageUrls,
  } = body;
  const params = req.params;
  const { id } = params;
  models.Symptom.update(
    {
      time: time,
      importance: importance,
      symptomType: symptomType,
      fiveScale: fiveScale,
      numbScale: numbScale,
      scaleType: scaleType,
      memo: memo,
      voiceUrl: voiceUrl,
      videoUrl: videoUrl,
      imageUrls: imageUrls,
    },
    {
      where: {
        id: id,
      },
    }
  )
    .then((result) => {
      res.send({
        result,
      });
    })
    .catch((error) => {
      res.status(400).send(`${id}번 증상 업데이트에 에러 발생`);
    });
});

//증상 기록 삭제하기
app.delete("/symptoms/:id", (req, res) => {
  const params = req.params;
  const { id } = params;
  models.Symptom.destroy({
    where: {
      id: id,
    },
  });
  res.send("Delete Request Sent");
});

//증상 종류별 증상 기록 모두 불러오기
app.get("/symptomsByType", (req, res) => {
  const symptomType = req.query.symptomType;
  models.Symptom.findAll({
    where: {
      symptomType: symptomType,
    },
  })
    .then((result) => {
      res.send({
        symptoms: result,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(400).send("증상 종류별 증상 기록 조회에 에러 발생");
    });
});

//증상 종류별 복약/처치 기록 모두 조회하기
app.get("/treats", (req, res) => {
  const symptomType = req.query.symptomType;
  models.Treat.findAll({
    where: {
      symptomType: symptomType,
    },
  })
    .then((result) => {
      res.send({
        treats: result,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(400).send("증상 종류별 복약/처치 기록 조회에 에러 발생");
    });
});

//날짜별 복약/처치 기록 모두 불러오기
app.get("/treatsByDate", (req, res) => {
  const time = dayjs(req.query.time).format("YYYY-MM-DD");
  console.log(time);
  const startTime = new Date(String(time));
  console.log(startTime);
  const endTime = new Date(String(time) + " 23:59:59");
  console.log(endTime);
  models.Treat.findAll({
    where: {
      [Op.or]: [
        { time: { [Op.between]: [startTime, endTime] } },
        { time: startTime },
      ],
    },
  })
    .then((result) => {
      res.send({
        treats: result,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(400).send("날짜별 복약/처치 기록 조회에 에러 발생");
    });
});

app.listen(port, () => {
  console.log(`medisally server listening on port ${port}`);
  models.sequelize
    .sync()
    .then(() => {
      console.log("DB 연결 성공");
    })
    .catch((err) => {
      console.error(err);
      console.log("DB 연결 에러");
      process.exit();
    });
});
