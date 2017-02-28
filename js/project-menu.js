'use strict';

$( document ).ready(function() {

  console.log('doument loading');

  let def_givenMenu = $('#centerImg');
  let def_allCharMenus = def_givenMenu.closest('div').children('.character-menu');
  let def_thisQuoteList = def_givenMenu.children('.quote-list');
  let imgClickFlag = 0;
  let prevScreenWidth = $(window).width();

  startCheckSize();

  $(window).resize(resizeHandler());

  $(".circle").hover(function() {
    let hoveredImage = $(this);
    imgHover(hoveredImage);
  });

  $(".circle").click(function(e) {
    e.preventDefault();
    let clickedMenu = $(this).parent().parent();
    imgClick(clickedMenu, imgClickFlag);
  });

  // $(".quote").click(function(e) {
  //   e.preventDefault();
  //   let clickedLink = $(this);
  //   quoteClick(clickedLink);
  // });

  // functions

  function imgHover(givenImage) {
    givenImage.toggleClass("hovered-img-link");
  };

  // function quoteClick(givenQuote) {
  //   const thisAudio = new Audio(givenQuote.data('audio'));
  //   thisAudio.play();
  // };


  function resizeHandler() {
    //we don't want the checkSize function to pop off a zillion times, just once at the end of resizing
    let timer_id;

    $(window).resize(() => {
      clearTimeout(timer_id);
      timer_id = setTimeout(checkSize(def_givenMenu, def_allCharMenus, prevScreenWidth), 200);
    });
  };

  function startCheckSize() {
    if ($(window).width() <= 1000) {
      imgExpandVert(def_givenMenu, def_allCharMenus, def_thisQuoteList);
    } else {
      imgExpandHoriz(def_givenMenu, def_allCharMenus, def_thisQuoteList, $(window).width());
    };
  };

  function checkSize() {
    const cs_screenWidth = $(window).width();

    def_allCharMenus.each((index, element) => {
      let direction;

      if (cs_screenWidth > 1000) {
        switch ($(element).attr('id')) {
          case 'centerImg':
            direction = "center";
            break;
          case 'farLeftImg':
            direction = "farLeftHoriz";
            break;
          case 'farRightImg':
            direction = "farRightHoriz";
            break;
          case 'closeLeftImg':
            direction = "closeLeftHoriz";
            break;
          case 'closeRightImg':
            direction = "closeRightHoriz";
            break;
        };
      } else {
        switch ($(element).attr('id')) {
          case 'centerImg':
            direction = "center";
            break;
          case 'farLeftImg':
            direction = "farLeftVert";
            break;
          case 'farRightImg':
            direction = "farRightVert";
            break;
          case 'closeLeftImg':
            direction = "closeLeftVert";
            break;
          case 'closeRightImg':
            direction = "closeRightVert";
            break;
        };
      };

      if (((cs_screenWidth > 1000) && (prevScreenWidth < 1000)) || ((cs_screenWidth < 1000) && (prevScreenWidth > 1000))) {
        $(element).attr('class', 'character-menu');
        setTimeout(function() { $(element).addClass(direction); }, 1000);
      } else {
        $(element).addClass(direction);
      };
    });

    prevScreenWidth = cs_screenWidth;
  };

  function imgCollapse(c_givenMenu, c_allCharMenus, c_thisQuoteList) {

    c_allCharMenus.each((index, element) => {

      if ($(element).attr('id') !== c_givenMenu.attr('id')) {
        $(element).attr('class', 'character-menu').addClass('notSelectedImg');
        $(element).delay(300).fadeToggle('slow');
      } else {
        $(element).attr('class', 'character-menu').addClass('selectedImg');
        setTimeout(function() { $(element).addClass('selectedImgAction'); }, 1000);
        setTimeout(function() { processLinks(c_thisQuoteList); },1500);
      };
    });

    imgClickFlag = 1;
  };

  function imgExpandHoriz(eh_givenMenu, eh_allCharMenus, eh_thisQuoteList) {

    eh_allCharMenus.each((index, element) => {
      let direction;

      switch ($(element).attr('id')) {
        case 'centerImg':
          direction = "center";
          break;
        case 'farLeftImg':
          direction = "farLeftHoriz";
          break;
        case 'farRightImg':
          direction = "farRightHoriz";
          break;
        case 'closeLeftImg':
          direction = "closeLeftHoriz";
          break;
        case 'closeRightImg':
          direction = "closeRightHoriz";
          break;
      };

      if (imgClickFlag === 1) {
        eh_thisQuoteList.toggleClass('open');

        if ($(element).attr('id') !== eh_givenMenu.attr('id')) {
          setTimeout(function() { $(element).fadeToggle(); }, 300);
          setTimeout(function() { $(element).addClass(direction); }, 1000);
          setTimeout(function() {
            $(element).removeClass('notSelectedImg');
          }, 1100);
        } else {
          $(element).removeClass('selectedImgAction');
          setTimeout(function() { $(element).addClass(direction); }, 1000);
          setTimeout(function() {
            $(element).removeClass('selectedImg');
          }, 1100);
        };

      } else {
        $(element).addClass(direction);
      };
    });

    imgClickFlag = 0;
  };

  function imgExpandVert(ev_givenMenu, ev_allCharMenus, ev_thisQuoteList) {

     ev_allCharMenus.each((index, element) => {
      let direction;

      switch ($(element).attr('id')) {
        case 'centerImg':
          direction = "center";
          break;
        case 'farLeftImg':
          direction = "farLeftVert";
          break;
        case 'farRightImg':
          direction = "farRightVert";
          break;
        case 'closeLeftImg':
          direction = "closeLeftVert";
          break;
        case 'closeRightImg':
          direction = "closeRightVert";
          break;
      };

      if (imgClickFlag === 1) {
        ev_thisQuoteList.toggleClass('open');

        if ($(element).attr('id') !== ev_givenMenu.attr('id')) {
          setTimeout(function() { $(element).fadeToggle(); }, 300);
          setTimeout(function() { $(element).addClass(direction); }, 1000);
          setTimeout(function() {
            $(element).removeClass('notSelectedImg');
          }, 1100);
        } else {
          $(element).removeClass('selectedImgAction');
          setTimeout(function() { $(element).addClass(direction); }, 1000);
          setTimeout(function() {
            $(element).removeClass('selectedImg');
          }, 1100);
        };
      } else {
        $(element).addClass(direction);
      };
    });

    imgClickFlag = 0;
  };

  function processLinks(p_thisQuoteList) {
    console.log(p_thisQuoteList);

    const circleSize = 170;
    const circleAlignment = -1.5;
    const circleLeftOffset = 60;
    const circleTopOffset = 180;
    const theseLinks = p_thisQuoteList.children();

    console.log('processing links');
    for(let i = 0, l = theseLinks.length; i < l; i++) {
      const centerAngleInRadians = ((180/l)*(i))*(Math.PI/180);

      theseLinks[i].style.left = ((circleSize*Math.cos(circleAlignment*centerAngleInRadians)) + circleLeftOffset).toFixed(0) + "px";
      theseLinks[i].style.top = ((circleSize*Math.sin(circleAlignment*centerAngleInRadians)) - circleTopOffset).toFixed(0) + "px";
    };

    p_thisQuoteList.toggleClass('open');
  };

  function imgClick(givenMenu, imgClicked) {
    const allCharMenus = givenMenu.closest('div').children('.character-menu');
    const thisQuoteList = givenMenu.children('.quote-list');

    if ($(window).width() < 1000) {
      if (imgClicked === 0) {
        imgCollapse(givenMenu, allCharMenus, thisQuoteList);
      } else {
        imgExpandVert(givenMenu, allCharMenus, thisQuoteList);
      };
    } else {
      if (imgClicked === 0) {
        imgCollapse(givenMenu, allCharMenus, thisQuoteList);
      } else {
        imgExpandHoriz(givenMenu, allCharMenus, thisQuoteList);
      };
    };
  };

});
