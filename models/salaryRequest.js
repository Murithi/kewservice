export default (sequelize, DataTypes) => {
  const SalaryRequest = sequelize.define("salaryRequest", {
    salaryrequest_id: {
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

  SalaryRequest.associate = models => {
    //1:M
    SalaryRequest.belongsTo(models.Personnel, {
      foreignKey: {
        name: "personnelId",
        field: "personnel_id"
      }
    }),
      SalaryRequest.belongsTo(models.PaymentIssue, {
        foreignKey: {
          name: "paymentIssueId",
          field: "paymentIssue_id"
        }
      }),
      // N:M
      SalaryRequest.belongsToMany(models.User, {
        through: models.InitiatedSalaryRequests,
        foreignKey: {
          name: "salaryrequestId",
          field: "salaryrequest_id"
        }
      }),
      SalaryRequest.belongsToMany(models.User, {
        through: models.ApprovedSalaryRequests,
        foreignKey: {
          name: "salaryrequestId",
          field: "salaryrequest_id"
        }
      });
  };
  return SalaryRequest;
};
