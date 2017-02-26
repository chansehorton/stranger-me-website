'use strict';

$( document ).ready(function() {

  let def_givenMenu = $('#centerImg');
  let def_allCharMenus = def_givenMenu.closest('div').children('.character-menu');
  let def_thisQuoteList = def_givenMenu.children('.quote-list');
  let imgClickFlag = 0;
  let prevScreenWidth = $(window).width();

  $(window).resize(resizeHandler());

  startCheckSize();

  $(".circle").hover(function() {
    let hoveredImage = $(this);
    imgHover(hoveredImage);
  });

  $(".circle").click(function(e) {
    e.preventDefault();
    let clickedMenu = $(this).parent().parent();
    imgClick(clickedMenu, imgClickFlag);
  });

  $(".quote").click(function(e) {
    e.preventDefault();
    let clickedLink = $(this);
    quoteClick(clickedLink);
  });

  // functions

  function imgHover(givenImage) {
    givenImage.toggleClass("hovered-img-link");
  };

  function quoteClick(givenQuote) {
    const thisAudio = new Audio(givenQuote.data('audio'));
    thisAudio.play();
  };


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

    def_allCharMenus.each((index) => {
      let direction;

      if (cs_screenWidth > 1000) {
        switch ($(this).attr('id')) {
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
        switch ($(this).attr('id')) {
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
        $(this).attr('class', 'character-menu');
        const thisMenu = $(this);
        setTimeout(function() { thisMenu.addClass(direction); }, 1000);
      } else {
        $(this).addClass(direction);
      };
    });

    prevScreenWidth = cs_screenWidth;
  };

  function imgCollapse(c_givenMenu, c_allCharMenus, c_thisQuoteList) {

    c_allCharMenus.each((index) => {

      // $('html, body').animate({ scrollTop: 0 }, 'fast');

      if ($(this).attr('id') !== c_givenMenu.attr('id')) {
        $(this).attr('class', 'character-menu').addClass('notSelectedImg');
        $(this).delay(300).fadeToggle('slow');
      } else {
        $(this).attr('class', 'character-menu').addClass('selectedImg');
        const thisMenu = $(this);
        setTimeout(function() { thisMenu.addClass('selectedImgAction'); }, 1000);
        setTimeout(function() { processAudioLinks(c_thisQuoteList); },1500);
      };
    });

    imgClickFlag = 1;
  };

  function imgExpandHoriz(eh_givenMenu, eh_allCharMenus, eh_thisQuoteList) {

    eh_allCharMenus.each((index) => {
      let direction;

      switch ($(this).attr('id')) {
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
        const thisMenu = $(this);

        if ($(this).attr('id') !== eh_givenMenu.attr('id')) {
          setTimeout(function() { thisMenu.fadeToggle(); }, 300);
          setTimeout(function() { thisMenu.addClass(direction); }, 1000);
        } else {
          $(this).removeClass('selectedImgAction');
          setTimeout(function() { thisMenu.addClass(direction); }, 1000);
        };

      } else {
        $(this).addClass(direction);
      };
    });

    imgClickFlag = 0;
  };

  function imgExpandVert(ev_givenMenu, ev_allCharMenus, ev_thisQuoteList) {

    ev_allCharMenus.each((index) => {

      let direction;

      switch ($(this).attr('id')) {
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
        const thisMenu = $(this);

        ev_thisQuoteList.toggleClass('open');

        if ($(this).attr('id') !== ev_givenMenu.attr('id')) {
          setTimeout(function() { thisMenu.fadeToggle(); }, 300);
          setTimeout(function() { thisMenu.addClass(direction); }, 1000);
        } else {
          $(this).removeClass('selectedImgAction');
          setTimeout(function() { thisMenu.addClass(direction); }, 1000);
        };
      } else {
        $(this).addClass(direction);
      };
    });

    imgClickFlag = 0;
  };

  function processAudioLinks(p_thisQuoteList) {
    const circleSize = 225;
    const circleAlignment = -1.25;
    const circleLeftOffset = 80;
    const circleTopOffset = 115;
    const theseAudioLinks = p_thisQuoteList.children();

    for(let i = 0, l = theseAudioLinks.length; i < l; i++) {
      const centerAngleInRadians = ((180/l)*(i))*(Math.PI/180);

      theseAudioLinks[i].style.left = ((circleSize*Math.cos(circleAlignment*centerAngleInRadians)) + circleLeftOffset).toFixed(0) + "px";
      theseAudioLinks[i].style.top = ((circleSize*Math.sin(circleAlignment*centerAngleInRadians)) - circleTopOffset).toFixed(0) + "px";
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
        imgExpandVert(givenMenu, allCharMenus, thisQuoteList, $(window).width());
      };
    } else {
      if (imgClicked === 0) {
        imgCollapse(givenMenu, allCharMenus, thisQuoteList);
      } else {
        imgExpandHoriz(givenMenu, allCharMenus, thisQuoteList, $(window).width());
      };
    };
  };

});
