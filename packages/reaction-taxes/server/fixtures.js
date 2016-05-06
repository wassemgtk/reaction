import { HTTP } from "meteor/http";
import { EJSON } from "meteor/ejson";
import { ReactionImport } from "meteor/reactioncommerce:core";
/*
 * Tax Code fixture data.
 * We're using https://taxcloud.net
 * just to get an intial import data set
 * this service doesn't require taxcloud id
 * but other services need authorization
 * use TAXCODE_SRC  to override source url
 */
Meteor.startup(function () {
  // todo make configurable
  const taxCodes = HTTP.get("https://taxcloud.net/tic/?format=json");

  if (taxCodes.data) {
    for (json of taxCodes.data.tic_list) {
      // transform children and flatten
      // first level of tax children
      // TODO: is there a need to go further
      if (json.tic.children) {
        const children = json.tic.children;
        delete json.tic.children; // remove child levels for now
        // process chilren
        for (json of children) {
          delete json.tic.children; // remove child levels for now
          const taxCode = EJSON.stringify([json.tic]);
          ReactionImport.process(taxCode, ["id", "label"], ReactionImport.taxCode);
        }
      }

      // parent code process
      const taxCode = EJSON.stringify([json.tic]);
      ReactionImport.process(taxCode, ["id", "label"], ReactionImport.taxCode);
    }
    // commit tax records
    ReactionImport.flush();
  }
});
