export default (sequelize, DataTypes)=>{
    const InitiatedSalaryRequests = sequelize.define("initiatedSalaryRequests",{
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
          },

        })
    return InitiatedSalaryRequests
}