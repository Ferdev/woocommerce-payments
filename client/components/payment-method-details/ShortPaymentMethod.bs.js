// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE
'use strict';

var React = require("react");
var Belt_Option = require("bs-platform/lib/js/belt_Option.js");
var StyleScss = require("./style.scss");

function _asdf(prim) {
  return StyleScss.style(prim);
}

function make(payment) {
  return Belt_Option.getWithDefault(Belt_Option.map(payment.card, (function (card) {
                    return React.createElement("span", {
                                className: "payment-method-details"
                              }, React.createElement("span", {
                                    className: "payment-method__brand payment-method__brand--" + card.brand
                                  }), "\u0020••••\u0020", card.last4);
                  })), React.createElement("span", undefined, "&ndash;"));
}

var $$default = make;

exports._asdf = _asdf;
exports.make = make;
exports.$$default = $$default;
exports.default = $$default;
exports.__esModule = true;
/* react Not a pure module */
