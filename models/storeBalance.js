export default (sequelize, DataTypes)=>{
    const StoreBalance = sequelize.define("storeBalance",{
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
          },
        balance: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
 
        
        })

    StoreBalance.associate = (models)=>{
        //1:M
        StoreBalance.belongsTo(models.MaterialsCosting,{
            
            foreignKey: {
                name:'materialscostingId',
                field:'materialscosting_id'
            }
        })

    }
    return StoreBalance
}