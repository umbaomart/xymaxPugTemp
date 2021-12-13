"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// VIEWPORT MANIPULATION
var viewport = function viewport() {
  var _ua = function (u) {
    return {
      Tablet: u.indexOf("windows") != -1 && u.indexOf("touch") != -1 && u.indexOf("tablet pc") == -1 || u.indexOf("ipad") != -1 || u.indexOf("android") != -1 && u.indexOf("mobile") == -1 || u.indexOf("firefox") != -1 && u.indexOf("tablet") != -1 || u.indexOf("kindle") != -1 || u.indexOf("silk") != -1 || u.indexOf("playbook") != -1,
      Mobile: u.indexOf("windows") != -1 && u.indexOf("phone") != -1 || u.indexOf("iphone") != -1 || u.indexOf("ipod") != -1 || u.indexOf("android") != -1 && u.indexOf("mobile") != -1 || u.indexOf("firefox") != -1 && u.indexOf("mobile") != -1 || u.indexOf("blackberry") != -1
    };
  }(window.navigator.userAgent.toLowerCase());

  if (_ua.Tablet) {
    $("meta[name='viewport']").attr("content", "width=767");
  } else {
    $("meta[name='viewport']").attr("content", "width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=2.0,user-scalable=yes");
  }
}; // GET URL PARAMETER VALUE


var getSearchParams = function getSearchParams(k) {
  var p = {};
  location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (s, k, v) {
    p[k] = v;
  });
  return k ? p[k] : p; // Usage:
  // let x = getSearchParams('parameter_name') - returns specific param value
  // let x = getSearchParams(); - returns an array
}; // SWIPER (Library)


var swiper = function swiper() {
  var rec_slider = $(".js-recommendSlider");

  if (rec_slider.length) {
    var _Swiper;

    var rec_swiper = new Swiper(".js-recommendSlider", (_Swiper = {
      slidesPerView: "auto",
      speed: 2000,
      autoplay: {
        delay: 3000
      },
      loop: true
    }, _defineProperty(_Swiper, "speed", 2000), _defineProperty(_Swiper, "centeredSlides", false), _defineProperty(_Swiper, "navigation", {
      nextEl: ".topPageSecRec__next",
      prevEl: ".topPageSecRec__prev"
    }), _Swiper));
  }
};

var mySwiper = undefined;

function initSwiper() {
  var screenWidth = $(window).width();

  if (screenWidth < 768 && mySwiper != undefined) {
    $(".js-recommendSlider").each(function () {
      mySwiper.destroy();
      mySwiper = undefined;
    });
    mySwiper = undefined;
    jQuery(".swiper-wrapper").removeAttr("style");
    jQuery(".swiper-slide").removeAttr("style");
  } else {
    mySwiper = new Swiper(".js-recommendSlider", {
      slidesPerView: "auto",
      centeredSlides: false,
      navigation: {
        nextEl: ".secRec__next",
        prevEl: ".secRec__prev"
      }
    });
  }
}

var safariDetect = function safariDetect() {
  /*  var is_safari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  
  if (is_safari) {
    $('html').addClass('u-browserSafari');
  } 
  */
  var ua = navigator.userAgent.toLowerCase();

  if (ua.indexOf("safari") != -1) {
    if (ua.indexOf("chrome") > -1) {//alert("1") // Chrome
    } else {
      $("html").addClass("u-browserSafari");
    }
  }
};

