export default (sequelize, DataTypes)=>{
    const Supplier = sequelize.define("Supplier",{
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
          },
        supplierName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        supplierPhone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        negotiatedRate: {
            type: DataTypes.INTEGER,
   
        },
        otherDetails: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        
        })

    Supplier.associate = (models)=>{
        //1:M
         Supplier.belongsTo(models.User,{
            foreignKey:{
                name: 'userlId',
                field:'user_id',
            }
        })
        
        // N:M
        Supplier.belongsToMany(models.MaterialsCosting,{
            through: models.Supplier_member,
            foreignKey:{
                name:'supplierId',
                field:'supplier_id',
            }
        })
    }
    return Supplier
}