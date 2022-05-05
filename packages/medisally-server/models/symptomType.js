module.exports = function (sequelize, DataTypes) {
  const symptomType = sequelize.define("SymptomType", {
    user: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
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
      allowNull: false,
    },
  });
  return symptomType;
};
