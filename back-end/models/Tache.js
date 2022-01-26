module.exports = (sequelize, Sequelize) => {
    const Tache = sequelize.define(
        "tache", {
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            tache: {
                type: Sequelize.STRING(200),
                allowNull: false,
                defaultValue: "",
            },
            heureDebut: {
                type: Sequelize.TIME,
                defaultValue: '00:00:00',
            },
            heureFin: {
                type: Sequelize.TIME,
                defaultValue: '00:00:00',

            }
        }
    );

    return Tache;
};