var header = function header() {
  // serial
  $(".siteHeader__tag").on("mouseover", function () {
    $(".js-linkSerial .siteHeader__navLink").addClass("u-hover");
  });
  $(".js-linkSerial").on("mouseover", function () {
    $(".js-linkSerial .siteHeader__navLink").addClass("u-hover");
  });
  $(".siteHeader__tag").on("mouseleave", function () {
    $(".js-linkSerial .siteHeader__navLink").removeClass("u-hover");
  });
  $(".js-linkSerial").on("mouseleave", function () {
    $(".js-linkSerial .siteHeader__navLink").removeClass("u-hover");
  }); // search

  $(".siteHeader__searchCont").on("mouseover", function () {
    $(".siteHeader__searchBtn").addClass("u-hover");
  });
  $(".siteHeader__searchCont").on("mouseleave", function () {
    $(".siteHeader__searchBtn").removeClass("u-hover");
  }); // menu sp

  $(".menu").on("click", function (e) {
    var curr = $(this);

    if ($(window).width() < 768) {
      curr.find(".menu__btn").toggleClass("js--menu__btn");
      $(this).next().slideToggle();
    }
  });
  $(".siteHeader__searchBtn").on("click", function (e) {
    var curr = $(this);

    if ($(window).width() < 768) {
      $(".menu__btn").removeClass(" js--menu__btn");
      $(".siteHeader__navList").slideUp();

      if (curr.next().hasClass("u-spHover")) {
        curr.next().removeClass("u-spHover");
      } else {
        curr.next().addClass("u-spHover");
      }
    }
  });
};

var showMore = function showMore() {
  if ($(".home").length) {
    var count = $(".secArticle .secArticle__item").length;
    var itemNum = 9;

    if (count <= itemNum) {
      $(".btnMore").hide();
    }

    $(".secArticle .secArticle__item:lt(" + itemNum + ")").addClass("u-show");
    $(".secArticle .secArticle__item:lt(" + itemNum + ")").attr("data-aos", "fade-up");
    $(".secArticle .secArticle__item:lt(3)").removeClass("aos-init");
    $(".secArticle .secArticle__item:lt(3)").removeAttr("data-aos");
    AOS.init();
    $(".btnMore").click(function () {
      itemNum = itemNum + itemNum <= count ? itemNum + itemNum : count;
      $("html,body").animate({
        scrollTop: $(this).offset().top - 150
      }, 1500);
      $(".secArticle .secArticle__item:lt(" + itemNum + ")").addClass("u-show");
      $(".secArticle .secArticle__item:lt(" + itemNum + ")").attr("data-aos", "fade-up");
      AOS.init();

      if (itemNum == count) {
        $(".btnMore").hide();
      }
    });
  }

  if ($(".archive").length) {
    var count = $(".secArticle__inner .secArticle__item").length;
    var itemNum = 9;

    if (count <= itemNum) {
      $(".btnMore").hide();
    }

    $(".secArticle__inner .secArticle__item:lt(" + itemNum + ")").addClass("u-show");
    $(".secArticle__inner .secArticle__item:lt(" + itemNum + ")").attr("data-aos", "fade-up");
    AOS.init();
    $(".btnMore").click(function () {
      itemNum = itemNum + 9 <= count ? itemNum + 9 : count;
      $("html,body").animate({
        scrollTop: $(this).offset().top - 150
      }, 500);
      $(".secArticle__inner .secArticle__item:lt(" + itemNum + ")").addClass("u-show");
      $(".secArticle__inner .secArticle__item:lt(" + itemNum + ")").attr("data-aos", "fade-up");
      AOS.init();

      if (itemNum == count) {
        $(".btnMore").hide();
      }
    });
  }

  if ($(".search").length) {
    var count = $(".secSearch__content .secSearch__item").length;
    var itemNum = 10;

    if (count < 11) {
      $(".btnMore").hide();
    }

    $(".secSearch__content .secSearch__item:lt(" + itemNum + ")").addClass("u-show");
    $(".u-show").last().addClass("u-last");
    $(".btnMore").click(function () {
      itemNum = itemNum + 9 <= count ? itemNum + 9 : count;
      $(".u-last").removeClass("u-last");
      $("html,body").animate({
        scrollTop: $(this).offset().top - 150
      }, 500);
      $(".secSearch__content .secSearch__item:lt(" + itemNum + ")").addClass("u-show");
      $(".u-show").last().addClass("u-last");

      if (itemNum == count) {
        $(".btnMore").hide();
      }
    });
  }
}; // smooth scroll


var smoothScroll = function smoothScroll() {
  $('a[href^="#"]').click(function () {
    var href = $(this).attr("href");
    var target = $(href == "#" || href == "" ? "html" : href);
    var position = target.offset().top;

    if (!$(this).hasClass("btnMore") && !$(this).hasClass("siteHeader__searchBtn") && !$(this).hasClass("menu") && !$(this).hasClass("btnTop")) {
      $("html, body").stop().animate({
        scrollTop: position
      }, 500, "swing");
      return false;
    }
  });
};

