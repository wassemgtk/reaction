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
      priority: 1,
      container: "core",
      workflow: "coreDashboardWorkflow"
    },
    {
      label: "Tax Settings",
      route: "/dashboard/taxes/settings",
      name: "taxes/settings",
      provides: "settings",
      template: "taxSettings"
    },
    {
      label: "TaxCloud Settings",
      route: "/dashboard/taxes/taxcloud",
      name: "taxes/settings/taxcloud",
      provides: "taxSettings",
      template: "taxCloudSettings"
    },
    {
      label: "Avalara Settings",
      route: "/dashboard/taxes/avalara",
      name: "taxes/settings/avalara",
      provides: "taxSettings",
      template: "avalaraSettings"
    },
    {
      label: "Rate Settings",
      route: "/dashboard/taxes/rates",
      name: "taxes/settings/rates",
      provides: "taxSettings",
      template: "taxRates"
    },
    {
      template: "flatRateCheckoutTaxes",
      provides: "taxMethod"
    }
  ]
});
