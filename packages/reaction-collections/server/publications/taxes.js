/**
 * taxes
 */

/**
 * tax codes
 */

Meteor.publish("Taxes", function (query, options) {
  check(query, Match.Optional(Object));
  check(options, Match.Optional(Object));

  // check shopId
  const shopId = ReactionCore.getShopId();
  if (!shopId) {
    return this.ready();
  }

  const select = query || {};
  // append shopId to query
  // taxes could be shared
  // if you disregarded shopId
  select.shopId = shopId;

  // appends a count to the collection
  // we're doing this for use with griddleTable
  Counts.publish(this, "taxes-count", ReactionCore.Collections.Taxes.find(
    select,
    options
  ));

  return ReactionCore.Collections.Taxes.find(
    select,
    options
  );
});
/**
 * tax codes
 */

Meteor.publish("TaxCodes", function (query, params) {
  check(query, Match.Optional(Object));
  check(params, Match.Optional(Object));

  // check shopId
  const shopId = ReactionCore.getShopId();
  if (!shopId) {
    return this.ready();
  }

  const select = query || {};

  // for now, not adding shopId to query
  // taxCodes are reasonable shared??
  //  select.shopId = shopId;

  const options = params || {
    fields: {
      id: 1,
      label: 1
    },
    sort: {
      label: 1
    }
  };

  // appends a count to the collection
  // we're doing this for use with griddleTable
  Counts.publish(this, "taxcode-count", ReactionCore.Collections.TaxCodes.find(
    select,
    options
  ));

  return ReactionCore.Collections.TaxCodes.find(
    select,
    options
  );
});
