import { Template } from "meteor/templating";
import { AutoForm } from "meteor/aldeed:autoform";

Template.taxCloudSettings.helpers({
  packageData() {
    return ReactionCore.Collections.Packages.findOne({
      name: "reaction-taxes"
    });
  }
});


AutoForm.hooks({
  "taxcloud-update-form": {
    onSuccess: function () {
      return Alerts.toast(i18next.t("shopSettings.shopTaxMethodsSaved"),
        "success");
    },
    onError: function (operation, error) {
      return Alerts.toast(
        `${i18next.t("shopSettings.shopTaxMethodsFailed")} ${error}`, "error"
      );
    }
  }
});
