export default (sequelize, DataTypes)=>{
    const Project = sequelize.define("project",{
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
          },
        projectName: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        projectDescription: {
            type: DataTypes.STRING,
            allowNull: false,

        },
        projectValuation: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        projectStartDate:{ 
            type: DataTypes.DATE,
        },
        projectCompletionDate:{ 
            type: DataTypes.DATE,
        },
        projectLocation: {
            type: DataTypes.STRING,
            allowNull: false,

        },
        
        })

    // Project.associate = (models)=>{
    //     // N:M
    //     // Project.belongsToMany(models.Personnel,{
    //     //     through: 'Projectpersonnel',
    //     //     foreignKey: {
    //     //         name:'personnelId',
    //     //         field:'personnel_id'
    //     //     }
    //     // })

    // }
    return Project
}