var toTop = function toTop() {
  var scrollcurr = $(window).scrollTop();
  var kvHeight = $(window).height();

  if (scrollcurr > kvHeight) {
    $(".btnTop").fadeIn();
  } else {
    $(".btnTop").fadeOut();
  }

  $(".btnTop").on("click", function () {
    $("html, body").stop().animate({
      scrollTop: 0
    }, 500, "swing");
  });
};

var scrollLeft = function scrollLeft() {
  var scrollcurr = -1 * $(window).scrollLeft();

  if ($(window).width() > 768) {
    $(".siteHeader").css("left", scrollcurr);
  }
};

var clickHeart = function clickHeart() {
  $(".icon-heart").on("click", function () {
    $(this).toggleClass("u-click");
  });
};

var header02 = function header02() {
  if ($(window).width() < 769) {
    var headerHeight = $("header").outerHeight();
    $(".mainSection").css("margin-top", headerHeight);
  } else {
    $(".mainSection").removeAttr("style");
  }
};

var moveItem = function moveItem() {
  if ($(window).width() < 769) {
    $(".u-themethankyou .postDescription").insertAfter($(".u-themethankyou .secSingle__categoryImg"));
  } else {
    $(".u-themethankyou .postDescription").insertAfter($(".u-themethankyou .postSec"));
  }
};

