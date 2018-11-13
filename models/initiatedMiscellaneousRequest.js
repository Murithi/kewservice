export default (sequelize, DataTypes)=>{
    const InitiatedMiscellaneousRequest = sequelize.define("initiatedMiscellaneousRequest",{
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
          },

        })
    return InitiatedMiscellaneousRequest
}