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
    symptomType: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    treatType: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    effect: {
      type: DataTypes.ENUM(1, 2, 3),
    },
    memo: {
      type: DataTypes.STRING,
    },
    voice: {
      type: DataTypes.STRING,
    },
    video: {
      type: DataTypes.STRING,
    },
    photo: {
      type: DataTypes.STRING,
    },
  });
  return treat;
};
