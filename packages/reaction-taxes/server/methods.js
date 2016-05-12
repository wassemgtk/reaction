import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { Match } from "meteor/check";

Meteor.methods({
  "taxes/addRate": function (modifier, docId) {
    check(modifier, Object);
    check(docId, Match.OneOf(Object, null, undefined));
    if (!docId) {
      return ReactionCore.Collections.Taxes.insert(modifier);
    }
    return ReactionCore.Collections.Taxes.update(docId, modifier);
  }
});
