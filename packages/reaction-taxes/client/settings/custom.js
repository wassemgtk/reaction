// import { checkNpmVersions } from "meteor/tmeasday:check-npm-versions";
import {
  Template
} from "meteor/templating";
import {
  MeteorGriddle
} from "meteor/utilities:meteor-griddle";

Template.customTaxRates.onCreated(function () {
  this.autorun(() => {
    this.subscribe("Taxes");
  });
});

Template.customTaxRates.helpers({
  countryOptions: function () {
    return ReactionCore.Collections.Countries.find().fetch();
  },
  filteredFields() {
    return ["taxCode", "country", "region", "postal", "rate"];
  },
  Taxes() {
    return ReactionCore.Collections.Taxes;
  },
  packageData() {
    return ReactionCore.Collections.Taxes.find();
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
  griddleTable() {
    return MeteorGriddle;
  },
  editRow() {
    return;
  }
});


AutoForm.hooks({
  "customTaxRates-update-form": {
    onSuccess: function () {
      return Alerts.toast(i18next.t("shopSettings.shopCustomTaxRatesSaved"),
        "success");
    },
    onError: function (operation, error) {
      return Alerts.toast(
        `${i18next.t("shopSettings.shopCustomTaxRatesFailed")} ${error}`, "error"
      );
    }
  }
});
