export default (sequelize, DataTypes)=>{
    const StoreTransaction = sequelize.define("storeTransaction",{
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
          },
        balanceBefore: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        balanceAfter: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        unitsTransacted: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        transactionType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        transactionDate:{ 
            type: DataTypes.DATE,
        },
        deliveryNote: {
            type: DataTypes.STRING,
         
        },       
        
        })

    StoreTransaction.associate = (models)=>{

        //1:M
        StoreTransaction.belongsTo(models.Project, {
            foreignKey: {
                name:'projectId',
                field:'project_id'
            }
        }),

        StoreTransaction.belongsTo(models.Supplier, {
            foreignKey: {
                name:'supplierId',
                field:'supplier_id'
            }
        }),

        StoreTransaction.belongsTo(models.MaterialsCosting,{
          
            foreignKey: {
                name:'materialsCostingId',
                field:'materialsCosting_id'
            }
        }),

        StoreTransaction.belongsTo(models.User, {
            foreignKey: {
                name:'userId',
                field:'user_id'
            }
        })
        
      

    }
    return StoreTransaction
}