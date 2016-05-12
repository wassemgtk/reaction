import { Template } from "meteor/templating";
/*
 * Template taxes Helpers
 */
Template.taxSettings.onCreated(function () {
  this.autorun(() => {
    this.subscribe("TaxCodes");
  });
});

Template.taxSettings.helpers({
  //
  // check if this package setting is enabled
  //
  checked(pkg) {
    let enabled;
    const pkgData = ReactionCore.Collections.Packages.findOne(pkg.packageId);
    const setting = pkg.name.split("/").splice(-1);

    if (pkgData && pkgData.settings) {
      if (pkgData.settings[setting]) {
        enabled = pkgData.settings[setting].enabled;
      }
    }

    return enabled === true ? "checked" : "";
  },
  //
  // get current packages settings data
  //
  packageData() {
    return ReactionCore.Collections.Packages.findOne({
      name: "reaction-taxes"
    });
  },
  //
  // prepare and return taxCodes
  // for default shop value
  //
  taxCodes() {
    const instance = Template.instance();
    if (instance.subscriptionsReady()) {
      const taxCodes = ReactionCore.Collections.TaxCodes.find().fetch();
      const options = [{
        label: i18next.t("app.auto"),
        value: "none"
      }];

      for (let taxCode of taxCodes) {
        options.push({
          label: i18next.t(taxCode.label),
          value: taxCode.id
        });
      }
      return options;
    }
  },
  //
  // Template helper to add a hidden class if the condition is false
  //
  shown(pkg) {
    let enabled;
    const pkgData = ReactionCore.Collections.Packages.findOne(pkg.packageId);
    const setting = pkg.name.split("/").splice(-1);

    if (pkgData && pkgData.settings) {
      if (pkgData.settings[setting]) {
        enabled = pkgData.settings[setting].enabled;
      }
    }

    return enabled !== true ? "hidden" : "";
  }
});

Template.taxSettings.events({
  /**
   * taxSettings settings update enabled status for tax service on change
   * @param  {event} event    jQuery Event
   * @return {void}
   */
  "change input[name=enabled]": (event) => {
    const name = event.target.value;
    const packageId = event.target.getAttribute("data-id");
    const fields = [{
      property: "enabled",
      value: event.target.checked
    }];

    Meteor.call("registry/update", packageId, name, fields);
  },

  /**
   * taxSettings settings show/hide secret key for a tax service
   * @param  {event} event    jQuery Event
   * @return {void}
   */
  "click [data-event-action=showSecret]": (event) => {
    let button = $(event.currentTarget);
    let input = button.closest(".form-group").find("input[name=secret]");

    if (input.attr("type") === "password") {
      input.attr("type", "text");
      button.html("Hide");
    } else {
      input.attr("type", "password");
      button.html("Show");
    }
  }
});
