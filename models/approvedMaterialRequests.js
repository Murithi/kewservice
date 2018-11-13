export default (sequelize, DataTypes)=>{
    const ApprovedMaterialRequests = sequelize.define("approvedMaterialRequests",{
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
          },

        })
    return ApprovedMaterialRequests
}