var postRate = function postRate() {
  // add attributes to container
  $(".u-heartSvg").each(function () {
    var mouseOver = $(this).find("img").attr("onmouseover");
    var mouseOut = $(this).find("img").attr("onmouseout");
    var onClick = $(this).find("img").attr("onclick");
    var keyPress = $(this).find("img").attr("onkeypress");
    $(this).attr({
      onmouseover: mouseOver,
      onmouseout: mouseOut,
      onclick: onClick,
      onkeypress: keyPress
    });
  });
  setTimeout(function () {
    $(".feedSecContainer").each(function () {
      var mouseOver = $(this).find("img").attr("onmouseover");
      var mouseOut = $(this).find("img").attr("onmouseout");
      var onClick = $(this).find("img").attr("onclick");
      var keyPress = $(this).find("img").attr("onkeypress");
      $(this).attr({
        onmouseover: mouseOver,
        onmouseout: mouseOut,
        onclick: onClick,
        onkeypress: keyPress
      });
    });
  }, 500); // check if ajax works

  $(".post-ratings").bind("DOMSubtreeModified", function () {
    var curr = $(this);

    if (curr.is(":empty")) {
      setTimeout(function () {
        addSvg();
        curr.find(".u-heartSvg").addClass("js-liked");
        curr.find(".u-heartSvg").css("pointer-events", "none");
        curr.css("pointer-events", "none");
        curr.find(".u-heartSvg").attr("onclick", "").unbind("click");
      }, 500);
    }
  }); //  add custom cookies for design reload

  $(".u-heartSvg").on("click", function () {
    var curr = $(this);
    var contId = $(this).parent(".post-ratings").attr("id");
    $.cookie(contId, 1, {
      expires: 365,
      path: "/"
    });
    curr.addClass("js-liked");
    curr.css("pointer-events", "none");
  }); // single page functions

  if ($(".u-themethankyou").length || $(".u-themeflexible").length || $(".u-themefeature").length) {
    // check if cookies existing, change layout to liked
    var valueID = $(".single").find(".post-ratings").attr("id");

    if ($.cookie(valueID)) {
      setTimeout(function () {
        $(".u-heartSvg").addClass("js-liked");
        $(".u-heartSvg").css("pointer-events", "none");
        $(".feedSecContainer__likeText.hover").html("いいね！" + $(".postSec__postRight .u-heartCount").text());
        $(".feedSecContainer").css("pointer-events", "none");
      }, 500);
    } // add class liked to buttons


    $(".u-heartSvg").on("click", function () {
      var curr = $(this);
      $(".feedSecContainer").addClass("js-liked");
      $(".feedSecContainer .u-heartSvg").addClass("js-liked");
      $(".feedSecContainer.js-liked").css("pointer-events", "none");
    });
    setTimeout(function () {
      $(".postSec__postRight .post-ratings").bind("DOMSubtreeModified", function () {
        $(".feedSecContainer__likeText.hover").html("いいね！" + $(".postSec__postRight .u-heartCount").text());
      });
    }, 500);
    setTimeout(function () {
      if ($('body[class*=" paged-"]').length) {
        $(".feedSecContainer__likeText.hover").html("いいね！" + $(".secSingle__contentFlex .u-heartCount").text());
      }
    }, 500); // on click feedSecbutton

    $(".feedSecContainer").on("click", function () {
      var curr = $(this); //add trigger click here!

      if (!$('body[class*=" paged-"]').length) {
        $(".postSec__postRight .u-heartSvg").trigger("click");
      }

      setTimeout(function () {
        if ($('body[class*=" paged-"]').length) {
          addSvg();
        }

        curr.addClass("js-liked");
        curr.css("pointer-events", "none");
        curr.find(".u-heartSvg").addClass("js-liked");
        curr.find(".u-heartSvg").css("pointer-events", "none");
        curr.css("pointer-events", "none");
        curr.find(".u-heartSvg").attr("onclick", "").unbind("click");
        var contId = $(".post-ratings").attr("id");
        $.cookie(contId, 1, {
          expires: 365,
          path: "/"
        });
        setTimeout(function () {
          var isFirefox = typeof InstallTrigger !== "undefined";

          if (isFirefox) {
            addSvg();
          }

          $(".feedSecContainer__likeText.hover").html("いいね！" + $(".postSec__postRight .u-heartCount").text());
        }, 1000);
      }, 1000);
    }); // add hover animation

    $(".feedSecContainer").on("mouseenter mouseleave", function (e) {
      var curr = $(this);
      curr.find(".u-heartSvg").toggleClass("hover");
    });
    $(".postSec__postRight .u-heartSvg").addClass("u-heartSvg01");
    $(".feedSecContainer .u-heartSvg").addClass("u-heartSvg02");
  } // archive items button


  $(".secArticle__item").each(function () {
    var curr = $(this);
    var valueID = curr.find(".post-ratings").attr("id");

    if ($.cookie(valueID)) {
      setTimeout(function () {
        curr.find(".post-ratings").css("pointer-events", "none");
        curr.find(".u-heartSvg").addClass("js-liked");
        curr.find(".u-heartSvg").css("pointer-events", "none");
      }, 500);
    }
  }); // karastagram like button

  $(".secKarastagram__itemBlock").each(function () {
    var curr = $(this);
    var valueID = curr.find(".post-ratings").attr("id");

    if ($.cookie(valueID)) {
      setTimeout(function () {
        curr.find(".u-heartSvg").addClass("js-liked");
        curr.find(".u-heartSvg").css("pointer-events", "none");
        addSvg();
      }, 500);
    }
  });
};

var ratingBtnClickClassSync = function ratingBtnClickClassSync() {
  var ratingBtn = $(".u-heartSvg");
  var ratingBtn01 = $(".u-heartSvg01");
  var ratingBtn02 = $(".u-heartSvg02");

  var sync = function sync() {
    if ($(".u-themethankyou").length || $(".u-themeflexible").length || $(".u-themefeature").length) {
      var ratingBtn01Score = ratingBtn01.find(".u-heartCount");
      var ratingBtn02Score = ratingBtn02.find(".u-heartCount");
      var ratingBtn02Icon = ratingBtn02.find(".ratings-icon");
      var ratingBtn01ScoreText = ratingBtn01.find(".u-heartCount").text();
      console.log(ratingBtn01ScoreText);
      ratingBtn.addClass("js-liked");
      var contId = $(this).parent(".post-ratings").attr("id");
      $.cookie(contId, 1, {
        expires: 365,
        path: "/"
      });

      if (ratingBtn02Score.length) {
        ratingBtn02Score.addClass("u-rated");
        ratingBtn02Score.text(ratingBtn01ScoreText);
      } else {
        ratingBtn02Icon.after('<p class="ratings-score u-rated">'.concat(ratingBtn01ScoreText, "</p>"));
      }
    }
  };

  ratingBtn.on("click", function (e) {
    setTimeout(function () {
      sync();
    }, 1500);
  });
};

