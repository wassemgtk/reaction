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
  country: function () {
    const shop = ReactionCore.Collections.Shops.findOne();
    if (shop && typeof shop.addressBook === "Array") {
      const country = shop.addressBook[0].country;
      return country;
    }
  },
  statesForCountry: function () {
    const shop = ReactionCore.Collections.Shops.findOne();
    const selectedCountry = AutoForm.getFieldValue("country");
    if (!selectedCountry) {
      return false;
    }
    if ((shop !== null ? shop.locales.countries[selectedCountry].states : void 0) === null) {
      return false;
    }
    options = [];
    if (shop && typeof shop.locales.countries[selectedCountry].states === "object") {
      for (const state in shop.locales.countries[selectedCountry].states) {
        if ({}.hasOwnProperty.call(shop.locales.countries[selectedCountry].states, state)) {
          const locale = shop.locales.countries[selectedCountry].states[state];
          options.push({
            label: locale.name,
            value: state
          });
        }
      }
    }
    return options;
  },
  filteredFields() {
    return ["taxCode", "rate", "country", "region", "postal"];
  },
  Taxes() {
    return ReactionCore.Collections.Taxes;
  },
  packageData() {
    return ReactionCore.Collections.Taxes.find();
  },
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
