export default (sequelize, DataTypes)=>{
    const Personnel = sequelize.define("personnel",{
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
          },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        idNumber: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        nssfId: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        nhifId: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        gender:{ 
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        addressNo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        photoUrl: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        highestEducationLevel: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        certificatesUrl: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        curriculumVitaeUrl: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        dateOfEmployment:{
            type: DataTypes.DATE,
            allowNull:false
        },
        dateOfTermination:{
            type: DataTypes.DATE
            
        },
        currentSalary: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        terminationStatus:{ 
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        reasonsForTermination: {
            type: DataTypes.STRING,
            
        },
        assignedToProject:{ 
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },

        })

    Personnel.associate = (models)=>{
        // 1:M
        Personnel.belongsTo(models.Role,{         
            foreignKey: {
                name:'roleId',
                field:'role_id'
            }
        }),
        Personnel.belongsTo(models.Project,{
            foreignKey:{
                name:'projectId',
                field:'project_id'
            }
        })
        // N:M
        Personnel.belongsToMany(models.Section,{
            through: models.PersonnelSectionAssignment,
            foreignKey: {
                name:'personnelId',
                field:'personnel_id'
            }
        })

    }
    return Personnel
}