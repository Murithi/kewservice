export default (sequelize, DataTypes)=>{
    const ApprovedRepairsRequest = sequelize.define("approvedRepairsRequest",{
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
          },

        })
    return ApprovedRepairsRequest
}