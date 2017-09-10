if (Meteor.isClient) {
    Template.RssFeed.onRendered(function () {
        $(document).ready(function(){

            var rssData = null;

            //display content from articles
            function pumpOutTheContentData(data) {
                $('#content').html('');
                for(var i in data.items){
                    var item = data.items[i];
                    var shortDescription = item.description.substring(0, 200); 

                    //using momentjs to reformat date string
                    //installed momentjs pacakge for meteor via command line:
                    //meteor add momentjs:moment
                    //see documentation at https://momentjs.com/docs/#/displaying/
                    var fancyDate = moment(item.pubDate).format('MMMM Do YYYY h:mm a');

                    $('#content').append(`
                        <li>
                            <span class="dateBox">` + fancyDate + `</span>
                            <div class="thumbnailBox"><img src="` + item.enclosure.link + `"/></div>
                            <div class="titleBox"><a href="` + item.link + `">` + item.title + `</a></div>
                            <div class="descriptionBox">` + shortDescription + `</div>
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
                earliestDate = moment().format('YYYY-MM-DD hh:mm');
                latestDate = moment().format('YYYY-MM-DD hh:mm');


                $('#report').append(`
                    <li>Number of articles: ` + data.items.length + `</li>
                    <li>Number of articles with images: ` + articleImageCount + `</li>
                    <li>Earliest published date: ` + earliestDate + `</li>
                    <li>Latest published date: ` + latestDate + `</li>
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

                    //force sort starting with latest article
                    rssData.items.sort(function(a, b){
                        return Date.parse(b.pubDate) - Date.parse(a.pubDate);
                    });

                    pumpOutTheContentData(rssData);
                    pumpOutTheOverviewData(rssData);
                    $('#result').show();
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
                    return Date.parse(a.pubDate) - Date.parse(b.pubDate);
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
                    return Date.parse(b.pubDate) - Date.parse(a.pubDate);
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
// optimize for mobile
// add first letter of title into the thumbnail box for articles without images
// ditch 3rd party rssfeed service and parse your own with jquery