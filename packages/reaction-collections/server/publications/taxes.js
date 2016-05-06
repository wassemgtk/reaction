/**
 * taxes
 */

Meteor.publish("Taxes", function () {
  const shopId = ReactionCore.getShopId();
  if (!shopId) {
    return this.ready();
  }
  return ReactionCore.Collections.Taxes.find({
    shopId: shopId
  });
});


/**
 * tax codes
 */

Meteor.publish("TaxCodes", function () {
  const shopId = ReactionCore.getShopId();
  if (!shopId) {
    return this.ready();
  }
  return ReactionCore.Collections.TaxCodes.find({
    shopId: shopId
  });
});
