module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define(
        "user", {

            username: {
                type: Sequelize.STRING(50),
                allowNull: false,
                defaultValue: "",
            },
            email: {
                type: Sequelize.STRING(100),
                allowNull: false,
                defaultValue: "",
                unique: true
            },
            password: {
                type: Sequelize.STRING(250),
                allowNull: false,
                defaultValue: "",
            },
            isAdmin: {
                type: Sequelize.BOOLEAN,

            }
        },
    );

    return User;
};