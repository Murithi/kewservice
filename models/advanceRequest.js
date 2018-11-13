export default (sequelize, DataTypes) => {
  const AdvanceRequest = sequelize.define("AdvanceRequest", {
    advanceRequest_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    amountRequested: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    otherDetails: {
      type: DataTypes.STRING
    },
    approvalStatus: {
      type: DataTypes.BOOLEAN,
      default: false
    },
    requestDate: {
      type: DataTypes.DATE
    },
    approvalDate: {
      type: DataTypes.DATE
    },
    issuedCash: {
      type: DataTypes.BOOLEAN,
      default: false
    },
    transactionCompleted: {
      type: DataTypes.BOOLEAN
    }
  });

  AdvanceRequest.associate = models => {
    //1:M
    AdvanceRequest.belongsTo(models.Personnel, {
      foreignKey: {
        name: "personnelId",
        field: "personnel_id"
      }
    }),
      AdvanceRequest.belongsTo(models.PaymentIssue, {
        foreignKey: {
          name: "paymentIssueId",
          field: "paymentIssue_id"
        }
      }),
      // N:M
      AdvanceRequest.belongsToMany(models.User, {
        through: models.InitiatedAdvanceRequests,
        foreignKey: {
          name: "advanceRequestId",
          field: "advanceRequest_id"
        }
      }),
      AdvanceRequest.belongsToMany(models.User, {
        through: models.ApprovedAdvanceRequests,
        foreignKey: {
          name: "advanceRequestId",
          field: "advanceRequest_id"
        }
      });
  };
  return AdvanceRequest;
};
