export default (sequelize, DataTypes)=>{
    const Role = sequelize.define("role",{
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
          },
        roleName: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
 
        },
        
        minimumSalary: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        maximumSalary: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description:{ 
            type: DataTypes.STRING,
        } 
 
        
        })

    Role.associate = (models)=>{
        // N:M
        // Role.belongsToMany(models.Personnel,{
        //     through: 'rolepersonnel',
        //     foreignKey: {
        //         name:'personnelId',
        //         field:'personnel_id'
        //     }
        // })

    }
    return Role
}