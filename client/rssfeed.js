if (Meteor.isClient) {
    
    Template.RssFeed.onRendered(function () {
        $(document).ready(function(){

            function pumpOutTheContentData(data) {
                for(var i in data.items){
                    var item = data.items[i];
                    var shortDescription = item.description.substring(0, 200); 

                    $('#content').append(`
                        <li>
                            <span class="dateBox">` + item.pubDate + `</span>
                            <img class="thumbnailBox" src="` + item.enclosure.link + `"/>
                            <div class="titleBox"><a href="` + item.link + `">` + item.title + `</a></div>
                            <div class="descriptionBox">` + shortDescription + `</div>
                        </li>
                    `);
                }
            }

            var rssData = null;

            $('#input-form').submit(function (event){
                event.preventDefault();

                var target = event.target,
                    input = target.rssInput.value;
    
                var articleImageCount = 0;

                $.ajax({
                    url: 'https://api.rss2json.com/v1/api.json',
                    method: 'GET',
                    dataType: 'json',
                    data: {
                        rss_url: input,
                        api_key: 'dcyulzglkxpltzz1ndyv9niqjnlfxc6bdtq0gqbq',
                        count: 60
                    }
                }).done(function (response) {
                    if(response.status != 'ok') { 
                        throw response.message;
                    }

                    rssData = response;
                    console.log(rssData);

                    $('#title').html(rssData.feed.title);

                    //append reset
                    $('#report').html('');
                    $('#content').html('');
                    rssData.dates = [];

                    pumpOutTheContentData(rssData);
                    
                    //find the earliest and latest dates
                    for(var i in rssData.items){ 
                        var item = rssData.items[i];
                        if (item.pubDate != '') {
                            rssData.dates.push(item.pubDate);
                        }
                    }
                    var earliestDate = rssData.dates[rssData.dates.length - 1];
                    var latestDate = rssData.dates[0];
    
                    $('#report').append(`
                        <li>Number of articles: ` + rssData.items.length + `</li>
                        <li>Number of articles with images: ` + articleImageCount + `</li>
                        <li>Earliest published date: ` + earliestDate + `</li>
                        <li>Latest published date: ` + latestDate + `</li>
                    `);
    
                    $('#overview').show();
                    $('#articles').show();
                });
            });

            $('#sortByDateAsc').click(function(){
                rssData.items.sort(function(a, b){
                    return Date.parse(a.pubDate) - Date.parse(b.pubDate);
                });
                $('#content').html('');
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
                $('#content').html('');
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
                $('#content').html('');
                pumpOutTheContentData(rssData);
                $('#sortByDescriptionAsc').hide();
                $('#sortByDescriptionDesc').show();
            });

            $('#sortByDateDesc').click(function(){
                rssData.items.sort(function(a, b){
                    return Date.parse(b.pubDate) - Date.parse(a.pubDate);
                });
                $('#content').html('');
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
                $('#content').html('');
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
                $('#content').html('');
                pumpOutTheContentData(rssData);
                $('#sortByDescriptionDesc').hide();
                $('#sortByDescriptionAsc').show();
            });
        });
    });
}

// TODO:
// Sort by date, title, description in ascending and descending order
// optimize for mobile
// optimize design
// add first letter of title into the thumbnail box for articles without images
// fix date format in cards
// ditch 3rd party rssfeed service and parse your own with jquery