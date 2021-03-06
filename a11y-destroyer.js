// www > user > themes > animatter > templates > base.html.twig

$("body").append(
  $(
    "\n<style>.destroyerFooter .socialFooter span {margin: 0 20px;}\n .a11y-offscreen {\n    position:absolute;\n    left:-10000px;\n    top:auto;\n    width:1px;\n    height:1px;\n    overflow:hidden;\n}</style>\n"
  )
);

$(".menuDateContainer").attr("aria-hidden", "true");
$(".theEnd").attr("aria-hidden", "true");
$(".spaceBar").attr("aria-hidden", "true");
$(".navigation").attr("role", "navigation");
$(".score").attr("aria-hidden", "true");
$('a[href="#menu"]').attr("aria-label", "menu");
$('a[href="#info"]').attr("aria-label", "info");
$('a[href="#journal"]').attr("aria-label", "journal");
$('a[href="tel:310.360.3860"]').attr(
  "aria-label",
  "Phone number link - call us at 310.360.3860"
);
$(".modular-row.landing").attr("role", "article");
$(".modular-row.landing").prepend(
  '<h3 class="a11y-offscreen">Hours and Information</h3>'
);
$(".modular-row.info").attr("role", "article");
$(".modular-row.info").prepend(
  '<h3 class="a11y-offscreen">Contact Information</h3>'
);

$(".modular-row.menu").attr("role", "article");
$(".modular-row.menu").prepend('<h3 class="a11y-offscreen">Menu</h3>');

$("#body").prepend(
  $(
    '<h2 class="a11y-offscreen">Destroyer is a cafe atelier, serving delicious and beautiful food and beverage, and whose main function is to serve the community on a day-to-day basis.</h2>'
  )
);
$("#body").prepend($('<h1 class="a11y-offscreen">Destroyer LA</h1>'));

$(".socialFooter").attr("role", "contentinfo");
$('a[target="_blank"]').attr("rel", "external");
$('a[target="_blank"]').append(
  $('<span class="a11y-offscreen">, opens in a new window</span>')
);

setTimeout(function () {
  $(".openingHoursCopy").prepend(
    $('<span class="a11y-offscreen">Hours open</span>')
  );
  $("#infoHoursArea > div").clone().appendTo(".noReservations");
  $(".noReservations > .infoTextItem").hide();

  $(".hub-slider-arrow_next").attr("aria-label", "Next slide");
  $(".hub-slider-arrow_prev").attr("aria-label", "Previous slide");

  $($("a.info-link")[0]).attr("aria-label", "order online");
  $($("a.info-link")[1]).attr("aria-label", "catering");
  $(".ingredient").each(function (i, el) {
    var $el = $(el);
    var text = $el.text();
    if (
      text === "◊○" ||
      text === "∆" ||
      text === "∆○" ||
      text === "◊" ||
      text === "◊○"
    ) {
      $el.empty();
      $el.append(
        $(
          '<span aria-hidden="true">' +
            text +
            '</span><span class="a11y-offscreen">Menu item:</span>'
        )
      );
      console.log($(el).text());
    }
  });
}, 3000);

$(document).ready(function () {
  $("img").each(function (i, img) {
    var $img = $(img);
    var src = $img.attr("src");
    //console.log($img);
    switch (src) {
      case "/user/pages/01.home/_menu/menu-image-top.jpg":
        $img.attr("alt", "ceramic bowl with leaves");
        break;
      case "/user/pages/01.home/_menu/menu-image-bottom.jpg":
        $img.attr("alt", "starry sky in desert");
        break;
      case "/user/pages/01.home/_info/info-mood.jpg":
        $img.attr("alt", "interior photo of benches next to counter");
        break;
      case "/user/pages/01.home/_info/map.png":
        $img.attr("alt", "map - cross street is hayden ave and national blvd");
        break;
      case "/user/pages/01.home/_journal/carousel-image-1.jpg":
        $img.attr("alt", "ceramic bowl with granola");
        break;
      case "/user/pages/01.home/_journal/carousel-image-2.jpg":
        $img.attr("alt", "ceramic plate with dish");
        break;
      case "/user/pages/01.home/_journal/carousel-image-3.jpg":
        $img.attr("alt", "exterior view - minimal building detail");
        break;
      case "/user/pages/01.home/_journal/carousel-image-4.jpg":
        $img.attr("alt", "starry sky in desert");
        break;
      case "/user/pages/01.home/_journal/carousel-image-5.jpg":
        $img.attr("alt", "minimal artwork");
        break;
      case "/user/themes/antimatter/images/destroyerLogoRoman.png":
        $img.attr("alt", "");
        break;
    }
  });
});
