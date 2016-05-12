import { Template } from "meteor/templating";
import { AutoForm } from "meteor/aldeed:autoform";

Template.taxJarSettings.helpers({
  packageData() {
    return ReactionCore.Collections.Packages.findOne({
      name: "reaction-taxes"
    });
  }
});


AutoForm.hooks({
  "taxjar-update-form": {
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
