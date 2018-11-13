export default (sequelize, DataTypes)=>{
    const User = sequelize.define("user",{
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
          },
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        userRole: {
            type: DataTypes.ENUM,
            values: ['USER', 'ACCOUNTANT', 'SUPERUSER', 'DIRECTOR', 'ADMIN' ]
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        locked:{ 
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        authorized:{ 
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        
        })

    User.associate = (models)=>{
        //1:M
        // User.belongsTo(models.Role,{
        //     foreignKey: {
        //         name:'roleId',
        //         field:'role_id'
        //     }
        // }),
        User.belongsTo(models.Personnel,{
            foreignKey:{
                name: 'personnelId',
                field:'personnel_id',
            }
        }),
        User.belongsToMany(models.MaterialRequisition,{
            through: models.InitiatedMaterialRequests,
            foreignKey: {
                name:'userId',
                field:'user_id'
            }
        }),
        User.belongsToMany(models.MaterialRequisition,{
            through: models.ApprovedMaterialRequests,
            foreignKey: {
                name:'userId',
                field:'user_id'
            }
        }),
        User.belongsToMany(models.RequestService,{
            through: models.InitiatedRequestService,
            foreignKey: {
                name:'userId',
                field:'user_id'
            }
        }),
        User.belongsToMany(models.RequestService,{
            through: models.ApprovedRequestService,
            foreignKey: {
                name:'userId',
                field:'user_id'
            }
        }),
        User.belongsToMany(models.RepairsRequisition,{
            through: models.InitiatedRepairsRequest,
            foreignKey: {
                name:'userId',
                field:'user_id'
            }
        }),
        User.belongsToMany(models.RepairsRequisition,{
            through: models.ApprovedRepairsRequest,
            foreignKey: {
                name:'userId',
                field:'user_id'
            }
        }),


        User.belongsToMany(models.VehicleInspection,{
            through: models.InitiatedVehicleInspection,
            foreignKey: {
                name:'userId',
                field:'user_id'
            }
        }),
        User.belongsToMany(models.VehicleInspection,{
            through: models.ApprovedVehicleInspection,
            foreignKey: {
                name:'userId',
                field:'user_id'
            }
        }),

        User.belongsToMany(models.AdvanceRequest,{
            through: models.InitiatedAdvanceRequests,
            foreignKey: {
                name:'userId',
                field:'user_id'
            }
        }),
        User.belongsToMany(models.AdvanceRequest,{
            through: models.ApprovedAdvanceRequests,
            foreignKey: {
                name:'userId',
                field:'user_id'
            }
        }),

        User.belongsToMany(models.Salary,{
            through: models.InitiatedSalaryRequests,
            foreignKey: {
                name:'userId',
                field:'user_id'
            }
        }),
        User.belongsToMany(models.Salary,{
            through: models.ApprovedSalaryRequests,
            foreignKey: {
                name:'userId',
                field:'user_id'
            }
        }),
        User.belongsToMany(models.FuelRequisition,{
            through: models.InitiatedFuelRequests,
            foreignKey: {
                name:'userId',
                field:'user_id'
            }
        }),
        User.belongsToMany(models.FuelRequisition,{
            through: models.ApprovedFuelRequests,
            foreignKey: {
                name:'userId',
                field:'user_id'
            }
        })
        User.belongsToMany(models.VehicleRequisition,{
            through: models.InitiatedVehicleRequests,
            foreignKey: {
                name:'userId',
                field:'user_id'
            }
        }),
        User.belongsToMany(models.VehicleRequisition,{
            through: models.ApprovedVehicleRequests,
            foreignKey: {
                name:'userId',
                field:'user_id'
            }
        }),
        User.belongsToMany(models.OverTimeRequest,{
            through: models.InitiatedOverTimeRequests,
            foreignKey: {
                name:'userId',
                field:'user_id'
            }
        }),
        User.belongsToMany(models.OverTimeRequest,{
            through: models.ApprovedOverTimeRequests,
            foreignKey: {
                name:'userId',
                field:'user_id'
            }
        })


    }
    return User
}