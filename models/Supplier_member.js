export default (sequelize, DataTypes)=>{
    const Supplier_member = sequelize.define("supplier_member",{
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
          },

        })
    return Supplier_member
}