var movePostRating = function movePostRating() {
  $(".u-hidden").remove();

  if ($(".u-themethankyou").length || $(".u-themeflexible").length || $(".u-themefeature").length) {
    $(".post-ratings").appendTo(".postSec__postRight");
    setTimeout(function () {
      $(".secSingle__contentFlex > .post-ratings:first-child").css("display", "none");
      $(".feedSecContainer__likeText.hover").html("いいね！" + $(".secSingle__contentFlex > .post-ratings .u-heartCount").text());
    });
    $(".post-ratings").clone().appendTo(".feedSecContainer__likeIcon");
    addSvg();
    setTimeout(function () {
      $(".feedSecContainer").each(function () {
        var curr = $(this);

        if (curr.find(".u-heartSvg").hasClass("js-liked")) {
          curr.addClass("js-liked");
        }
      });
    }, 500);
    $(".feedSecContainer .u-heartSvg").css("pointer-events", "none");
  }
};

var addSvg = function addSvg() {
  if ($(".u-themethankyou").length || $(".u-themeflexible").length || $(".u-themefeature").length) {
    $(".feedSecContainer__likeIcon .u-heartSvgCont").empty();
    $('<svg xmlns="http://www.w3.org/2000/svg" class="main" width="29" height="29" viewBox="0 0 29 29"><g id="Group_3869" data-name="Group 3869" transform="translate(-796 -6610)"><g id="Ellipse_9" data-name="Ellipse 9" transform="translate(796 6610)" fill="#fff" stroke="#292929" stroke-width="1"><circle cx="14.5" cy="14.5" r="14.5" stroke="none"/><circle cx="14.5" cy="14.5" r="14" fill="none"/></g><path id="Path_675" data-name="Path 675" d="M379.846,468.8a3.629,3.629,0,0,0-5.763,1.869,3.629,3.629,0,0,0-5.763-1.869c-2.05,1.631-1.885,4.878.123,7.481,1.855,2.406,4.753,4.724,5.534,6.333a.111.111,0,0,0,.213,0c.78-1.609,3.678-3.927,5.533-6.333C381.731,473.678,381.9,470.432,379.846,468.8Z" transform="translate(436.616 6150.036)" fill="none" stroke="#292929" stroke-miterlimit="10" stroke-width="1"/></g></svg><svg xmlns="http://www.w3.org/2000/svg" class="hover" width="29" height="29" viewBox="0 0 29 29"><g id="Group_3869" data-name="Group 3869" transform="translate(-796 -6610)"><g id="Ellipse_9" data-name="Ellipse 9" transform="translate(796 6610)" fill="#fff" stroke="#292929" stroke-width="1"><circle cx="14.5" cy="14.5" r="14.5" stroke="none"/><circle cx="14.5" cy="14.5" r="14" fill="none"/></g><path id="Path_675" data-name="Path 675" d="M379.846,468.8a3.629,3.629,0,0,0-5.763,1.869,3.629,3.629,0,0,0-5.763-1.869c-2.05,1.631-1.885,4.878.123,7.481,1.855,2.406,4.753,4.724,5.534,6.333a.111.111,0,0,0,.213,0c.78-1.609,3.678-3.927,5.533-6.333C381.731,473.678,381.9,470.432,379.846,468.8Z" transform="translate(436.616 6150.036)" fill="#292929" stroke="#292929" stroke-miterlimit="10" stroke-width="1"/></g></svg><svg xmlns="http://www.w3.org/2000/svg" class="click" width="29" height="29" viewBox="0 0 29 29"><g id="Group_3869" data-name="Group 3869" transform="translate(-796 -6610)"><g id="Ellipse_9" data-name="Ellipse 9" transform="translate(796 6610)" fill="#292929" stroke="#292929" stroke-width="1"><circle cx="14.5" cy="14.5" r="14.5" stroke="none"/><circle cx="14.5" cy="14.5" r="14" fill="none"/></g><path id="Path_675" data-name="Path 675" d="M379.846,468.8a3.629,3.629,0,0,0-5.763,1.869,3.629,3.629,0,0,0-5.763-1.869c-2.05,1.631-1.885,4.878.123,7.481,1.855,2.406,4.753,4.724,5.534,6.333a.111.111,0,0,0,.213,0c.78-1.609,3.678-3.927,5.533-6.333C381.731,473.678,381.9,470.432,379.846,468.8Z" transform="translate(436.616 6150.036)" fill="#fff" stroke="#fff" stroke-miterlimit="10" stroke-width="1"/></g></svg>').appendTo(".u-heartSvgCont");
  }
};

