export default (sequelize, DataTypes)=>{
    const MaterialsCosting = sequelize.define("materialsCosting",{
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
          },
        materialName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        materialDescription: {
            type: DataTypes.STRING,

        },
        units: {
            type: DataTypes.INTEGER,
   
        },
        costPerUnit: {
            type: DataTypes.INTEGER,
   
        },
        standardUnit: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        
        })

    MaterialsCosting.associate = (models)=>{
        //1:M
   
        MaterialsCosting.belongsTo(models.User,{
            foreignKey:{
                name: 'userlId',
                field:'user_id',
            }
        })
        //N:M
        MaterialsCosting.belongsToMany(models.Supplier,{
            through: models.Supplier_member,
            foreignKey:{
                name:'materialscostingId',
                field:'materialscosting_id',
            }
        })
  


    }
    return MaterialsCosting
}