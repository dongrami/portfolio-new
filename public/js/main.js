var WheelScroll = (function() {
   function WheelScroll(_opt) {
      var obj = this;  //this = function
      if(_opt) {
         if(_opt.page)  this.page = $(_opt.page);
         else this.page = $(".pages");
      }
      else {
         this.page = $(".pages");
         this.nav = null;
      }
      this.scTop = $(window).scrollTop();
      this.gap = [];
      this.oldNow = 0;
      this.now = 0;
      this.dir = 0;
      
      $(window).resize(function() {
         $(obj.page).each(function(i) {
            obj.gap[i] = $(this).offset().top; 
         });
      }).trigger("resize");
      this.init(this);
      if(_opt.nav) this.navAdd(obj, _opt.nav);
   }
      
   WheelScroll.prototype.init = function(obj) {
      $(window).scroll(function(){
         $(obj.page).each(function(i) {
            obj.gap[i] = $(this).offset().top; 
         });
         obj.scTop = $(window).scrollTop();   
         for(var i=0; i<obj.gap.length; i++) {
            if(obj.scTop <= obj.gap[i] + 500) {
               obj.now = i;
               break;
            }
         }
         // console.log(obj.now)
      });
   }
   WheelScroll.prototype.navAdd = function(obj, navObj) {
      $(navObj).on("click", function() {
         obj.oldNow = obj.now;
         obj.now = $(this).data("now");  
         obj.animation(obj, null);
      });
   }
   WheelScroll.prototype.animation = function(obj, fn) {
      $("html, body").stop().animate({"scrollTop":obj.gap[obj.now]+"px"}, 300, fn);
   }
   return WheelScroll;
}());

var pages = new WheelScroll({
   page: ".pages", 
   nav: ".nav_bt"
});



/***** Infinite *****/
var number = 1;
var interval2;
$(".pf-txt-bg").find(".pf-txt").each(function(){
   var name = $(this).data("name");
   var html = '<span class="dote"  onclick="paging2(this);>'+name+'</span>';
   $(this).parent().next().find(".pager").append(html);
});
interval2 = setInterval(slide, 3000);
function slide() {
   $(".pf-bg").stop().animate({"left":-(number*100)+"%"}, 500, function(){
      if(number == 5) {
         number = 0;
         $(this).css({"left":0});  
      }
      number++;
   });
}
$(".pf-bg").hover(function(){
   clearInterval(interval2);
   clearInterval(interval1);
}, function(){
   interval2 = setInterval(slide,3000),
   interval1 = setInterval(slide1,3000);
});
function paging2(obj) {
   number = $(obj).index();
   clearInterval(interval2);
   slide();
   interval2 = setInterval(slide, 2000);
}
$(".pf-txt-bg").hover(function(){
   clearInterval(interval2);
   clearInterval(interval1 );
},function(){
   interval2 = setInterval(slide,3000);
   interval1 = setInterval(slide1,3000);
});

/***** Infinite *****/
var number1 = 1;
var interval1;
interval1 = setInterval(slide1, 3000);
function slide1() {
   $(".pf-txt-bg").stop().animate({"left":-(number1*100)+"%"}, 500, function(){
      if(number1 == 5) {
         number1 = 0;
         $(this).css({"left":0});
      }
      number1++;
   });
}