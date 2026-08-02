/**
 * SnowBoots SB Header — paste into Widget → Client Script
 * Issue #36: keep aria-expanded in sync on mobile nav toggle
 *
 * Service Portal client controllers typically use:
 *   function(<deps>) { var c = this; ... }
 * Adapt the bootstrap below to your instance's widget API.
 */
function sbHeaderClientController($scope) {
  var c = this;

  c.$onInit = function () {
    // Optional: set title from server or portal options
    // c.data.portal_title is available in template if server sets it
  };

  // After DOM is ready (SP often needs $timeout)
  function bindNavToggle() {
    var toggle = document.getElementById('sb-nav-toggle');
    var nav = document.getElementById('sb-primary-nav');
    if (!toggle || !nav) {
      return;
    }

    function syncExpanded() {
      var expanded = nav.classList.contains('in') || nav.classList.contains('show');
      toggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
      toggle.classList.toggle('collapsed', !expanded);
    }

    toggle.addEventListener('click', function () {
      // Bootstrap 3 toggles .in on the collapse target asynchronously
      setTimeout(syncExpanded, 0);
      setTimeout(syncExpanded, 350);
    });

    // Collapse events when jQuery + Bootstrap are present
    if (window.jQuery) {
      window.jQuery(nav)
        .on('shown.bs.collapse', syncExpanded)
        .on('hidden.bs.collapse', syncExpanded);
    }

    syncExpanded();
  }

  if (window.setTimeout) {
    setTimeout(bindNavToggle, 0);
  }
}

// ServiceNow widgets often expect: api.controller = ...
// Uncomment or adapt for your instance:
// function clientController() { return sbHeaderClientController; }
