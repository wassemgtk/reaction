
ReactionCore.Schemas.TaxPackageConfig = new SimpleSchema([
  ReactionCore.Schemas.PackageConfig, {
    "settings.taxrates": {
      type: Object,
      optional: true
    },
    "settings.taxrates.enabled": {
      type: Boolean,
      optional: true,
      defaultValue: false
    },
    "settings.taxrates.taxes": {
      type: [ReactionCore.Schemas.Taxes],
      optional: true
    },
    "settings.taxcloud": {
      type: Object,
      optional: true
    },
    "settings.taxcloud.enabled": {
      type: Boolean,
      optional: true,
      defaultValue: false
    },
    "settings.taxcloud.apiLoginId": {
      type: String,
      label: "TaxCloud API Login ID",
      optional: true
    },
    "settings.avalara": {
      type: Object,
      optional: true
    },
    "settings.avalara.enabled": {
      type: Boolean,
      optional: true,
      defaultValue: false
    },
    "settings.avalara.apiLoginId": {
      type: String,
      label: "Avalara API Login ID",
      optional: true
    }
  }
]);
