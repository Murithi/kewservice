export default (sequelize, DataTypes) => {
  const MiscellaneousRequisition = sequelize.define('miscellaneousRequisition', {
    miscellaneousrequisition_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    misceltype: {
      type: DataTypes.STRING
    },
    amountRequested: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    otherDetails: {
      type: DataTypes.STRING
    },
    paymentMode: {
      type: DataTypes.STRING
    },
    approvalStatus: {
      type: DataTypes.BOOLEAN,
      default: false,
      allowNull: false
    },
    approvalDate: {
      type: DataTypes.DATE
    },
    issuedCash: {
      type: DataTypes.BOOLEAN,
      default: false,
      allowNull: false
    },
    transactionCompleted: {
      type: DataTypes.BOOLEAN,
      default: false
    },
    requestDate: {
      type: DataTypes.DATE
    }
  });

  MiscellaneousRequisition.associate = models => {
    MiscellaneousRequisition.belongsTo(models.PaymentIssue, {
      foreignKey: {
        name: 'paymentIssueId',
        field: 'paymentIssue_id'
      }
    }),
      MiscellaneousRequisition.belongsTo(models.OtherPaymentIssue, {
        foreignKey: {
          name: 'otherpaymentId',
          field: 'otherpayment_id'
        }
      }),
      // N:M
      MiscellaneousRequisition.belongsToMany(models.User, {
        through: models.InitiatedMiscellaneousRequest,
        foreignKey: {
          name: 'miscellaneousequisitionId',
          field: 'miscellaneousrequisition_id'
        }
      }),
      MiscellaneousRequisition.belongsToMany(models.User, {
        through: models.ApprovedMiscellaneousRequest,
        foreignKey: {
          name: 'miscellaneousrequisitionId',
          field: 'miscellaneousrequisition_id'
        }
      });
  };

  return MiscellaneousRequisition;
};
