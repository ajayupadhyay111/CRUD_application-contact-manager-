import { DataTypes } from "sequelize";

export const createUserModel = async (sequelize) => {
  const User = sequelize.define(
    "Contacts",
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isLowercase: true, // ✅ Correct validation format
          isEmail: true, // ✅ Ensure email format is correct
        },
        unique: true,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        validate: {
          isValidPhone(value) {
            if (!/^\+\d{1,3}\s\d{10}$/.test(value)) {
              throw new Error(
                "Phone number must be in the format: +<country_code> <10-digit-number>"
              );
            }
          },
        },
      },
      address: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "contacts",
    }
  );
  return User;
};
