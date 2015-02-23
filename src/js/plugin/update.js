/* Copyright (c) 2015 Hyunje Alex Jun and other contributors
 * Licensed under the MIT License
 */
'use strict';

var d = require('../lib/dom')
  , destroy = require('./destroy')
  , initialize = require('./initialize')
  , instances = require('./instances')
  , updateGeometry = require('./update-geometry');

module.exports = function (element) {
  var i = instances.get(element);

  if (!i.scrollbarXRail || (!i.scrollbarXContainer && !element.contains(i.scrollbarXRail)) ||
      !i.scrollbarYRail || (!i.scrollbarYContainer && !element.contains(i.scrollbarYRail))) {
    // If there's something wrong in the plugin, re-initialise.
    var oldI = destroy(element);
    initialize(element, oldI.settings);
  } else {
    // Hide scrollbars not to affect scrollWidth and scrollHeight
    d.css(i.scrollbarXRail, 'display', 'none');
    d.css(i.scrollbarYRail, 'display', 'none');

    updateGeometry(element);

    d.css(i.scrollbarXRail, 'display', 'block');
    d.css(i.scrollbarYRail, 'display', 'block');
  }
};
