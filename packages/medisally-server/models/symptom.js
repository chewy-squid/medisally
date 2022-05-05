module.exports = function (sequelize, DataTypes) {
  const symptom = sequelize.define("Symptom", {
    time: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    importance: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    symptomType: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fiveScale: {
      type: DataTypes.ENUM(1, 2, 3, 4, 5),
    },
    numbScale: {
      type: DataTypes.FLOAT,
    },
    scaleType: {
      type: DataTypes.ENUM("fiveScale", "numbScale"),
      allowNull: false,
    },
    memo: {
      type: DataTypes.STRING,
    },
    voiceUrl: {
      type: DataTypes.STRING,
    },
    videoUrl: {
      type: DataTypes.STRING,
    },
    imageUrls: {
      type: DataTypes.STRING,
    },
  });
  return symptom;
};
