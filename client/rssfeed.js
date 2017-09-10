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

                    $('#content').append(`
                        <li>
                            <span class="dateBox">` + item.pubDate + `</span>
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
                        count: 60
                    }
                }).done(function (response) {
                    if(response.status != 'ok') { 
                        throw response.message;
                    }

                    rssData = response;
                    console.log(rssData);

                    pumpOutTheContentData(rssData);
                    pumpOutTheOverviewData(rssData);
                    $('#articles').show();
                    $('#overview').show();
                });
            } 

            //load contents from rss link
            $('#input-form').submit(function (event){
                event.preventDefault();
                var target = event.target,
                    input = target.rssInput.value;
                ajaxCall(input);
            });

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
// optimize design
// add first letter of title into the thumbnail box for articles without images
// fix date format in cards
// ditch 3rd party rssfeed service and parse your own with jquery