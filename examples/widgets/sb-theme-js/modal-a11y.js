/**
 * SnowBoots Theme JS — modal accessibility helpers
 * Issues: #25 focus on open, #26 focus trap + Escape, #48 dialog ARIA
 *
 * Install: Theme → JS Includes (after jQuery / Bootstrap JS when present).
 * Targets Bootstrap 3.3.6 .modal; no-ops safely if APIs are missing.
 */
(function (window, document) {
  'use strict';

  var FOCUSABLE =
    'a[href], area[href], input:not([disabled]):not([type="hidden"]), ' +
    'select:not([disabled]), textarea:not([disabled]), ' +
    'button:not([disabled]), iframe, object, embed, ' +
    '[tabindex]:not([tabindex="-1"]), [contenteditable="true"]';

  var lastTrigger = null;
  var activeModal = null;
  var boundKeydown = null;

  function isVisible(el) {
    return !!(el && (el.offsetWidth || el.offsetHeight || el.getClientRects().length));
  }

  function getFocusable(container) {
    return Array.prototype.filter.call(
      container.querySelectorAll(FOCUSABLE),
      function (el) {
        return isVisible(el) && el.getAttribute('aria-hidden') !== 'true';
      }
    );
  }

  function enhanceModal(modal) {
    if (!modal || modal.getAttribute('data-sb-a11y') === '1') {
      return;
    }
    modal.setAttribute('data-sb-a11y', '1');
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');

    var title =
      modal.querySelector('.modal-title') ||
      modal.querySelector('h1, h2, h3, h4, h5, h6');
    if (title) {
      if (!title.id) {
        title.id = 'sb-modal-title-' + Math.random().toString(36).slice(2, 9);
      }
      modal.setAttribute('aria-labelledby', title.id);
    }
  }

  function trapKeydown(e) {
    if (!activeModal) {
      return;
    }

    if (e.key === 'Escape' || e.keyCode === 27) {
      e.preventDefault();
      closeModal(activeModal);
      return;
    }

    if (e.key !== 'Tab' && e.keyCode !== 9) {
      return;
    }

    var nodes = getFocusable(activeModal);
    if (!nodes.length) {
      e.preventDefault();
      activeModal.focus();
      return;
    }

    var first = nodes[0];
    var last = nodes[nodes.length - 1];
    var current = document.activeElement;

    if (e.shiftKey) {
      if (current === first || !activeModal.contains(current)) {
        e.preventDefault();
        last.focus();
      }
    } else if (current === last) {
      e.preventDefault();
      first.focus();
    }
  }

  function onModalShown(modal) {
    enhanceModal(modal);
    activeModal = modal;

    if (!modal.hasAttribute('tabindex')) {
      modal.setAttribute('tabindex', '-1');
    }

    var nodes = getFocusable(modal);
    var target = nodes[0] || modal;
    window.setTimeout(function () {
      target.focus();
    }, 0);

    boundKeydown = trapKeydown;
    document.addEventListener('keydown', boundKeydown, true);
  }

  function onModalHidden(modal) {
    if (boundKeydown) {
      document.removeEventListener('keydown', boundKeydown, true);
      boundKeydown = null;
    }
    activeModal = null;

    if (lastTrigger && typeof lastTrigger.focus === 'function') {
      lastTrigger.focus();
    }
    lastTrigger = null;
  }

  function closeModal(modal) {
    if (!modal) {
      return;
    }
    if (window.jQuery && window.jQuery.fn && window.jQuery.fn.modal) {
      window.jQuery(modal).modal('hide');
      return;
    }
    modal.classList.remove('in', 'show');
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    onModalHidden(modal);
  }

  function bindBootstrap() {
    if (!window.jQuery) {
      return false;
    }
    var $ = window.jQuery;

    $(document).on('show.bs.modal', '.modal', function (e) {
      lastTrigger =
        (e.relatedTarget && e.relatedTarget.nodeType === 1
          ? e.relatedTarget
          : null) || document.activeElement;
      enhanceModal(this);
    });

    $(document).on('shown.bs.modal', '.modal', function () {
      onModalShown(this);
    });

    $(document).on('hidden.bs.modal', '.modal', function () {
      onModalHidden(this);
    });

    return true;
  }

  /** Lightweight fallback when Bootstrap events are unavailable */
  function bindFallbackObserver() {
    if (typeof MutationObserver === 'undefined') {
      return;
    }
    var observer = new MutationObserver(function () {
      var open = document.querySelector('.modal.in, .modal.show');
      if (open && open !== activeModal) {
        lastTrigger = document.activeElement;
        onModalShown(open);
      } else if (!open && activeModal) {
        onModalHidden(activeModal);
      }
    });
    observer.observe(document.documentElement, {
      attributes: true,
      subtree: true,
      attributeFilter: ['class', 'style']
    });
  }

  function init() {
    document
      .querySelectorAll('.modal')
      .forEach(function (m) {
        enhanceModal(m);
      });

    if (!bindBootstrap()) {
      bindFallbackObserver();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose for manual triggers / tests
  window.SnowBootsModalA11y = {
    enhanceModal: enhanceModal,
    onModalShown: onModalShown,
    onModalHidden: onModalHidden,
    closeModal: closeModal
  };
})(window, document);
