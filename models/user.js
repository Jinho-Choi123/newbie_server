module.exports = (sequelize, Datatype) =>{
    return sequelize.define('user', {
        usermail: {
            type: Datatype.STRING(20),
            allowNull: false,
            unique: true,
        },
        password: {
            type: Datatype.STRING(100)
        }
    })
}