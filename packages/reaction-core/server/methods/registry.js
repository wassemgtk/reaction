import { check } from "meteor/check";

Meteor.methods({
  "registry/update": function (packageId, name, fields) {
    check(packageId, String);
    check(name, String);
    check(fields, Array);
    let dataToSave = {};
    // settings use just the last name from full name
    // so that schemas don't need to define overly complex
    // names based with x/x/x formatting.
    const setting = name.split("/").splice(-1);
    dataToSave[setting] = {};

    const currentPackage = ReactionCore.Collections.Packages.findOne(packageId);

    _.each(fields, function (field) {
      dataToSave[setting][field.property] = field.value;
    });

    if (currentPackage.settings) {
      dataToSave = Object.assign({}, currentPackage.settings, dataToSave);
    }
    // user must have permission to package
    // to update settings
    if (ReactionCore.hasPermission([name])) {
      return ReactionCore.Collections.Packages.upsert({
        _id: packageId,
        name: currentPackage.name,
        enabled: currentPackage.enabled
      }, {
        $set: {
          settings: dataToSave
        }
      }, {
        upsert: true
      });
    }

    return false;
  }
});
