import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { Match } from "meteor/check";

Meteor.methods({
  "taxes/addRate": function (modifier, docId) {
    check(modifier, Object);
    check(docId, Match.OneOf(Object, null, undefined));
    // check permissions to add
    if (!ReactionCore.hasPermission("taxes")) {
      throw new Meteor.Error(403, "Access Denied");
    }
    // if no doc, insert
    if (!docId) {
      return ReactionCore.Collections.Taxes.insert(modifier);
    }
    // else update and return
    return ReactionCore.Collections.Taxes.update(docId, modifier);
  },
  "taxes/calculate": function (cartId) {
    check(cartId, String);
    const cart = ReactionCore.Collections.Cart.findOne(cartId);
    const shop = ReactionCore.Collections.Shops.findOne(ReactionCore.getShopId());
  }
});
