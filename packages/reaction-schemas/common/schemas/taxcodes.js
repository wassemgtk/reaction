/**
* TaxCodes Schema
*/

ReactionCore.Schemas.TaxCodes = new SimpleSchema({
  id: {
    type: String,
    label: "Tax Id",
    unique: true
  },
  shopId: {
    type: String,
    optional: true
  },
  ssuta: {
    type: Boolean,
    label: "Streamlined Sales Tax"
  },
  title: {
    type: String,
    optional: true
  },
  label: {
    type: String,
    optional: true
  },
  parent: {
    type: String,
    optional: true
  },
  children: {
    type: [ReactionCore.Schemas.TaxCodes],
    optional: true
  }
});
