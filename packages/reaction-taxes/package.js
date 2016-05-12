Package.describe({
  summary: "Reaction Taxes - Taxes for Reaction Commerce",
  name: "reactioncommerce:reaction-taxes",
  version: "1.0.0",
  documentation: "README.md"
});

Package.onUse(function (api) {
  api.versionsFrom("METEOR@1.3");

  // meteor base packages
  api.use("meteor-base");
  api.use("ecmascript");
  api.use("blaze-html-templates");
  api.use("react-template-helper@0.2.9");
  api.use("utilities:meteor-griddle@1.2.0");

  // Reaction packages
  api.use("reactioncommerce:reaction-collections@2.2.1");
  api.use("reactioncommerce:core@0.13.0");
  api.use("reactioncommerce:reaction-checkout@1.0.0");

  api.addFiles([
    "common/collections.js", // any unique collections
    "common/schemas.js" // any unique collections
  ], ["client", "server"]);

  api.addFiles("server/register.js", ["server"]); // register as a reaction package
  api.addFiles("server/methods.js", ["server"]); // server methods
  api.addFiles("server/fixtures.js", ["server"]); // fixtures

  api.addFiles([
    // checkout templates
    "client/checkout/taxes.html",
    "client/checkout/taxes.js",
    // admin screens
    "client/settings/settings.html",
    "client/settings/settings.js",
    // avalara
    "client/settings/avalara.html",
    "client/settings/avalara.js",
    // custom rates
    "client/settings/custom.html",
    "client/settings/custom.js",
    // taxcloud
    "client/settings/taxcloud.html",
    "client/settings/taxcloud.js",
    // taxjar
    "client/settings/taxjar.html",
    "client/settings/taxjar.js"
  ], ["client"]);
});
