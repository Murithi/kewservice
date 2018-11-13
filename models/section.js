export default (sequelize, DataTypes)=>{
    const Section = sequelize.define("section",{
        section_id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
          },
        sectionName: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        sectionDescription: {
            type: DataTypes.STRING,
            allowNull: false,

        },

        sectionStartDate:{ 
            type: DataTypes.DATE,
        },
        sectionEndDate:{ 
            type: DataTypes.DATE,
        },
        sectionLocation: {
            type: DataTypes.STRING,
            allowNull: false,

        },
        
        })

    Section.associate = (models)=>{
        // 1:M
        Section.belongsTo(models.Project,{
            
            foreignKey: {
                name:'projectId',
                field:'project_id'
            }
        })

        //N:M
        Section.belongsToMany(models.Personnel,{
            through: models.PersonnelSectionAssignment,
            foreignKey: {
                name:'sectionId',
                field:'section_id'
            }
        })


    }
    return Section
}