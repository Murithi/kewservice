export default (sequelize, DataTypes)=>{
    const ApprovedSalaryRequests = sequelize.define("approvedSalaryRequests",{
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
          },

        })
    return ApprovedSalaryRequests
}