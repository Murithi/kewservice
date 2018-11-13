export default (sequelize, DataTypes)=>{
    const PersonnelAttendanceRoll = sequelize.define("personnelAttendanceRoll",{
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
          },
        dateOfAttendance:{ 
            type: DataTypes.DATE,
            allowNull:false,
        },
        inAttendance: {
            type: DataTypes.BOOLEAN,
            allowNull:false,
        },
        reportingTime:{ 
            type: DataTypes.DATE,
            allowNull:false,
        },
        exitTime:{ 
            type: DataTypes.DATE,
            allowNull:false,
        },
        })

    PersonnelAttendanceRoll.associate = (models)=>{
        //1:M
        PersonnelAttendanceRoll.belongsTo(models.Personnel, {
            foreignKey: {
                name: 'personnelId',
                'field': 'personnel_id'
            }
        })
        

    }
    return PersonnelAttendanceRoll
}