import Sequelize from "sequelize";
// Test credentials
const sequelize = new Sequelize("kewaservice", "postgres", "postgres", {
  define: {
    underscored: true
  },
  dialect: "postgres"
});
// const sequelize = new Sequelize('kewaservice', 'kewauser', 'kewaservice', {
//   define: {
//     underscored: true
//   },
//   dialect: 'postgres'
// });

const models = {
  InitiatedMiscellaneousRequest: sequelize.import(
    "./initiatedMiscellaneousRequest"
  ),
  ApprovedMiscellaneousRequest: sequelize.import(
    "./approvedMiscellaneousRequest"
  ),

  InitiatedMaterialRequests: sequelize.import("./initiatedMaterialRequests"),
  ApprovedMaterialRequests: sequelize.import("./approvedMaterialRequests"),
  InitiatedFuelRequests: sequelize.import("./initiatedFuelRequisition"),
  ApprovedFuelRequests: sequelize.import("./approvedFuelRequisitions"),
  InitiatedRequestService: sequelize.import("./initiatedRequestService"),
  ApprovedRequestService: sequelize.import("./approvedRequestService"),
  InitiatedRepairsRequest: sequelize.import("./initiatedRepairsRequest"),
  ApprovedRepairsRequest: sequelize.import("./approvedRepairsRequest"),
  InitiatedVehicleInspection: sequelize.import("./initiatedVehicleInspection"),
  ApprovedVehicleInspection: sequelize.import("./approvedVehicleInspection"),
  InitiatedSalaryRequests: sequelize.import("./initiatedSalaryRequests"),
  ApprovedSalaryRequests: sequelize.import("./approvedSalaryRequests"),
  InitiatedAdvanceRequests: sequelize.import("./initiatedAdvanceRequests"),
  ApprovedAdvanceRequests: sequelize.import("./approvedAdvanceRequests"),

  InitiatedVehicleRequests: sequelize.import("./initiatedVehicleRequests"),
  ApprovedVehicleRequests: sequelize.import("./approvedVehicleRequests"),
  InitiatedOverTimeRequests: sequelize.import("./initiatedOverTimeRequests.js"),
  ApprovedOverTimeRequests: sequelize.import("./approvedOverTimeRequests.js"),
  OverTimeRequest: sequelize.import("./overTime.js"),
  MiscellaneousRequisition: sequelize.import("./miscellaneousRequisition"),
  Supplier_member: sequelize.import("./Supplier_member"),
  PersonnelSectionAssignment: sequelize.import("./personnelSectionAssignment"),
  CashBalance: sequelize.import("./cashBalance"),
  MaterialsCosting: sequelize.import("./materialsCosting"),
  Supplier: sequelize.import("./supplier"),
  MaterialRequisition: sequelize.import("./materialRequisition"),
  VehicleOwner: sequelize.import("./vehicleOwner"),
  Vehicle: sequelize.import("./vehicle"),
  RequestService: sequelize.import("./requestService"),
  RepairsRequisition: sequelize.import("./repairsRequisition"),
  VehicleInspection: sequelize.import("./vehicleInspection"),
  AdvanceRequest: sequelize.import("./advanceRequest"),
  AccountName: sequelize.import("./accountName"),
  Salary: sequelize.import("./salaryRequest"),
  FuelRequisition: sequelize.import("./fuelRequisition"),
  VehicleRequisition: sequelize.import("./vehicleRequisition"),
  User: sequelize.import("./user"),
  Role: sequelize.import("./role"),

  Section: sequelize.import("./section"),
  Project: sequelize.import("./project"),
  Personnel: sequelize.import("./personnel"),
  OtherPaymentIssue: sequelize.import("./otherPaymentIssue"),
  PaymentIssue: sequelize.import("./paymentIssue"),
  PersonnelAttendanceRoll: sequelize.import("./personnelAttendanceRoll"),
  StoreBalance: sequelize.import("./storeBalance"),
  StoreTransaction: sequelize.import("./storeTransaction"),
  VehicleAssignment: sequelize.import("./vehicleAssignment")
};
Object.keys(models).forEach(modelName => {
  if ("associate" in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;

models.Sequelize = Sequelize;

export default models;
