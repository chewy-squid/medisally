module.exports = function (sequelize, DataTypes) {
  const user = sequelize.define("User", {
    nickname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    desigSex: {
      type: DataTypes.ENUM("female", "male"),
      allowNull: false,
    },
    birthDate: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    UUID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
  });
  return user;
};
