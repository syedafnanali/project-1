function onClientLoad() {
    gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
}

function onYouTubeApiLoad() {
    gapi.client.setApiKey('AIzaSyCDJ7qY_sLt9wGLgvLFzwYnAFk-1PTmvqM');
}

$(document).ready(function () {

    //Search from API related to mood 
    var dict = {
        "Happy": ["classic vines", "epic fails", "babies and puppies"],
        "Sad": ["sad ballads", "adele", "sad movie scenes"],
        "Angry": ["had one job", "frustration", "frustrating unsatisfying"],
        "Excited": ["pump up videos", "motivational speeches", "pump up songs"],
        "Calm": ["lo-fi study", "calm strings", "oceans waves"]
    };

    //Change footer display on scrolling up/down
    $(window).on('scroll', function () {
        if ($(window).scrollTop() + $(window).height() == $(document).height()) {
            $('.footer').fadeOut(500);
        } else {
            $('.footer').fadeIn(500);
        }
    });

    $("#mood").show(1000);

    //On selecting mood , play related video
    $(".dropdown-item").click(function () {
        $("#mood").hide(1200);
        var x = dict[$(this).text()];
        var y = x[Math.floor(Math.random() * 3)];

        var searchItem = encodeURIComponent(y);
        var youtubeReq = gapi.client.youtube.search.list({
            part: 'snippet',
            q: searchItem,
            type: 'video',
            maxResults: 3,
        });
        youtubeReq.execute(getTheVideo);
        $("#weather").show(1700);
    });

    //Get the video from API and display on page
    function getTheVideo(response) {
        $('.vids').empty();
        console.log(response);

        var result = response.items;
        $.each(result, function (index, value) {
            $('.vids').append(`<div class="videoContainer"><br>
            <h5>${value.snippet.title}<h5>
            <iframe class="rs view" width="300" height="300" src="//www.youtube.com/embed/${value.id.videoId}" frameborder="0" allowfullscreen>
            </iframe></div>`)
        });
    }
});
