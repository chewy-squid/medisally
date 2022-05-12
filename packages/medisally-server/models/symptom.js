module.exports = function (sequelize, DataTypes) {
  const symptom = sequelize.define(
    "Symptom",
    {
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
      fiveScale: {
        type: DataTypes.ENUM(1, 2, 3, 4, 5),
      },
      numberScale: {
        type: DataTypes.FLOAT,
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
    },
    {}
  );
  symptom.associate = function (models) {
    symptom.belongsTo(models.User, {
      foreignKey: "userUUID",
      targetKey: "UUID",
    });
    symptom.belongsTo(models.SymptomType, {
      foreignKey: "symptomTypeId",
      targetKey: "id",
    });
    symptom.belongsTo(models.Treat, {
      foreignKey: "treatId",
      targetKey: "id",
      constraints: false,
    });
    symptom.hasMany(models.Treat, {
      foreignKey: "symptomId",
      sourceKey: "id",
      constraints: false,
    });
  };

  return symptom;
};
