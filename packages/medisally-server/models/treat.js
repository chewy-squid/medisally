module.exports = function (sequelize, DataTypes) {
  const treat = sequelize.define("Treat", {
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
    effect: {
      type: DataTypes.ENUM(1, 2, 3),
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
  treat.associate = function (models) {
    treat.belongsTo(models.Symptom, {
      foreignKey: "symptomId",
      targetKey: "id",
      constraints: false,
    });
    treat.hasMany(models.Symptom, {
      foreignKey: "treatId",
      sourceKey: "id",
      constraints: false,
    });
    treat.belongsTo(models.User, {
      foreignKey: "userUUID",
      targetKey: "UUID",
    });
    treat.belongsTo(models.TreatType, {
      foreignKey: "treatTypeId",
      targetKey: "id",
    });
    treat.belongsTo(models.SymptomType, {
      foreignKey: "symptomTypeId",
      targetKey: "id",
    });
  };
  return treat;
};
