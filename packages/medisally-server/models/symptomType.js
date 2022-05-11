module.exports = function (sequelize, DataTypes) {
  const symptomType = sequelize.define(
    "SymptomType",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      color: {
        type: DataTypes.ENUM("color", "color2", "color3"),
        allowNull: false,
      },
      treatTypes: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {}
  );
  symptomType.associate = function (models) {
    symptomType.belongsTo(models.User, {
      foreignKey: "userUUID",
      targetKey: "UUID",
    });
    symptomType.hasMany(models.Symptom, {
      foreignKey: "symptomTypeId",
      sourceKey: "id",
    });
    symptomType.hasMany(models.TreatType, {
      foreignKey: "symptomTypeId",
      sourceKey: "id",
    });
    symptomType.hasMany(models.Treat, {
      foreignKey: "symptomTypeId",
      sourceKey: "id"
    })
  };
  return symptomType;
};
