if (Meteor.isClient) {
    Template.RssFeed.onRendered(function () {
        $(document).ready(function(){
            //temporary disable the navigation menu
            $('.stickymenu').hide();

            $('body').css('background-color', '#FF4040');

            var rssData = null;

            //display content from articles
            function pumpOutTheContentData(data) {
                $('#content').html('');
                for(var i in data.items){
                    var item = data.items[i];
                    
                    //shorten the description to 200 characters. if a word is cut off
                    //shorten to the last whitespace in the string using Math.min
                    //where it returns the smallest number as the new max character length
                    var shortDescription = item.description.substring(0, 200); 
                    shortDescription = shortDescription.substr(0, Math.min (
                        shortDescription.length, shortDescription.lastIndexOf(' ')
                    ));

                    //using momentjs to reformat date string
                    //installed momentjs pacakge for meteor via command line:
                    //meteor add momentjs:moment
                    //see documentation at https://momentjs.com/docs/#/displaying/
                    var fancyDate = moment(item.pubDate).format('MMMM Do YYYY h:mm a');

                    var fancyImageOrChar;

                    if (item.enclosure.link != '' && item.enclosure.link != null) {
                        fancyImageOrChar = '<div class="thumbnailBox"><img src="' + item.enclosure.link + '"/></div>';
                    } else {
                        fancyImageOrChar = '<div class="thumbnailBox"><div id="fancyChar">' + item.title.charAt(0) + '</div></div>';
                    }

                    $('#content').append(`
                        <li>
                            <a href="` + item.link + `" target="_blank">
                                <span class="dateBox">` + fancyDate + `</span>
                                ` + fancyImageOrChar + `
                                <div class="titleBox">` + item.title + `</div>
                                <div class="descriptionBox">` + shortDescription + `... <strong>[read more]</strong></div>
                            </a>
                        </li>
                    `);
                }
            }

            //display overview
            function pumpOutTheOverviewData(data) {
                $('#report').html('');
                data.dates = [];
                var articleImageCount = 0;

                //title of source
                $('#title').html(data.feed.title);
                
                //find the earliest and latest dates
                //find number of articles with images
                for(var i in data.items){ 
                    var item = data.items[i];
                    if (item.pubDate != '' && item.pubDate != null) {
                        data.dates.push(item.pubDate);
                    }

                    if (item.enclosure.link != '' && item.enclosure.link != null) {
                        articleImageCount++;
                    } 
                }
                var earliestDate = data.dates[data.dates.length - 1];
                var latestDate = data.dates[0];

                //remove seconds from string with momentjs
                earliestDate = moment(earliestDate).format('YYYY-MM-DD hh:mm');
                latestDate = moment(latestDate).format('YYYY-MM-DD hh:mm');


                $('#report').append(`
                    <li><div class="fancyTitle">Number of articles</div><div class="fancyStats">` + data.items.length + `</div></li>
                    <li><div class="fancyTitle">Number of articles with images</div><div class="fancyStats">` + articleImageCount + `</div></li>
                    <li><div class="fancyTitle">Earliest published date</div><div class="fancyDates">` + earliestDate + `</div></li>
                    <li><div class="fancyTitle">Latest published date</div><div class="fancyDates">` + latestDate + `</div></li>
                `);
            }

            //ajax call
            function ajaxCall(data) {
                $.ajax({
                    url: 'https://api.rss2json.com/v1/api.json',
                    method: 'GET',
                    dataType: 'json',
                    data: {
                        rss_url: data,
                        api_key: 'dcyulzglkxpltzz1ndyv9niqjnlfxc6bdtq0gqbq',
                        count: 100
                    }
                }).done(function (response) {
                    if(response.status != 'ok') { 
                        throw response.message;
                    }

                    rssData = response;
                    console.log(rssData);

                    //sort by date in descending order (most recent) as default
                    rssData.items.sort(function(a, b){
                        return moment(b.pubDate) - moment(a.pubDate);
                    });

                    pumpOutTheContentData(rssData);
                    pumpOutTheOverviewData(rssData);
                    $('#result').show();
                    $('html, body').animate({
                        scrollTop: $('#result').offset().top
                    }, 750);
                });
            } 

            //load rss content from input box
            $('#input-form').submit(function (event){
                event.preventDefault();
                var target = event.target,
                    input = target.rssInput.value;
                ajaxCall(input);
            });

            //load rss content from preset
            $('.examples').click(function (){
                var selectedRSS = $(this).text();
                ajaxCall(selectedRSS);
            });

            //sorting in ascending order
            $('#sortByDateAsc').click(function(){
                rssData.items.sort(function(a, b){
                    return moment(a.pubDate) - moment(b.pubDate);
                });

                pumpOutTheContentData(rssData);
                $('#sortByDateAsc').hide();
                $('#sortByDateDesc').show();
            });

            $('#sortByTitleAsc').click(function(){
                rssData.items.sort(function (a, b){
                    if(a.title < b.title) return -1;
                    if(a.title > b.title) return 1;
                    return 0;
                });

                pumpOutTheContentData(rssData);
                $('#sortByTitleAsc').hide();
                $('#sortByTitleDesc').show();
            });

            $('#sortByDescriptionAsc').click(function(){
                rssData.items.sort(function (a, b){
                    if(a.description < b.description) return -1;
                    if(a.description > b.description) return 1;
                    return 0;
                });

                pumpOutTheContentData(rssData);
                $('#sortByDescriptionAsc').hide();
                $('#sortByDescriptionDesc').show();
            });

            //sorting in descending order
            $('#sortByDateDesc').click(function(){
                rssData.items.sort(function(a, b){
                    return moment(b.pubDate) - moment(a.pubDate);
                });

                pumpOutTheContentData(rssData);
                $('#sortByDateDesc').hide();
                $('#sortByDateAsc').show();
            });

            $('#sortByTitleDesc').click(function(){
                rssData.items.sort(function (a, b){
                    if(a.title < b.title) return 1;
                    if(a.title > b.title) return -1;
                    return 0;
                });

                pumpOutTheContentData(rssData);
                $('#sortByTitleDesc').hide();
                $('#sortByTitleAsc').show();
            });

            $('#sortByDescriptionDesc').click(function(){
                rssData.items.sort(function (a, b){
                    if(a.description < b.description) return 1;
                    if(a.description > b.description) return -1;
                    return 0;
                });

                pumpOutTheContentData(rssData);
                $('#sortByDescriptionDesc').hide();
                $('#sortByDescriptionAsc').show();
            });
        });
    });
}

// TODO:
// sort by date seems wonky on iphone
// ditch 3rd party rssfeed service and parse your own with jquery
// see here: https://stackoverflow.com/questions/226663/parse-rss-with-jquery