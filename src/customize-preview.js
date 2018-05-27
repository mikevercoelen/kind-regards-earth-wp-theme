/* global _, jQuery, wp */
(function ($, api) {
  /**
   * Override the handler for clicking links in preview to allow history.pushState() to do its thing.
   *
   * @param {jQuery.Event} event Event.
   */
  api.Preview.prototype.handleLinkClick = function handleLinkClick (event) {
    const link = $(event.target)

    // No-op if the anchor is not a link.
    if (_.isUndefined(link.attr('href'))) {
      return
    }

    const isInternalJumpLink = (link.attr('href').substr(0, 1) === '#')

    // Allow internal jump links to behave normally without preventing default.
    if (isInternalJumpLink) {
      return
    }

    // If the link is not previewable, prevent the browser from navigating to it.
    if (!api.isLinkPreviewable(link[ 0 ])) {
      wp.a11y.speak(api.settings.l10n.linkUnpreviewable)
      event.preventDefault()
    }
  }
})(jQuery, wp.customize)