var paged = function paged() {
  if ($(".postid-93").length) {
    if ($(".paged-4").length) {
      $(".feedSecContainer").addClass("u-feedGreen");
    } else if ($(".paged-3").length) {
      $(".feedSecContainer").addClass("u-feedOrange");
    } else if ($(".paged-2").length) {
      $(".feedSecContainer").addClass("u-feedRed");
    } else {
      $(".feedSecContainer").addClass("u-feedBlue");
    }
  }

  if ($(".post-nav-links").length) {
    $(".post-nav-links").contents().filter(function () {
      return this.nodeType === Node.TEXT_NODE;
    }).remove();
  }

  if ($(".karakusaPost102020").length) {
    $("body").addClass("u-themeBlue");
  }
};

var likebtn = function likebtn() {
  if ($(window).width() < 768) {
    setTimeout(function () {
      var wSVG = $(".feedSecContainer svg").width() - 1;
      var hSVG = $(".feedSecContainer svg").height() - 2;
      wSVG = "width: " + wSVG.toFixed(0) + "px !important;";
      hSVG = "height: " + hSVG.toFixed(0) + "px !important;";
      $(".feedSecContainer svg").attr("style", wSVG + wSVG);
    }, 500);
  } else {
    setTimeout(function () {
      $(".feedSecContainer svg").removeAttr("style");
    }, 1000);
  }
};

$(function () {
  ratingBtnClickClassSync();
  clickHeart();
  postRate();
  movePostRating();
  smoothScroll();
  safariDetect();
  header();
  showMore();
  paged();
  $(".secArticle__item .secArticle__details").matchHeight();
  $(".secKarastagram__itemBlock").matchHeight();
  $(".image-popup").magnificPopup({
    type: "image"
  });
});
var kv_swiper = new Swiper(".js-kvSlider", {
  slidesPerView: "auto",
  centeredSlides: true,
  spaceBetween: 0,
  speed: 2000,
  autoplay: {
    delay: 3000
  },
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true
  }
});

if ($(".js-kvSlider .swiper-slide").length === 3) {
  kv_swiper.destroy();
  $(".topPageSecKv__btnCont, .topPageSecKv .swiper-pagination").css("display", "none");
  $(".js-kvSlider .swiper-slide").css("margin-left", "auto");
  $(".js-kvSlider .swiper-slide").css("margin-right", "auto");
}

$(document).click(function (event) {
  //if you click on anything except the modal itself or the "open modal" link, close the modal
  if ($(window).width() < 768) {
    $(".secArticle__item").unbind("mouseenter mouseleave");

    if (!$(event.target).closest(".siteHeader__navList").length && !$(event.target).closest(".menu").length) {
      $(".menu__btn").removeClass(" js--menu__btn");
      $(".siteHeader__navList").slideUp();
    }

    if (!$(event.target).closest(".siteHeader__searchCont").length && !$(event.target).closest(".siteHeader__searchBtn").length) {
      $(".siteHeader__searchBtn").unbind("hover");
      $(".siteHeader__searchCont").removeClass("u-spHover");
    }
  }
});
$(window).on("load resize", function () {
  //likebtn();
  header02();

  if ($(".home").length) {
    setTimeout(function () {
      kv_swiper.update();
    }, 500);
  }

  initSwiper();
});
$(window).on("load scroll", function () {
  toTop();
  scrollLeft();
  moveItem();
});