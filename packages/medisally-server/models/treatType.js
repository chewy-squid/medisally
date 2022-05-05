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
  return treatType;
};
