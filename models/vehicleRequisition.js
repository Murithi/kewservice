export default (sequelize, DataTypes)=>{
    const VehicleRequisition = sequelize.define("vehicleRequisition",{
        vehiclerequisition_id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
          },
        vehicleType: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        estimatedCost: {
            type: DataTypes.INTEGER,
          },
          requestDate:{ 
            type: DataTypes.DATE,
        },
        approvalDate:{
            type: DataTypes.DATE,
        },
        estimatedNoOfHours: {
            type: DataTypes.INTEGER,
          },
        requestStatus: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        }        
        })
        VehicleRequisition.associate = (models)=>{ 
            //1:M
            VehicleRequisition.belongsTo(models.Project,{
                foreignKey:{
                    name:'projectId',
                    field:'project_id'
                }
            }),

            VehicleRequisition.belongsTo(models.PaymentIssue, {
                foreignKey:{
                    name:'paymentIssueId',
                    field:'paymentIssue_id'
                }
            }),

            //n:M
            VehicleRequisition.belongsToMany(models.User,{
                through: models.InitiatedVehicleRequests,
                foreignKey: {
                    name:'vehiclerequisitionId',
                    field:'vehiclerequisition_id'
                }
            }),
            VehicleRequisition.belongsToMany(models.User,{
                through: models.ApprovedVehicleRequests,
                foreignKey: {
                    name:'vehiclerequisitionId',
                    field:'vehiclerequisition_id'
                }
            })
        }
        return VehicleRequisition
    }