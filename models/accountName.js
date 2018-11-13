export default (sequelize, DataTypes)=>{
    const AccountName = sequelize.define("accountName",{
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
          },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique:true,
        },
        description: {
            type: DataTypes.STRING,
           
        },
        location: {
            type: DataTypes.STRING,
           
        },
        accountName: {
            type: DataTypes.STRING,
           
        },
       
        })


    return AccountName
}