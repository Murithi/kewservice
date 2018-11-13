export default (sequelize, DataTypes)=>{
    const InitiatedFuelRequests = sequelize.define("initiatedFuelRequests",{
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
          },

        })
    return InitiatedFuelRequests
}