
var phrases = [
  'I go by the name <br/><strong>Justin.</strong>',
  'I am a <strong>designer</strong> of interfaces<br/>and interactions.',
  'I sometimes share playlists<br/>on <strong><a href="http://spotify.com" target="_blank">Spotify.</a></strong>',
  'I often take shots of<br/>pixels on <strong>Dribbble</strong>'
];

var stack = [];
var phraseHovered = false;
var delay = 4000;
var currentIndex = 0;


// Dribbble feed
$(document).ready(function getDribbbleShots() {   
  $.jribbble.getShotsByPlayerId('JustinCarson', function (playerShots) {
      var html = [];
      $.each(playerShots.shots, function (i, shot) {
          html.push('<div class="shot"><a href="' + shot.url + '" target="_blank">');
          html.push('<img class="shot-image" src="' + shot.image_url + '" ');
          html.push('alt="' + shot.title + '"></a></div>');
      });
      $('.dribbble-feed').html(html.join(''));
  }, {page: 1, per_page: 9});
});



// Adjust overlay on scroll
$( window ).scroll(function() {
  var body = $( "body" );
  scrollAmount = body.scrollTop();
  $( ".overlay" ).css("background", "rgba(65, 65, 65," + (scrollAmount/1000) + ")");
});

function getOverlayPercentage(scrollAmount) {
  if (scrollAmount <= 0)
    return 0.75
}


// Phrase hover event handlers
function hoverPhraseStart() {
  phraseHovered = true;
}
function hoverPhraseEnd() {
  phraseHovered = false;
}

// bind event handlers to mouseenter and mouseleave
// could also user .hover(start, end) but it's deprecated in v 1.9
$('.top-phrase').mouseenter(hoverPhraseStart).mouseleave(hoverPhraseEnd);



// ******* CHANGE TO SEQUENTIAL ORDER ***********
// Update phrase at top
function getPhrase(index) {
  if (index != undefined)
    return phrases[index];

  currentIndex += 1;
  if (currentIndex == phrases.length)
    currentIndex = 1;

  return phrases[currentIndex];
}

function updatePhrase(index) {
  if (phraseHovered) {
    return;
  }

  var $phrase = $( ".top-phrase" );

  setTimeout(function () {
    $phrase.html( getPhrase(index) ).fadeIn(500);
  }, 100);
}

function init() {

  updatePhrase(0);

  // Set interval for updating phrase
  setInterval(updatePhrase, delay);
}

$(init);


