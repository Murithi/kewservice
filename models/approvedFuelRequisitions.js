export default (sequelize, DataTypes)=>{
    const ApprovedFuelRequests = sequelize.define("approvedFuelRequests",{
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
          },

        })
    return ApprovedFuelRequests
}