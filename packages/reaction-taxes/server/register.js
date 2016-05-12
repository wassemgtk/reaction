ReactionCore.registerPackage({
  label: "Taxes",
  name: "reaction-taxes",
  icon: "fa fa-university",
  autoEnable: true,
  settings: {
    taxrates: {
      enabled: true
    },
    taxcloud: {
      enabled: false,
      apiLoginId: ""
    },
    avalara: {
      enabled: false,
      apiLoginId: ""
    }
  },
  registry: [
    {
      provides: "dashboard",
      name: "taxes",
      label: "Taxes",
      description: "Provide tax rates",
      icon: "fa fa-university",
      priority: 3,
      container: "core",
      workflow: "coreDashboardWorkflow"
    },
    {
      label: "Tax Settings",
      name: "taxes/settings",
      provides: "settings",
      template: "taxSettings"
    },
    {
      label: "TaxCloud",
      name: "taxes/settings/taxcloud",
      provides: "taxSettings",
      template: "taxCloudSettings"
    },
    {
      label: "Avalara",
      name: "taxes/settings/avalara",
      provides: "taxSettings",
      template: "avalaraSettings"
    },
    {
      label: "TaxJar",
      name: "taxes/settings/taxjar",
      provides: "taxSettings",
      template: "taxJarSettings"
    },
    {
      label: "Custom Rates",
      name: "taxes/settings/rates",
      provides: "taxSettings",
      template: "customTaxRates"
    },
    {
      template: "flatRateCheckoutTaxes",
      provides: "taxMethod"
    }
  ]
});
