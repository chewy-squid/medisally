module.exports = function (sequelize, DataTypes) {
  const treatType = sequelize.define("TreatType", {
    user: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  treatType.associate = function (models) {
    treatType.belongsTo(models.SymptomType, {
      foreignKey: "symptomTypeId",
      targetKey: "id",
    });
    treatType.hasMany(models.Treat, {
      foreignKey: "treatTypeId",
      targetKey: "id",
    });
    treatType.belongsTo(models.User, {
      foreignKey: "userUUID",
      targetKey: "UUID",
    });
  };
  return treatType;
};
