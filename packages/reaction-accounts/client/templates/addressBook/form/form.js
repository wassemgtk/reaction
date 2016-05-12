Template.addressBookForm.helpers({

  /*
   * TODO: update for i18n
   */
  countryOptions: function () {
    return ReactionCore.Collections.Countries.find().fetch();
  },
  statesForCountry: function () {
    const shop = ReactionCore.Collections.Shops.findOne();
    const selectedCountry = Session.get("addressBookCountry") || AutoForm.getFieldValue("country");
    if (!selectedCountry) {
      return false;
    }
    if ((shop !== null ? shop.locales.countries[selectedCountry].states : void 0) === null) {
      return false;
    }
    options = [];
    if (shop && typeof shop.locales.countries[selectedCountry].states === "object") {
      for (const state in shop.locales.countries[selectedCountry].states) {
        if ({}.hasOwnProperty.call(shop.locales.countries[selectedCountry].states, state)) {
          const locale = shop.locales.countries[selectedCountry].states[state];
          options.push({
            label: locale.name,
            value: state
          });
        }
      }
    }
    return options;
  },
  /*
   *  Defaults billing/shipping when 1st new address.
   */
  isBillingDefault: function () {
    return typeof this.address === "object" ? this.address.isBillingDefault : true;
  },
  isShippingDefault: function () {
    return typeof this.address === "object" ? this.address.isShippingDefault : true;
  },
  hasAddressBookEntries: function () {
    let account = ReactionCore.Collections.Accounts.findOne({
      userId: Meteor.userId()
    });
    if (account) {
      if (account.profile) {
        if (account.profile.addressBook) {
          return account.profile.addressBook.length > 0;
        }
      }
    }

    return false;
  }
});

Template.addressBookForm.events({
  'change [name="country"]': function () {
    return Session.set("addressBookCountry", AutoForm.getFieldValue("country"));
  }
});
