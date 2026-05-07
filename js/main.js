// 全局函数：摘要展开/收起功能
function toggleAbstract(paperId) {
  console.log('toggleAbstract called with paperId:', paperId);
  var paperCard = $('.paper-card[onclick*="' + paperId + '"]');
  var abstractContent = paperCard.find('.abstract-content');
  var toggleBtn = paperCard.find('.abstract-toggle');
  var toggleText = toggleBtn.find('.toggle-text');

  console.log('paperCard:', paperCard.length);
  console.log('abstractContent:', abstractContent.length);
  console.log('hasClass expanded:', abstractContent.hasClass('expanded'));

  if (abstractContent.hasClass('expanded')) {
    // 收起摘要
    abstractContent.removeClass('expanded');
    toggleBtn.removeClass('expanded');
    toggleText.text('展开全部');
  } else {
    // 展开摘要
    abstractContent.addClass('expanded');
    toggleBtn.addClass('expanded');
    toggleText.text('收起摘要');
  }
}

// 全局函数：论文详情展开/收起功能
function togglePaperDetail(paperId) {
  var detailDiv = document.getElementById('paper-detail-' + paperId);
  var paperCard = detailDiv.closest('.paper-card');

  if (detailDiv.style.display === 'none' || detailDiv.style.display === '') {
    // 展开详情
    detailDiv.style.display = 'block';
    paperCard.classList.add('expanded');

    // 滚动到详情区域
    setTimeout(function() {
      detailDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 300);
  } else {
    // 收起详情
    detailDiv.style.display = 'none';
    paperCard.classList.remove('expanded');
  }
}

(function () {
  "use strict";

  var isMobile = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
      return (
        isMobile.Android() ||
        isMobile.BlackBerry() ||
        isMobile.iOS() ||
        isMobile.Opera() ||
        isMobile.Windows()
      );
    },
  };

  var fullHeight = function () {
    if (!isMobile.any()) {
      $(".js-fullheight").css("height", $(window).height());
      $(window).resize(function () {
        $(".js-fullheight").css("height", $(window).height());
      });
    }
  };

  // Animations

  var contentWayPoint = function () {
    var i = 0;
    $(".animate-box").waypoint(
      function (direction) {
        if (direction === "down" && !$(this.element).hasClass("animated")) {
          i++;

          $(this.element).addClass("item-animate");
          setTimeout(function () {
            $("body .animate-box.item-animate").each(function (k) {
              var el = $(this);
              setTimeout(
                function () {
                  var effect = el.data("animate-effect");
                  if (effect === "fadeIn") {
                    el.addClass("fadeIn animated");
                  } else if (effect === "fadeInLeft") {
                    el.addClass("fadeInLeft animated");
                  } else if (effect === "fadeInRight") {
                    el.addClass("fadeInRight animated");
                  } else {
                    el.addClass("fadeInUp animated");
                  }

                  el.removeClass("item-animate");
                },
                k * 200,
                "easeInOutExpo"
              );
            });
          }, 100);
        }
      },
      { offset: "90%" }
    );
  };

  var burgerMenu = function () {
    $(".js-fh5co-nav-toggle").on("click", function (event) {
      event.preventDefault();
      var $this = $(this);

      if ($("body").hasClass("offcanvas")) {
        $this.removeClass("active");
        $("body").removeClass("offcanvas");
      } else {
        $this.addClass("active");
        $("body").addClass("offcanvas");
      }
    });
  };

  // Click outside of offcanvass
  var mobileMenuOutsideClick = function () {
    $(document).click(function (e) {
      var container = $("#fh5co-aside, .js-fh5co-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($("body").hasClass("offcanvas")) {
          $("body").removeClass("offcanvas");
          $(".js-fh5co-nav-toggle").removeClass("active");
        }
      }
    });

    $(window).scroll(function () {
      if ($("body").hasClass("offcanvas")) {
        $("body").removeClass("offcanvas");
        $(".js-fh5co-nav-toggle").removeClass("active");
      }
    });
  };

  var sliderMain = function () {
    $("#fh5co-hero .flexslider").flexslider({
      animation: "fade",
      slideshowSpeed: 5000,
      directionNav: true,
      start: function () {
        setTimeout(function () {
          $(".slider-text").removeClass("animated fadeInUp");
          $(".flex-active-slide")
            .find(".slider-text")
            .addClass("animated fadeInUp");
        }, 500);
      },
      before: function () {
        setTimeout(function () {
          $(".slider-text").removeClass("animated fadeInUp");
          $(".flex-active-slide")
            .find(".slider-text")
            .addClass("animated fadeInUp");
        }, 500);
      },
    });
  };

  // Document on load.
  $(function () {
    fullHeight();
    contentWayPoint();
    burgerMenu();
    mobileMenuOutsideClick();
    sliderMain();
  });
})();
