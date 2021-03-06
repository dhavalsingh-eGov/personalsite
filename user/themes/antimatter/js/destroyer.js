window.odometerOptions = {
  auto: true, // Don't automatically initialize everything with class 'odometer'
  duration: 500, // Change how long the javascript expects the CSS animation to take
  animation: "count", // Count is a simpler animation method which just increments the value,
};

$(function () {
  //return;

  if (is.touchDevice()) $("html").addClass("touch");

  var today = moment().tz("America/Los_Angeles");
  var currentDay = today.date();
  var currentMonth =
    today.month() + 1 < 10 ? today.month() + 1 : today.month() + 1;
  var seedString = currentMonth + "/" + currentDay + "/" + today.year();
  var rng = new RNG(seedString);

  Array.prototype.randomElement = function () {
    return this[rng.random(0, this.length)];
  };

  //GENERAL
  var body = document.body,
    html = document.documentElement,
    totalPageHeight,
    maxScrollTop,
    windowHeight = $(window).height(),
    windowWidth = $(window).width();

  //LANDING SCROLL DOWN INDICATOR
  var scrollDownAnimation;
  var scrollDownContainer = $("#scrollDownIndicator");

  //DESTROYER LOGO
  var logoContainer = $("#destroyerLogo"),
    logoCenterContainer = $(".destroyerLogoCenter");
  (logoAnimation = new TimelineMax()), (logoAnimationTime = 5);

  //OPENING HOURS MODULE
  var clockOffsetTop,
    clockAnimatedIn = false;

  //MENU DATE MODULE
  var menuDateOffsetTop,
    menuDateAnimatedIn = false;

  //LOGO STAR
  var logoStarOffsetTop,
    logoStarContainerHeight,
    logoStarAnimation = new TimelineMax(),
    logoStarContainer = $(".destroyerStarLogoMiddle"),
    logoStarCenterContainer = $(".destroyerStarLogoMiddleCenter"),
    logoStarContainerAll = $(".destroyerStarLogoCenter"),
    starAnimation = false,
    starReverseAnimation = false,
    starBurstAnimation = new TimelineMax();

  var menuOffsetTop;
  var infoOffsetTopStart;
  var scrolling = false;

  var gameOn = false,
    moveSpaceshipRight = false,
    moveSpaceshipLeft = false;

  //NOT USED ANYMORE
  function initDestroyerLogo() {
    //3.0769
    var letterHeight = (100 * 14) / logoContainer.height();

    logoAnimation.add("start", 0);
    logoAnimation.add(
      TweenMax.to(logoContainer.find(".destroyer-d"), logoAnimationTime, {
        height: (100 * (8 + letterHeight)) / (36 + 8 * letterHeight) + "%",
        ease: Power0.easeNone,
      }),
      "start"
    );
    logoAnimation.add(
      TweenMax.to(logoContainer.find(".destroyer-e1"), logoAnimationTime, {
        height: (100 * (7 + letterHeight)) / (36 + 8 * letterHeight) + "%",
        ease: Power0.easeNone,
      }),
      "start"
    );
    logoAnimation.add(
      TweenMax.to(logoContainer.find(".destroyer-s"), logoAnimationTime, {
        height: (100 * (6 + letterHeight)) / (36 + 8 * letterHeight) + "%",
        ease: Power0.easeNone,
      }),
      "start"
    );
    logoAnimation.add(
      TweenMax.to(logoContainer.find(".destroyer-t"), logoAnimationTime, {
        height: (100 * (5 + letterHeight)) / (36 + 8 * letterHeight) + "%",
        ease: Power0.easeNone,
      }),
      "start"
    );
    logoAnimation.add(
      TweenMax.to(logoContainer.find(".destroyer-r1"), logoAnimationTime, {
        height: (100 * (4 + letterHeight)) / (36 + 8 * letterHeight) + "%",
        ease: Power0.easeNone,
      }),
      "start"
    );
    logoAnimation.add(
      TweenMax.to(logoContainer.find(".destroyer-o"), logoAnimationTime, {
        height: (100 * (3 + letterHeight)) / (36 + 8 * letterHeight) + "%",
        ease: Power0.easeNone,
      }),
      "start"
    );
    logoAnimation.add(
      TweenMax.to(logoContainer.find(".destroyer-y"), logoAnimationTime, {
        height: (100 * (2 + letterHeight)) / (36 + 8 * letterHeight) + "%",
        ease: Power0.easeNone,
      }),
      "start"
    );
    logoAnimation.add(
      TweenMax.to(logoContainer.find(".destroyer-e2"), logoAnimationTime, {
        height: (100 * (1 + letterHeight)) / (36 + 8 * letterHeight) + "%",
        ease: Power0.easeNone,
      }),
      "start"
    );
    logoAnimation.add(
      TweenMax.to(logoContainer.find(".destroyer-r2"), logoAnimationTime, {
        height: (100 * (0 + letterHeight)) / (36 + 0 * letterHeight) + "%",
        ease: Power0.easeNone,
      }),
      "start"
    );
    logoAnimation.stop();
    logoAnimation.seek(0.0001);
    offsetLogo();
  }

  function initDestroyerStarLogo() {
    //3.0769
    var letterHeight = (100 * 14) / logoContainer.height();

    logoStarAnimation.add("start", 0);
    logoStarAnimation.add(
      TweenMax.to(logoStarContainer.find(".destroyer-d"), logoAnimationTime, {
        height: (100 * (8 + letterHeight)) / (36 + 8 * letterHeight) + "%",
        ease: Power0.easeNone,
      }),
      "start"
    );
    logoStarAnimation.add(
      TweenMax.to(logoStarContainer.find(".destroyer-e1"), logoAnimationTime, {
        height: (100 * (7 + letterHeight)) / (36 + 8 * letterHeight) + "%",
        ease: Power0.easeNone,
      }),
      "start"
    );
    logoStarAnimation.add(
      TweenMax.to(logoStarContainer.find(".destroyer-s"), logoAnimationTime, {
        height: (100 * (6 + letterHeight)) / (36 + 8 * letterHeight) + "%",
        ease: Power0.easeNone,
      }),
      "start"
    );
    logoStarAnimation.add(
      TweenMax.to(logoStarContainer.find(".destroyer-t"), logoAnimationTime, {
        height: (100 * (5 + letterHeight)) / (36 + 8 * letterHeight) + "%",
        ease: Power0.easeNone,
      }),
      "start"
    );
    logoStarAnimation.add(
      TweenMax.to(logoStarContainer.find(".destroyer-r1"), logoAnimationTime, {
        height: (100 * (4 + letterHeight)) / (36 + 8 * letterHeight) + "%",
        ease: Power0.easeNone,
      }),
      "start"
    );
    logoStarAnimation.add(
      TweenMax.to(logoStarContainer.find(".destroyer-o"), logoAnimationTime, {
        height: (100 * (3 + letterHeight)) / (36 + 8 * letterHeight) + "%",
        ease: Power0.easeNone,
      }),
      "start"
    );
    logoStarAnimation.add(
      TweenMax.to(logoStarContainer.find(".destroyer-y"), logoAnimationTime, {
        height: (100 * (2 + letterHeight)) / (36 + 8 * letterHeight) + "%",
        ease: Power0.easeNone,
      }),
      "start"
    );
    logoStarAnimation.add(
      TweenMax.to(logoStarContainer.find(".destroyer-e2"), logoAnimationTime, {
        height: (100 * (1 + letterHeight)) / (36 + 8 * letterHeight) + "%",
        ease: Power0.easeNone,
      }),
      "start"
    );
    logoStarAnimation.add(
      TweenMax.to(logoStarContainer.find(".destroyer-r2"), logoAnimationTime, {
        height: (100 * (0 + letterHeight)) / (36 + 0 * letterHeight) + "%",
        ease: Power0.easeNone,
      }),
      "start"
    );
    logoStarAnimation.stop();
    logoStarAnimation.seek(0.0001);
  }

  function initStarLogo() {
    $(".destroyerStarLogo").css("height", $(".destroyerStar").width() / 2 - 80);
    if (windowWidth > 640)
      $("#destroyerLogo").css("height", $(".destroyerStarLogo").height());
    $(".destroyerStar").css("height", $(".destroyerStar").width());

    var rotation = 0;
    $(".destroyerStarLogo").each(function () {
      $(this).css("transform", "rotate(" + rotation + "deg) translateY(-80px)");
      rotation += 10;
    });
  }

  function offsetLogo() {
    var logoHeight = 0;
    logoContainer.find(".logoLetterRow").each(function () {
      logoLetterRowHeight = $(this)[0].style.height;
      logoLetterRowHeight = Number(
        logoLetterRowHeight.substring(0, logoLetterRowHeight.length - 1)
      );
      logoHeight += logoLetterRowHeight;
    });

    var translateY = (100 - logoHeight) / 2;
    if (translateY < 0) translateY = 0;
    logoCenterContainer.css("transform", "translateY(" + translateY + "%)");
  }

  var firstSet = false;
  function offsetStarLogo(logoStarShift) {
    var logoHeight = 0;
    logoStarContainer.find(".logoLetterRow").each(function () {
      logoLetterRowHeight = $(this)[0].style.height;
      logoLetterRowHeight = Number(
        logoLetterRowHeight.substring(0, logoLetterRowHeight.length - 1)
      );
      logoHeight += logoLetterRowHeight;
    });

    var translateY = (logoStarContainer.height() - logoHeight) / 2;
    if (translateY < 0) translateY = 0;

    var logoOffset =
      (((100 - logoHeight) / 100) * logoStarContainer.height()) / 2;
    if (logoOffset < 0) logoOffset = 0;

    logoOffset = logoStarShift + logoOffset;

    if (!firstSet) {
      firstSet = true;
      if (is.not.firefox())
        TweenMax.set(logoStarCenterContainer, { y: logoOffset + "px" });
    }
    //TweenMax.to(logoStarCenterContainer, 0.2, { y:logoOffset + 'px', ease: Power0.easeNone });
    if (is.safari())
      TweenMax.set(logoStarCenterContainer, { y: logoOffset + "px" });
    else if (is.firefox())
      logoStarCenterContainer.css(
        "transform",
        "translateY(" + logoOffset + "px)"
      );
    else TweenMax.set(logoStarCenterContainer, { y: logoOffset + "px" });

    if (logoOffset == 0 && !starAnimation) {
      starAnimation = true;
      starReverseAnimation = false;
      starBurstAnimation.play();
    } else if (logoOffset < 0 && !starReverseAnimation) {
      starAnimation = false;
      starReverseAnimation = true;
      starBurstAnimation.duration();
      starBurstAnimation.reverse();
    }
    //console.log(translateY);
    //logoStarCenterContainer.css('transform','translateY(' + ( translateY ) + '%)')
  }

  window.typeParameters = [
    {
      indentations: [
        0.2222222222222222,
        0.4166666666666667,
        0.5833333333333334,
        0.7222222222222222,
        0.8333333333333334,
        0.9166666666666666,
        0.9722222222222222,
      ],
      maxTextWidth: 3,
    },
    {
      indentations: [
        0.2222222222222222,
        0.4166666666666667,
        0.5833333333333334,
        0.7222222222222222,
        0.8333333333333334,
        0.9166666666666666,
        0.9722222222222222,
      ],
      maxTextWidth: 8,
    },
    {
      indentations: [
        0.2222222222222222,
        0.4166666666666667,
        0.5833333333333334,
        0.7222222222222222,
        0.8333333333333334,
        0.9166666666666666,
        0.9722222222222222,
      ],
      maxTextWidth: 17,
    },
    {
      indentations: [
        0.2222222222222222,
        0.4166666666666667,
        0.5833333333333334,
        0.7222222222222222,
        0.8333333333333334,
        0.9166666666666666,
        0.9722222222222222,
      ],
      maxTextWidth: 28,
    },
    {
      indentations: [
        0.2222222222222222,
        0.4166666666666667,
        0.5833333333333334,
        0.7222222222222222,
        0.8333333333333334,
        0.9166666666666666,
        0.9722222222222222,
      ],
      maxTextWidth: 42,
    },
    {
      indentations: [
        0.2222222222222222,
        0.4166666666666667,
        0.5833333333333334,
        0.7222222222222222,
        0.8333333333333334,
        0.9166666666666666,
        0.9722222222222222,
      ],
      maxTextWidth: 58,
    },
    {
      indentations: [
        0.2222222222222222,
        0.4166666666666667,
        0.5833333333333334,
        0.7222222222222222,
        0.8333333333333334,
        0.9166666666666666,
        0.9722222222222222,
      ],
      maxTextWidth: 78,
    },
    {
      indentations: [
        0.2222222222222222,
        0.4166666666666667,
        0.5833333333333334,
        0.7222222222222222,
        0.8333333333333334,
        0.9166666666666666,
        0.9722222222222222,
      ],
      maxTextWidth: 99,
    },
  ];

  function updateLayout() {
    $.each(window.typeParameters, function (i, word) {
      $.each($(".menuItem"), function (i, menuItem) {
        var count = 0;
        var prevWordWidth = 0;
        var ingredients = $(menuItem).find(".ingredient");
        $.each(ingredients, function (i, ingredient) {
          var wordWidth = ($(ingredient).width() * 100) / $(menuItem).width();
          var nextWordWidth =
            i + 1 < ingredients.length
              ? ($(ingredients[i + 1]).width() * 100) / $(menuItem).width()
              : 100;

          if (wordWidth <= word.maxTextWidth) {
            if (count % 2 == 0) {
              $(ingredient).css("margin-left", "0%");
            } else if (
              wordWidth + prevWordWidth <= 100 ||
              wordWidth + nextWordWidth <= 100
            ) {
              if (nextWordWidth < prevWordWidth) {
                $(ingredient).css(
                  "margin-left",
                  nextWordWidth * word.indentations.randomElement() + "%"
                );
              } else {
                $(ingredient).css(
                  "margin-left",
                  prevWordWidth * word.indentations.randomElement() + "%"
                );
              }
            } else {
              var nextWordWidth =
                i + 1 < ingredients.length
                  ? ($(ingredients[i + 1]).width() * 100) / $(menuItem).width()
                  : 100;

              $(ingredient).css(
                "margin-left",
                (100 - wordWidth) * word.indentations.randomElement() + "%"
              );
            }
          }

          prevWordWidth = wordWidth;

          count++;
        });
      });
    });
  }

  function initScrollIndicator() {
    (scrollDownAnimation = new TimelineMax({ repeat: -1, repeatDelay: -1 })),
      (circle0Animation = new TimelineMax()),
      (circle1Animation = new TimelineMax()),
      (circle2Animation = new TimelineMax()),
      (circle3Animation = new TimelineMax());

    circle0Animation.add(
      TweenMax.to(scrollDownContainer.find(".scrollDownCircle-0"), 0.6, {
        opacity: 1,
        ease: Power0.easeNone,
      })
    );
    circle0Animation.add(
      TweenMax.to(scrollDownContainer.find(".scrollDownCircle-0"), 0.8, {
        opacity: 1,
        ease: Power0.easeNone,
      })
    );
    circle0Animation.add(
      TweenMax.to(scrollDownContainer.find(".scrollDownCircle-0"), 0.8, {
        opacity: 0,
        ease: Power0.easeNone,
      })
    );
    circle0Animation.add(
      TweenMax.to(scrollDownContainer.find(".scrollDownCircle-0"), 0.8, {
        opacity: 0,
        ease: Power0.easeNone,
      })
    );

    circle1Animation.add(
      TweenMax.to(scrollDownContainer.find(".scrollDownCircle-1"), 0.6, {
        opacity: 1,
        ease: Power0.easeNone,
      })
    );
    circle1Animation.add(
      TweenMax.to(scrollDownContainer.find(".scrollDownCircle-1"), 0.8, {
        opacity: 1,
        ease: Power0.easeNone,
      })
    );
    circle1Animation.add(
      TweenMax.to(scrollDownContainer.find(".scrollDownCircle-1"), 0.8, {
        opacity: 0,
        ease: Power0.easeNone,
      })
    );
    circle1Animation.add(
      TweenMax.to(scrollDownContainer.find(".scrollDownCircle-1"), 0.8, {
        opacity: 0,
        ease: Power0.easeNone,
      })
    );

    circle2Animation.add(
      TweenMax.to(scrollDownContainer.find(".scrollDownCircle-2"), 0.6, {
        opacity: 1,
        ease: Power0.easeNone,
      })
    );
    circle2Animation.add(
      TweenMax.to(scrollDownContainer.find(".scrollDownCircle-2"), 0.8, {
        opacity: 1,
        ease: Power0.easeNone,
      })
    );
    circle2Animation.add(
      TweenMax.to(scrollDownContainer.find(".scrollDownCircle-2"), 0.8, {
        opacity: 0,
        ease: Power0.easeNone,
      })
    );
    circle2Animation.add(
      TweenMax.to(scrollDownContainer.find(".scrollDownCircle-2"), 0.8, {
        opacity: 0,
        ease: Power0.easeNone,
      })
    );

    circle3Animation.add(
      TweenMax.to(scrollDownContainer.find(".scrollDownCircle-3"), 0.6, {
        opacity: 1,
        ease: Power0.easeNone,
      })
    );
    circle3Animation.add(
      TweenMax.to(scrollDownContainer.find(".scrollDownCircle-3"), 0.8, {
        opacity: 1,
        ease: Power0.easeNone,
      })
    );
    circle3Animation.add(
      TweenMax.to(scrollDownContainer.find(".scrollDownCircle-3"), 0.8, {
        opacity: 0,
        ease: Power0.easeNone,
      })
    );
    circle3Animation.add(
      TweenMax.to(scrollDownContainer.find(".scrollDownCircle-3"), 0.8, {
        opacity: 0,
        ease: Power0.easeNone,
      })
    );

    scrollDownAnimation.add("circle0Start", 0);
    scrollDownAnimation.add("circle1Start", 0.4);
    scrollDownAnimation.add("circle2Start", 0.8);
    scrollDownAnimation.add("circle3Start", 1.2);

    scrollDownAnimation.add(circle0Animation, "circle0Start");
    scrollDownAnimation.add(circle1Animation, "circle1Start");
    scrollDownAnimation.add(circle2Animation, "circle2Start");
    scrollDownAnimation.add(circle3Animation, "circle3Start");
  }

  function startClock() {
    // CLOCK
    var minute = moment().tz("America/Los_Angeles").minute(),
      second = moment().tz("America/Los_Angeles").second(),
      hour = moment().tz("America/Los_Angeles").hour();

    if (hour > 12) hour -= 12;
    if (hour < 6) hour = hour + 6;
    else hour = hour - 6;
    hour += minute / 60;

    var introAnimationSpeed = 1.8;
    var hoursDottedLineOffset = 753.982;
    var hoursDottedLineObj = {
      strokeDashOffset: hoursDottedLineOffset,
    };

    var hoursNumberCircleOffset = 772.832;
    var hoursNumberCircleObj = {
      strokeDashOffset: 0,
    };

    var clockAnimation = new TimelineMax();
    clockAnimation.add("intro", 0);
    clockAnimation.add("clockStart", introAnimationSpeed);
    clockAnimation.add(
      TweenMax.to($(".secondsCircleOffset"), introAnimationSpeed, {
        rotation: 6 * second,
        ease: Power2.easeOut,
      }),
      "intro"
    );
    clockAnimation.add(
      TweenMax.to($(".secondsCircle"), 60, {
        rotation: 360,
        ease: Power0.easeNone,
        repeat: -1,
      }),
      "clockStart"
    );
    clockAnimation.add(
      TweenMax.to($(".minutesCircleOffset"), introAnimationSpeed, {
        rotation: 6 * minute,
        ease: Power2.easeOut,
      }),
      "intro"
    );
    clockAnimation.add(
      TweenMax.to($(".minutesCircle"), 3600, {
        rotation: 360,
        ease: Power0.easeNone,
        repeat: -1,
      }),
      "clockStart"
    );
    clockAnimation.add(
      TweenMax.to($(".minutesCircleOffset"), introAnimationSpeed, {
        rotation: 6 * minute,
        ease: Power2.easeOut,
      }),
      "intro"
    );
    clockAnimation.add(
      TweenMax.to($(".hoursCircleOffset"), introAnimationSpeed, {
        rotation: 30 * hour,
        ease: Power2.easeOut,
      }),
      "intro"
    );
    clockAnimation.add(
      TweenMax.to($(".hoursCircle"), 43200, {
        rotation: 360,
        ease: Power2.easeOut,
        repeat: -1,
        onUpdate: function () {
          var h = moment().tz("America/Los_Angeles").hour(),
            m = moment().tz("America/Los_Angeles").minute();
          if (h > 12) h -= 12;
          if (h < 6) h = h + 6;
          else h = h - 6;
          h += m / 60;

          document.getElementById("hoursDottedLineCircle").style[
            "stroke-dashoffset"
          ] = hoursDottedLineOffset - (hoursDottedLineOffset / 12) * h;
          document.getElementById("hoursNumbersMaskCircle").style[
            "stroke-dashoffset"
          ] = (hoursNumberCircleOffset / 12) * h;
        },
      }),
      "clockStart"
    );
    clockAnimation.add(
      TweenMax.to(hoursDottedLineObj, introAnimationSpeed, {
        strokeDashOffset:
          hoursDottedLineOffset - (hoursDottedLineOffset / 12) * hour,
        ease: Power2.easeOut,
        onUpdate: function () {
          document.getElementById("hoursDottedLineCircle").style[
            "stroke-dashoffset"
          ] = hoursDottedLineObj.strokeDashOffset;
        },
      }),
      "intro"
    );
    clockAnimation.add(
      TweenMax.to(hoursNumberCircleObj, introAnimationSpeed, {
        strokeDashOffset: (hoursNumberCircleOffset / 12) * hour,
        ease: Power2.easeOut,
        onUpdate: function () {
          document.getElementById("hoursNumbersMaskCircle").style[
            "stroke-dashoffset"
          ] = hoursNumberCircleObj.strokeDashOffset;
        },
      }),
      "intro"
    );
  }

  function initStarBurst() {
    var starBurstAnimationTime = 0.3;

    starBurstAnimation.add("step1", 0);
    starBurstAnimation.add("step2", 0.05);
    starBurstAnimation.add("step3", 0.1);
    starBurstAnimation.add("step4", 0.15);
    starBurstAnimation.add("step5", 0.2);
    starBurstAnimation.add("step6", 0.25);
    starBurstAnimation.add("step7", 0.3);
    starBurstAnimation.add("step8", 0.35);
    starBurstAnimation.add("step9", 0.4);
    starBurstAnimation.add(
      TweenMax.to(
        logoStarContainerAll.find(".destroyer-d"),
        starBurstAnimationTime,
        { opacity: 1, ease: Power2.easeOut }
      ),
      "step9"
    );
    starBurstAnimation.add(
      TweenMax.to(
        logoStarContainerAll.find(".destroyer-e1"),
        starBurstAnimationTime,
        { opacity: 1, ease: Power2.easeOut }
      ),
      "step8"
    );
    starBurstAnimation.add(
      TweenMax.to(
        logoStarContainerAll.find(".destroyer-s"),
        starBurstAnimationTime,
        { opacity: 1, ease: Power2.easeOut }
      ),
      "step7"
    );
    starBurstAnimation.add(
      TweenMax.to(
        logoStarContainerAll.find(".destroyer-t"),
        starBurstAnimationTime,
        { opacity: 1, ease: Power2.easeOut }
      ),
      "step6"
    );
    starBurstAnimation.add(
      TweenMax.to(
        logoStarContainerAll.find(".destroyer-r1"),
        starBurstAnimationTime,
        { opacity: 1, ease: Power2.easeOut }
      ),
      "step5"
    );
    starBurstAnimation.add(
      TweenMax.to(
        logoStarContainerAll.find(".destroyer-o"),
        starBurstAnimationTime,
        { opacity: 1, ease: Power2.easeOut }
      ),
      "step4"
    );
    starBurstAnimation.add(
      TweenMax.to(
        logoStarContainerAll.find(".destroyer-y"),
        starBurstAnimationTime,
        { opacity: 1, ease: Power2.easeOut }
      ),
      "step3"
    );
    starBurstAnimation.add(
      TweenMax.to(
        logoStarContainerAll.find(".destroyer-e2"),
        starBurstAnimationTime,
        { opacity: 1, ease: Power2.easeOut }
      ),
      "step2"
    );
    starBurstAnimation.add(
      TweenMax.to(
        logoStarContainerAll.find(".destroyer-r2"),
        starBurstAnimationTime,
        { opacity: 1, ease: Power2.easeOut }
      ),
      "step1"
    );
    starBurstAnimation.stop();
  }

  function startMenuDateAnimation() {
    var menuDateAnimation = new TimelineMax();

    menuDateAnimation.add("step1", 0);
    menuDateAnimation.add("step2", 0.2);
    menuDateAnimation.add("step3", 0.8);
    menuDateAnimation.add("step4", 1);
    menuDateAnimation.add("step5", 1.2);
    menuDateAnimation.add(
      TweenMax.to($(".monthWheel"), 1.3, {
        opacity: 1,
        rotation: 0,
        ease: Power2.easeOut,
      }),
      "step1"
    );
    menuDateAnimation.add(
      TweenMax.to($(".dayWheel"), 1.1, {
        opacity: 1,
        rotation: 0,
        ease: Power2.easeOut,
      }),
      "step2"
    );
    menuDateAnimation.add(
      TweenMax.to($(".dotDivider-1"), 0.4, {
        opacity: 1,
        ease: Power0.easeOut,
      }),
      "step3"
    );
    menuDateAnimation.add(
      TweenMax.to($(".dotDivider-2"), 0.4, {
        opacity: 1,
        ease: Power0.easeOut,
      }),
      "step4"
    );
    menuDateAnimation.add(
      TweenMax.to($(".year"), 0.8, { opacity: 1, ease: Power0.easeOut }),
      "step5"
    );
  }

  function generateLegend() {
    $(".menuItem")
      .not(".info")
      .each(function (index, el) {
        var symb = "";
        var newContent = "";
        const $firstIngredientEl = $(el).find(".ingredient").first();

        var firstIngredientContent = $firstIngredientEl.html().toLowerCase();
        var isBreakfast = firstIngredientContent.indexOf("*b") !== -1;
        var isLunch = firstIngredientContent.indexOf("*l") !== -1;
        var isBrunch = firstIngredientContent.indexOf("*r") !== -1;

        if (isBreakfast) {
          symb = "◊";
          firstIngredientContent = firstIngredientContent.replace("*b", "");
        } else if (isLunch) {
          symb = "∆";
          firstIngredientContent = firstIngredientContent.replace("*l", "");
        }

        if (isBrunch) {
          symb += "○";
          firstIngredientContent = firstIngredientContent.replace("*r", "");
        }

        if (isBreakfast || isLunch) {
          $firstIngredientEl.text(firstIngredientContent);
          $(el).prepend('<span class="ingredient">' + symb + "</span>");
        }
      });

    var legendEl = [
      '<div class="row">',
      '<div id="infoHoursArea" class="columns small-12 medium-12 large-6" style="padding-right: 0;">',
      // ua5 '<div class="menuItem clearfix even" style="width: 100%;">TAKE-OUT | DELIVERY 9am - 8pm DAILY<br><br>',
      '<div class="menuItem clearfix even" style="float: left; width: 10%; font-size: 14px;">DHAVAL SINGH<br><br>',

      // '<span class="ingredient">◊  M-F BREAKFAST  8am - 11<span style="font-family:monospace;">:</span>30am</span>',
      // '<span class="ingredient">∆  M-F LUNCH 11<span style="font-family:monospace;">:</span>30am - 5pm</span>',
      // '<span class="ingredient">○  WEEKEND 9am - 3pm</span>',
      //'<span class="ingredient" style="text-decoration: underline; margin-left: 17px;"><a target="_blank" class="info-link" style="color: #fff" href="https://www.trycaviar.com/m/destroyer-10356?cav_medium=widget&cav_source=destroyer-10356&cvo_campaign=destroyer-10356&cvosrc=localmarketing.widget.destroyer-10356&how=delivery&utm_campaign=destroyer-10356&utm_content=destroyer-10356&utm_medium=localmarketing&utm_source=widget&utm_term=la"><span>O</span><span>R</span><span>D</span><span>E</span><span>R</span><span>&nbsp;</span><span>O</span><span>N</span><span>L</span><span>I</span><span>N</span><span>E</span></a></span>',
      '<span class="ingredient" style="text-decoration: underline; margin-left: 17px;"><a target="_blank" class="info-link" style="color: #fff" href="https://dhavalsingh-egov.github.io"><span>P</span><span>O</span><span>R</span><span>T</span><span>F</span><span>O</span><span>L</span><span>I</span><span>O</span></a></span>',
      '<span class="ingredient" style="text-decoration: underline; margin-left: 17px;"><a target="_blank" class="info-link" style="color: #fff" href="https://handshakevigilante.wordpress.com/"><span>B</span><span>L</span><span>O</span><span>G</span></a></span>',
     // '<span class="ingredient" style="text-decoration: underline; margin-left: 17px;"><a target="_blank" class="info-link" style="color: #fff" href="https://destroyerla.typeform.com/to/neJLsK"><span>C</span><span>A</span><span>T</span><span>E</span><span>R</span><span>I</span><span>N</span><span>G</span></a></span>',
      "</div>",
      "</div>",
      "</div>",
    ].join("");

    $(".menu-left").prepend(legendEl);

    setInterval(function () {
      $(".info-link")
        .find("span")
        .each(function () {
          var elem = $(this);
          if (getRandomInt(0, 3) == 1) {
            if ($(this).hasClass("shimmer")) {
              $(this).removeClass("shimmer");
              TweenMax.killTweensOf($(this));
              TweenMax.to($(this), 0.6, { opacity: 1 });
            } else {
              $(this).addClass("shimmer");
              TweenMax.killTweensOf($(this));
              TweenMax.to($(this), 1.2, {
                opacity: 0.4,
                repeat: -1,
                yoyo: true,
              });
            }
          }
        });
    }, 1800);
  }

  $(window).on("load", function () {
    resize();

    clockOffsetTop =
      $(".openingHoursClock").offset().top + $(window).height() / 3;
    menuDateOffsetTop = $(".menuDateContainer").offset().top + 300;
    logoStarOffsetTop = $(".theEnd").offset().top + $(window).height() / 2;
    totalPageHeight =
      $(".menu").outerHeight() +
      $(".info").outerHeight() +
      $(".journal").outerHeight();
    menuOffsetTop =
      $(".modular-row.menu").offset().top +
      $(".modular-row.menu").outerHeight() +
      $(window).height();

    maxScrollTop = totalPageHeight;

    $(".landing").css("height", $(window).height() + "px");
    if ($(window).width() <= 640) {
      $(".hub-slider ul").css("height", $(".hub-slider ul li").height() + "px");
    }

    infoOffsetTopStart = $(".modular-row.info").offset().top - windowHeight / 2;
    infoOffsetTopEnd = $(".modular-row.journal").offset().top;

    //initDestroyerLogo();

    initScrollIndicator();
    updateLayout();
    initDestroyerStarLogo();
    initStarLogo();
    initStarBurst();
    logoStarContainerHeight = $(".destroyerStarLogoMiddle").height();

    if (is.not.mobile()) initParallax();
    $(".modular-row, .destroyerFooter").css({ opacity: 1 });

    var scrolledYet = false;
    if (is.not.mobile()) {
      $(window).on("scroll", function () {
        if (!scrolling) {
          $(".destroyerStar")
            .find(".logoLetter")
            .each(function () {
              var tweens = TweenMax.getTweensOf($(this));
              $.each(tweens, function () {
                this.pause();
              });
            });

          $(".navigation")
            .find(".navigationLetter")
            .each(function () {
              var tweens = TweenMax.getTweensOf($(this));
              $.each(tweens, function () {
                this.pause();
              });
            });
        }

        scrolling = true;

        if (!scrolledYet) {
          scrolledYet = true;
          scrollDownContainer.addClass("fadeOut");
          scrollDownAnimation.pause();
          scrollDownAnimation.kill();
        } else {
          clearTimeout($.data(this, "scrollTimer"));
          $.data(
            this,
            "scrollTimer",
            setTimeout(function () {
              $(".destroyerStar")
                .find(".logoLetter")
                .each(function () {
                  var tweens = TweenMax.getTweensOf($(this));
                  $.each(tweens, function () {
                    this.resume();
                  });
                });
              scrolling = false;
            }, 250)
          );
        }
      });
    } else {
      $(window).on("scroll", function () {
        if (!scrolledYet) {
          scrolledYet = true;
          scrollDownContainer.addClass("fadeOut");
          scrollDownAnimation.pause();
          scrollDownAnimation.kill();
          $(window).off("scroll");
        }
      });
    }

    TweenMax.ticker.addEventListener("tick", draw);
    var destroyerLogoVisible = true;
    var scrollTop = 0;

    var fps = 100;
    var now;
    var then = Date.now();
    var gameInterval = 1000 / fps;
    var delta;
    var spaceship = $("#spaceship");
    var spaceshipPos = 50;
    var spaceshipSpeed = 0.5;

    function draw() {
      now = Date.now();
      delta = now - then;
      if (delta > gameInterval) {
        then = now - (delta % gameInterval);
        if (moveSpaceshipRight) {
          spaceshipPos =
            spaceshipPos + spaceshipSpeed > 100
              ? 100
              : spaceshipPos + spaceshipSpeed;
          TweenMax.set(spaceship, { left: spaceshipPos + "%" });
        } else if (moveSpaceshipLeft) {
          spaceshipPos =
            spaceshipPos - spaceshipSpeed < 0
              ? 0
              : spaceshipPos - spaceshipSpeed;
          TweenMax.set(spaceship, { left: spaceshipPos + "%" });
        }

        // ... Code for Drawing the Frame ...
      }

      // Scroll Interpolation / Ease
      scrollTop += ($(window).scrollTop() - scrollTop) * 0.2;
      if (scrollTop < 0) scrollTop = 0;

      if (is.not.mobile()) updateParallax(scrollTop);

      if (!menuDateAnimatedIn && scrollTop > menuDateOffsetTop) {
        menuDateAnimatedIn = true;
        startMenuDateAnimation();
      }

      if (!clockAnimatedIn && scrollTop > clockOffsetTop) {
        clockAnimatedIn = true;
        startClock();
      }

      //MOBILE LOGO
      var mobileLogoTriggerMark =
        (windowHeight - logoContainer.height()) / 2 + 30;
      if (
        (is.mobile() || windowWidth <= 640) &&
        scrollTop < mobileLogoTriggerMark &&
        !destroyerLogoVisible
      ) {
        destroyerLogoVisible = true;
        TweenMax.to(logoContainer, 0.8, { opacity: 1 });
      } else if (
        (is.mobile() || windowWidth <= 640) &&
        scrollTop > mobileLogoTriggerMark &&
        destroyerLogoVisible
      ) {
        destroyerLogoVisible = false;
        TweenMax.to(logoContainer, 0.8, { opacity: 0 });
      }

      //CALCULATE STAR LOGO OFFSET
      var destroyerLogoShift =
        logoStarOffsetTop - scrollTop - logoStarContainer.height() / 2;
      var logoStarShift;
      if (destroyerLogoShift < 0) {
        logoStarCenterContainer.css("opacity", 1);
        logoStarShift = -logoStarContainerHeight + Math.abs(destroyerLogoShift);
        if (logoStarShift > 0) logoStarShift = 0;
      } else {
        logoStarShift = -logoStarContainerHeight - destroyerLogoShift;
        logoStarCenterContainer.css("opacity", 1);
      }

      //logoAnimation.seek(scrollTop * 5 / maxScrollTop);
      //offsetLogo();
      if (is.not.mobile()) {
        logoStarAnimation.seek((scrollTop * 5) / maxScrollTop);
        offsetStarLogo(logoStarShift);
      }

      //ADD PHYSICS CALCULATION IF MENU IS VISIBLE AND USER DOESN'T SCROLL
      var isMenu = scrollTop < menuOffsetTop ? true : false;
      var isInfo =
        scrollTop < infoOffsetTopEnd && scrollTop > infoOffsetTopStart
          ? true
          : false;
      if (!scrolling && isMenu && is.not.touchDevice()) updateRepulsion();

      if (!scrolling && isInfo && is.not.touchDevice()) updateRepulsionInfo();

      //gameLoop();
    }

    generateLegend();
    resize();
    $("#destroyerLogo").addClass("in");
  });

  var menuImageTop = $(".menuImageTop img"),
    menuImageTopStart,
    menuImageTopEnd,
    menuImageBottom = $(".menuImageBottom img"),
    menuImageBottomStart,
    menuImageBottomEnd,
    infoImage = $(".infoImage img"),
    infoImageStart,
    infoImageEnd;

  function initParallax() {
    menuImageTopStart =
      $(".menuDateContainer").offset().top - $(window).height();
    menuImageTopEnd = menuImageTopStart + $(window).height() / 3;

    menuImageBottomStart =
      $(".menuImageBottom").offset().top - $(window).height();
    menuImageBottomEnd = menuImageBottomStart + $(window).height() / 3 + 500;

    infoImageStart = $(".infoImage").offset().top - $(window).height();
    infoImageEnd = infoImageStart + $(window).height() / 3 + 500;
  }

  function updateParallax(scrollTop) {
    parallaxMenuImageTop(scrollTop);
    parallaxMenuImageBottom(scrollTop);
    parallaxInfoImage(scrollTop);
  }

  function parallaxMenuImageTop(scrollTop) {
    var opacity = mapRange(
      scrollTop,
      menuImageTopStart,
      menuImageTopEnd,
      0.3,
      1
    );
    if (opacity > 1) opacity = 1 - Math.abs(1 - opacity) * 0.4;
    var rotationX = mapRange(
      scrollTop,
      menuImageTopStart,
      menuImageTopEnd,
      8,
      0
    );
    if (rotationX < 0) rotationX = 0;
    var scale = mapRange(scrollTop, menuImageTopStart, menuImageTopEnd, 0.6, 1);
    if (scale > 1) scale = 1;
    var translateY = mapRange(
      scrollTop,
      menuImageTopStart,
      menuImageTopEnd,
      100,
      0
    );

    TweenMax.set(menuImageTop, {
      opacity: opacity,
      /*rotationX: rotationX, scale: scale,*/ y: translateY,
    });
  }

  function parallaxMenuImageBottom(scrollTop) {
    var opacity = mapRange(
      scrollTop,
      menuImageBottomStart,
      menuImageBottomEnd,
      0.3,
      1
    );
    if (opacity > 1) opacity = 1 - Math.abs(1 - opacity) * 0.4;
    var rotationX = mapRange(
      scrollTop,
      menuImageBottomStart,
      menuImageBottomEnd,
      8,
      0
    );
    if (rotationX < 0) rotationX = 0;
    var scale = mapRange(
      scrollTop,
      menuImageBottomStart,
      menuImageBottomEnd,
      0.6,
      1
    );
    if (scale > 1) scale = 1;
    var translateY = mapRange(
      scrollTop,
      menuImageBottomStart,
      menuImageBottomEnd,
      100,
      0
    );

    TweenMax.set(menuImageBottom, {
      opacity: opacity,
      /*rotationX: rotationX, scale: scale,*/ y: translateY,
    });
  }

  function parallaxInfoImage(scrollTop) {
    var opacity = mapRange(scrollTop, infoImageStart, infoImageEnd, 0.3, 1);
    if (opacity > 1) opacity = 1 - Math.abs(1 - opacity) * 0.4;
    var rotationX = mapRange(scrollTop, infoImageStart, infoImageEnd, 8, 0);
    if (rotationX < 0) rotationX = 0;
    var scale = mapRange(scrollTop, infoImageStart, infoImageEnd, 0.6, 1);
    if (scale > 1) scale = 1;
    var translateY = mapRange(scrollTop, infoImageStart, infoImageEnd, 100, 0);

    TweenMax.set(infoImage, {
      opacity: opacity,
      /*rotationX: rotationX, scale: scale,*/ y: translateY,
    });
  }

  function mapRange(value, low1, high1, low2, high2) {
    return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  if (is.not.mobile() && is.not.safari()) {
    var interval = setInterval(function () {
      if (!scrolling) {
        $(".destroyerStar")
          .find(".logoLetter")
          .each(function () {
            var elem = $(this);
            if (getRandomInt(0, 3) == 1) {
              if ($(this).hasClass("shimmer")) {
                $(this).removeClass("shimmer");
                TweenMax.killTweensOf($(this));
                TweenMax.to($(this), 0.6, { opacity: 1 });
              } else {
                $(this).addClass("shimmer");
                TweenMax.killTweensOf($(this));
                TweenMax.to($(this), 1.2, {
                  opacity: 0.4,
                  repeat: -1,
                  yoyo: true,
                });
              }
            }
          });

        $(".navigation")
          .find(".navigationLetter")
          .each(function () {
            var elem = $(this);
            if (getRandomInt(0, 3) == 1) {
              if ($(this).hasClass("shimmer")) {
                $(this).removeClass("shimmer");
                TweenMax.killTweensOf($(this));
                TweenMax.to($(this), 0.6, { opacity: 1 });
              } else {
                $(this).addClass("shimmer");
                TweenMax.killTweensOf($(this));
                TweenMax.to($(this), 1.2, {
                  opacity: 0.4,
                  repeat: -1,
                  yoyo: true,
                });
              }
            }
          });
      }
    }, 1200);
  }

  var m = moment().tz("America/Los_Angeles");
  var currentDay =
    m.date() < 10
      ? '<span class="singleDigit">' + m.date() + "</span>"
      : "<span>" + m.date() + "</span>";
  $(".dayWheel .day-active").html(currentDay);
  for (var i = 1; i < 10; i++) {
    m.add(1, "days");
    currentDay =
      m.date() < 10
        ? '<span class="singleDigit">' + m.date() + "</span>"
        : "<span>" + m.date() + "</span>";
    $(".dayWheel .day-next-" + i).html(currentDay);
  }

  m = moment().tz("America/Los_Angeles");
  for (var i = 1; i < 9; i++) {
    m.subtract(1, "days");
    currentDay =
      m.date() < 10
        ? '<span class="singleDigit">' + m.date() + "</span>"
        : "<span>" + m.date() + "</span>";
    $(".dayWheel .day-prev-" + i).html(currentDay);
  }

  m = moment().tz("America/Los_Angeles");
  var currentMonth =
    m.month() + 1 < 10
      ? '<span class="singleDigit">' + (m.month() + 1) + "</span>"
      : "<span>" + (m.month() + 1) + "</span>";
  $(".monthWheel .month-active").html(currentMonth);
  for (var i = 1; i < 7; i++) {
    m.add(1, "month");
    currentMonth =
      m.month() + 1 < 10
        ? '<span class="singleDigit">' + (m.month() + 1) + "</span>"
        : "<span>" + (m.month() + 1) + "</span>";
    $(".monthWheel .month-next-" + i).html(currentMonth);
  }

  m = moment().tz("America/Los_Angeles");
  for (var i = 1; i < 6; i++) {
    m.subtract(1, "month");
    currentMonth =
      m.month() + 1 < 10
        ? '<span class="singleDigit">' + (m.month() + 1) + "</span>"
        : "<span>" + (m.month() + 1) + "</span>";
    $(".monthWheel .month-prev-" + i).html(currentMonth);
  }

  m = moment().tz("America/Los_Angeles");
  var year = String(m.year())
    .match(/.{1,1}/g)
    .join("<br/>");
  $(".year").html(year);

  var movementFunction = $(".hub-slider-slides ul").hubSlider({
    selector: $("li"),
    button: {
      next: $(".hub-slider-arrow_next"),
      prev: $(".hub-slider-arrow_prev"),
    },
    transition: "0.6s",
    startOffset: -40,
    scaleStep: 0.1,
    auto: false,
    time: 2, // secondly
  });

  $(".hub-slider-slides ul").on("click", function () {
    //movementFunction('next');
    //window.location.href = 'http://destroyerla.tumblr.com';
  });

  $(".hub-slider-arrow_next").on("click", function (e) {
    var slideIdx = $('.hub-slider-slides li[style*="opacity: 1"]').index() + 1;
    var eventLabel = "homepage_journal_image" + slideIdx + "_next_arrow";
    ga("send", "event", "button", "click", eventLabel);
  });

  $(".hub-slider-arrow_prev").on("click", function (e) {
    var slideIdx = $('.hub-slider-slides li[style*="opacity: 1"]').index() + 1;
    var eventLabel = "homepage_journal_image" + slideIdx + "_prev_arrow";
    ga("send", "event", "button", "click", eventLabel);
  });

  if (is.firefox() || is.safari()) {
    $("html").addClass("firefox");
  }

  //EVENT HANDLERS
  $(document).on("keyup", function (e) {
    if (e.keyCode == 82) updateLayout();
    else if (e.keyCode == 39) movementFunction("next");
    else if (e.keyCode == 37) movementFunction("prev");

    moveSpaceshipRight = false;
    moveSpaceshipLeft = false;
  });

  $('a[href*="#"]:not([href="#"])').click(function () {
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ? target : $("id=" + this.hash.slice(1));
      var scrollTop = target.offset().top;
      if (this.hash == "#info" && is.not.mobile())
        scrollTop = target.offset().top + 100;
      else if (this.hash == "#info" && is.mobile())
        scrollTop = target.offset().top + 80;
      else if (this.hash == "#journal" && is.not.mobile())
        scrollTop = target.offset().top + 80;

      if (target.length) {
        $("html, body").animate(
          {
            scrollTop: scrollTop,
          },
          1000
        );
        return false;
      }
    }
  });

  function resize() {
    $(".landing").css("height", "");
    $(".destroyerStarLogo").css("height", "");
    $("#destroyerLogo").css("height", "");
    $(".destroyerStar").css("height", "");
    windowHeight = $(window).height();
    windowWidth = $(window).width();

    clockOffsetTop =
      $(".openingHoursClock").offset().top + $(window).height() / 3;
    menuDateOffsetTop = $(".menuDateContainer").offset().top + 300;
    logoStarOffsetTop = $(".theEnd").offset().top + $(window).height() / 2;
    totalPageHeight =
      $(".menu").outerHeight() +
      $(".info").outerHeight() +
      $(".journal").outerHeight();
    menuOffsetTop =
      $(".modular-row.menu").offset().top +
      $(".modular-row.menu").outerHeight() +
      $(window).height();
    infoOffsetTopStart = $(".modular-row.info").offset().top - windowHeight / 2;
    infoOffsetTopEnd = $(".modular-row.journal").offset().top;

    maxScrollTop = totalPageHeight;

    $(".landing").css("height", $(window).height() + "px");
    $(".destroyerStarLogo").css("height", $(".destroyerStar").width() / 2 - 80);

    $(".destroyerStar").css("height", $(".destroyerStar").width());

    if ($(window).width() <= 640) {
      $(".hub-slider ul").css("height", $(".hub-slider ul li").height() + "px");
    } else {
      $("#destroyerLogo").css("height", $(".destroyerStarLogo").height());
    }

    logoStarContainerHeight = $(".destroyerStarLogoMiddle").height();
  }

  $(window).on("resize", resize);

  //REPULSION
  var grp = [];
  var grpInfo = [];
  //unexplainable parameter
  var param0 = 10000000;
  //radius of the force, the bigger number the smaller the radius is
  var param1 = 5;
  var mx = 0;
  var my = 0;

  param2 = 0.1;
  param3 = 0.1;
  param4 = -0.5;

  for (var i = 0; i < $(".menu .ingredient").length; i++) {
    grp[i] = [];
    grp[i].element = $($(".menu .ingredient")[i]);
    grp[i].ox = $($(".menu .ingredient")[i]).offset().left;
    grp[i].oy =
      $($(".menu .ingredient")[i]).offset().top - $(".menu").offset().top;
    grp[i].x = grp[i].ox;
    grp[i].y = grp[i].oy;
    var mx = getRandomInt(-500, 500);
    var my = getRandomInt(-500, 500);
    if (mx > 0) mx = $(window).width() + mx;
    if (my > 0) my = $(window).height() + my;

    grp[i].mx = mx;
    grp[i].my = my;
  }

  for (var i = 0; i < $(".info .infoTextItem").length; i++) {
    grpInfo[i] = [];
    grpInfo[i].element = $($(".info .infoTextItem")[i]);
    grpInfo[i].ox = $($(".info .infoTextItem")[i]).offset().left;
    grpInfo[i].oy =
      $($(".info .infoTextItem")[i]).offset().top - $(".info").offset().top;
    grpInfo[i].x = grpInfo[i].ox;
    grpInfo[i].y = grpInfo[i].oy;
    var mx = getRandomInt(-500, 500);
    var my = getRandomInt(-500, 500);
    if (mx > 0) mx = $(window).width() + mx;
    if (my > 0) my = $(window).height() + my;

    grpInfo[i].mx = mx;
    grpInfo[i].my = my;
  }

  $(".menu").mousemove(function (e) {
    mx = e.pageX - $(".menu").offset().left;
    my = e.pageY - $(".menu").offset().top;
  });

  $(".info").mousemove(function (e) {
    mx = e.pageX - $(".info").offset().left;
    my = e.pageY - $(".info").offset().top;
  });

  function updateRepulsion() {
    for (var i = 0; i < grp.length; i++) {
      var atom = grp[i];

      var ax = atom.x;
      var ay = atom.y;
      var ox = atom.ox;
      var oy = atom.oy;
      var d = getDistance(mx, my, ax, ay);

      var repulsion = param0;

      for (var j = 0; j < param1; j++) {
        repulsion /= d;
      }

      repulsion = Math.min(param4, repulsion);
      var angle1 = Math.atan2(ay - my, ax - mx);
      var xspeed = repulsion * Math.cos(angle1) + (ox - ax) * param2;
      var yspeed = repulsion * Math.sin(angle1) + (oy - ay) * param3;

      atom.x = atom.x + xspeed;
      atom.y = atom.y + yspeed;

      TweenMax.set(atom.element, { x: atom.x - atom.ox, y: atom.y - atom.oy });
    }
  }

  function updateRepulsionInfo() {
    for (var i = 0; i < grpInfo.length; i++) {
      var atom = grpInfo[i];

      var ax = atom.x;
      var ay = atom.y;
      var ox = atom.ox;
      var oy = atom.oy;
      var d = getDistance(mx, my, ax, ay);

      var repulsion = param0;

      for (var j = 0; j < param1; j++) {
        repulsion /= d;
      }

      repulsion = Math.min(param4, repulsion);
      var angle1 = Math.atan2(ay - my, ax - mx);
      var xspeed = repulsion * Math.cos(angle1) + (ox - ax) * param2;
      var yspeed = repulsion * Math.sin(angle1) + (oy - ay) * param3;

      atom.x = atom.x + xspeed;
      atom.y = atom.y + yspeed;

      TweenMax.set(atom.element, { x: atom.x - atom.ox, y: atom.y - atom.oy });
    }
  }

  function getDistance(x1, y1, x2, y2) {
    var dx = x1 - x2;
    var dy = y1 - y2;
    return Math.sqrt(dx * dx + dy * dy);
  }

  function detectCollision(xMissile, yMissile, xTarget, yTarget) {
    var circle1 = { radius: 12, x: xMissile, y: yMissile };
    var circle2 = { radius: 12, x: xTarget, y: yTarget };

    var dx = circle1.x - circle2.x;
    var dy = circle1.y - circle2.y;
    var distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < circle1.radius + circle2.radius) {
      return true;
    } else {
      return false;
    }
  }

  var missiles = [];
  var logoLetterPositions = [];

  function initiateGame() {
    var logoLetters = $(".logoLetterVisible");
    for (var i = 0; i < logoLetters.length; i++) {
      logoLetterPositions[i] = logoLetters[i].getBoundingClientRect();
    }
  }

  function launchMissile() {
    var launchCoords = {
      top: spaceship.getBoundingClientRect().top,
      left: spaceship.getBoundingClientRect().left + 31,
    };
    var missile = $(
      '<div class="missile"><div class="projectile"></div></div>'
    );
    missile.css({
      top: launchCoords.top + "px",
      left: launchCoords.left + "px",
    });
    $("body").append(missile);

    var missileCoords = {
      top: launchCoords.top,
      left: launchCoords.left,
      offset: launchCoords.top,
      target: missile,
    };

    //missiles.push(missileCoords);

    TweenMax.to(missile, 2, {
      y: -$(window).height(),
      onUpdate: function () {
        missileCoords.top =
          missileCoords.offset +
          Number(this._targets[0]._gsTransform.y.toFixed(0));
        attackTarget(missileCoords);
      },
      onComplete: function () {
        missile.remove();
      },
      onUpdateParams: ["{self}"],
    });

    soundManager.play("shot");
  }

  var score = 0;
  function increaseScore() {
    score += 10;
    var scoreArr = String(score).split("");
    console.log(scoreArr);
    var count = 0;
    for (var i = 5 - scoreArr.length; i < 5; i++) {
      $($(".odometer")[i]).html(scoreArr[count]);
      $($(".odometer")[i]).css("visibility", "visible");
      count++;
    }

    for (var i = 0; i < 5 - scoreArr.length; i++) {
      $($(".odometer")[i]).css("visibility", "hidden");
    }
  }

  function attackTarget(missile) {
    for (var j = 0; j < logoLetterPositions.length; j++) {
      if (logoLetterPositions[j].isHit === undefined) {
        if (
          detectCollision(
            missile.left,
            missile.top,
            logoLetterPositions[j].left,
            logoLetterPositions[j].top
          )
        ) {
          console.log("COLLISION");

          soundManager.play("explosion");

          increaseScore();
          $($(".logoLetterVisible")[j]).css("visibility", "hidden");
          logoLetterPositions[j].isHit = true;

          var explosion = $('<div class="explosion"></div>');
          explosion.css({
            top: logoLetterPositions[j].top - 8 + "px",
            left: logoLetterPositions[j].left - 8 + "px",
          });
          $("body").append(explosion);

          TweenMax.to(explosion, 0.6, {
            backgroundPosition: "0 -300px",
            ease: SteppedEase.config(10),
            onComplete: function () {
              explosion.remove();
            },
          });

          missile.target.remove();
          TweenMax.killTweensOf(missile.target);

          return;
        }
      }
    }
  }

  function gameLoop() {
    for (var i = 0; i < missiles.length; i++) {
      for (var j = 0; j < logoLetterPositions.length; j++) {
        if (logoLetterPositions[j].isHit === undefined) {
          if (
            detectCollision(
              missiles[i].left,
              missiles[i].top,
              logoLetterPositions[j].left,
              logoLetterPositions[j].top
            )
          ) {
            console.log("COLLISION");

            $($(".logoLetter")[j]).css("display", "none");
            logoLetterPositions[j].isHit = true;
            console.log(missiles[i].target);
            missiles[i].target.css("visibility", "hidden");
            TweenMax.killTweensOf(missiles[i].target);

            //var elem = missiles.indexOf( missiles[i] );
            //console.log(elem);
            //if(elem != -1) {
            //missiles.splice(elem, 1);
            //}

            //missiles[i].target.remove();

            return;
          }
        }
      }
    }
  }

  soundManager.setup({
    url: "/user/themes/antimatter/swf/",
    onready: function () {
      initSounds();
    },
  });

  function initSounds() {
    soundManager.createSound({
      id: "shot",
      url: "/user/themes/antimatter/sounds/shot.mp3",
      autoLoad: true,
      volume: 60,
    });

    soundManager.createSound({
      id: "explosion",
      url: "/user/themes/antimatter/sounds/shot.mp3",
      autoLoad: true,
      volume: 60,
    });

    soundManager.createSound({
      id: "gamestart",
      url: "/user/themes/antimatter/sounds/shot.mp3",
      autoLoad: true,
    });
    //soundManager.play('shot');
  }

  var isScrolledToBottom = false;
  $(window).on("scroll", function () {
    if (!isScrolledToBottom) {
      if ($(window).scrollTop() + $(window).height() == $(document).height()) {
        TweenMax.fromTo(
          $(".spaceBar"),
          0.5,
          { opacity: 0, y: 40 },
          {
            opacity: 0.7,
            y: 0,
            onComplete: function () {
              $(".spaceBar").css("opacity", "");
              $(".spaceBar").addClass("animate");
            },
          }
        );
        soundManager.play("gamestart");
        isScrolledToBottom = true;
      }
    }
  });

  $(document).on("keydown", function (e) {
    if (!isScrolledToBottom) return;
    if (!gameOn && e.keyCode == 32) {
      $(".spaceBar").remove();
      gameOn = true;
      initiateGame();
      ga("send", "event", "keypress", "spacebar", "homepage_game");
      TweenMax.fromTo(
        $(".score"),
        0.5,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, onComplete: function () {} }
      );
    }

    if (e.keyCode == 32) {
      launchMissile();
    }

    if (gameOn && e.keyCode == 39) {
      moveSpaceshipRight = true;
      moveSpaceshipLeft = false;
    } else if (gameOn && e.keyCode == 37) {
      moveSpaceshipLeft = true;
      moveSpaceshipRight = false;
    }
  });

  //(function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='//rawgit.com/mrdoob/stats.js/master/build/stats.min.js';document.head.appendChild(script);})()
});
