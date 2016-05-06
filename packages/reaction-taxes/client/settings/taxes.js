/*
 * Template taxes Helpers
 */
Template.taxSettings.onCreated(function () {
  this.autorun(() => {
    this.subscribe("Taxes");
  });
});

Template.taxSettings.helpers({
  packageData() {
    return ReactionCore.Collections.Packages.findOne({
      name: "reaction-taxes"
    });
  },
  taxes() {
    const instance = Template.instance();
    if (instance.subscriptionsReady()) {
      return ReactionCore.Collections.Taxes.find({
        shopId: ReactionCore.getShopId()
      });
    }
  }
});

// Template.taxesProviderTable.onCreated(function () {
//   this.autorun(() => {
//     this.subscribe("Taxes");
//   });
// });

//
// Template.taxesDashboardControls.events({
//   "click [data-event-action=addShippingProvider]": function () {
//     ReactionCore.showActionView({
//       label: "Add Shipping Provider",
//       template: "addShippingProvider"
//     });
//   }
// });
