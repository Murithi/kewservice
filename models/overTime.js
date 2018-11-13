export default (sequelize, DataTypes) => {
  const OverTimeRequest = sequelize.define("overTimeRequest", {
    overtimerequest_id: {
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

  OverTimeRequest.associate = models => {
    //1:M
    OverTimeRequest.belongsTo(models.Personnel, {
      foreignKey: {
        name: "personnelId",
        field: "personnel_id"
      }
    }),
      OverTimeRequest.belongsTo(models.PaymentIssue, {
        foreignKey: {
          name: "paymentIssueId",
          field: "paymentIssue_id"
        }
      }),
      // N:M
      OverTimeRequest.belongsToMany(models.User, {
        through: models.InitiatedOverTimeRequests,
        foreignKey: {
          name: "overtimerequestId",
          field: "overtimerequest_id"
        }
      }),
      OverTimeRequest.belongsToMany(models.User, {
        through: models.ApprovedOverTimeRequests,
        foreignKey: {
          name: "overtimerequestId",
          field: "overtimerequest_id"
        }
      });
  };
  return OverTimeRequest;
};
