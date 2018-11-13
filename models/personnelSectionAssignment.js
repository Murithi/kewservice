export default (sequelize, DataTypes)=>{
    const PersonnelSectionAssignment = sequelize.define('personnelSectionAssignment', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
          },
        dateAssigned: {
            type: DataTypes.DATE
        },
        dateRelieved: {
            type: DataTypes.DATE
        },
        
    })
    return PersonnelSectionAssignment
}