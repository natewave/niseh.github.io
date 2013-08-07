(function(jQuery) {

  var init = function(target, options) {
    var pointArr = [{x:0, y:0}, {x:0, y:0}, {x:0, y:0}];
    var randArr1 = [Math.random() + 1, Math.random() + 1, Math.random() + 1];
    var randArr2 = [0 , 0, 0];
    var keyCnt = 0;
    var elemArr = [];
    var loopTimer = null;
    var autoTimer = null;
    var imageHeight = options.imageHeight;
    var imageWidth = options.imageWidth;
    var image = options.image;
    var isMouseover = false;

    target.css({position: "relative"});

    for (var i = 0; i < imageHeight; i++) {
      var pos = -i + "px";
      target.append("<div></div>");
      target.find("div").eq(i).css({
        backgroundImage: "url(" + image + ")",
        backgroundPosition: "0px " + pos,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "1px",
        width: "62px",
        position: "absolute",
        top: i + "px"
      });
      elemArr.push(target.find("div").eq(i));
    }

    if (options.auto) {
      autoTimer =  setInterval(function() {
        if (isMouseover) return;
        start();

        setTimeout(stop, options.delay / 2 * Math.random());
      }, options.delay);
    }

    target.mouseover(start);
    target.mouseout(stop);

    function start() {
      isMouseover = true;
      clearInterval(loopTimer);
      loopTimer = setInterval(onEnterframe, 30);
    }

    function stop() {
      isMouseover = false;
      clearInterval(loopTimer);
      loopTimer = null;

      for (var i = 0; i < imageHeight; i++) {
        elemArr[i].css({left: 0});
      }
    }

    function onEnterframe() {
      var i;
      for (i = 0; i < 3; i++) {
        if (randArr1[i] >= 1){
          --randArr1[i];
          randArr2[i] = Math.random() / 4 + 0.03;
        }
        randArr1[i] += randArr2[i];
        keyCnt += (38 - keyCnt) * 0.25;
        pointArr[i].x = Math.ceil(Math.sin(randArr1[i] * Math.PI * 2) * randArr2[i] * keyCnt * 2);
        pointArr[i].y = 0;
      }
      var keyNum = (Math.abs(pointArr[0].x) + Math.abs(pointArr[1].x) + Math.abs(pointArr[2].x) + 8) / 4;

      i = imageHeight;
      while(i-=1) {
        var offset = Math.sin(i / imageHeight * Math.PI * (Math.random() / 8 + 1)) * 0.8 * keyNum * keyNum;
        elemArr[i].css({left: offset + "px "});
      }
    }
  };

  jQuery.fn.RadioSignal = function(options) {
    this.each(function() {
      options = jQuery.extend({}, jQuery.fn.RadioSignal.defaults, options);
      init(jQuery(this), options);
    });
  };

  jQuery.fn.RadioSignal.defaults = {
    imageHeight: 0,
    imageWidth: 0,
    image: "",
    auto: false,
    delay: 30000
  };

} )(jQuery);