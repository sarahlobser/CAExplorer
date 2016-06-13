module.exports = function(sequelize, DataTypes) {
    var Favorite = sequelize.define("Favorite", {
        author : {
            type: DataTypes.STRING
        }, 
        imageurl : {
            type: DataTypes.STRING
        },
        date_created : {
            type: DataTypes.STRING
        },
        ruleset : {
            type: DataTypes.STRING,
            allowNull : false,
        },
        views : {
            type: DataTypes.INTEGER,
        },
        rating : {
            type: DataTypes.INTEGER,
        }
    });

    return Favorite;
}