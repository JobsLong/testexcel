/*
# =============================================================================
#   Sparkline Linechart JS
# =============================================================================
*/


(function() {
  $(document).ready(function() {
    /*
    # =============================================================================
    #   Navbar scroll animation
    # =============================================================================
    */

    $(".page-header-fixed .navbar.scroll-hide").mouseover(function() {
      $(".page-header-fixed .navbar.scroll-hide").removeClass("closed");
      return setTimeout((function() {
        return $(".page-header-fixed .navbar.scroll-hide").css({
          overflow: "visible"
        });
      }), 150);
    });

    $(function() {
      var delta, lastScrollTop;
      lastScrollTop = 0;
      delta = 50;
      return $(window).scroll(function(event) {
        var st;
        st = $(this).scrollTop();
        if (Math.abs(lastScrollTop - st) <= delta) {
          return;
        }
        if (st > lastScrollTop) {
          $('.page-header-fixed .navbar.scroll-hide').addClass("closed");
        } else {
          $('.page-header-fixed .navbar.scroll-hide').removeClass("closed");
        }
        return lastScrollTop = st;
      });
    });
    /*
    # =============================================================================
    #   Mobile Nav
    # =============================================================================
    */

    $('.navbar-toggle').click(function() {
      return $('body, html').toggleClass("nav-open");
    });
  });

}).call(this);
