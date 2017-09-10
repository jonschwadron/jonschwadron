if (Meteor.isClient) {
    
    Template.RssFeed.onRendered(function () {
        $(document).ready(function(){

            function pumpOutTheContentData(data) {
                for(var i in data.items){
                    var item = data.items[i];
                    var shortDescription = item.description.substring(0, 200); 

                    $('#content').append(`
                        <li>
                            <div class="dateBox">` + item.pubDate + `</div>
                            <img class="thumbnailBox" src=` + item.thumbnail + `/>
                            <div class="titleBox"><a href=` + item.link + `>` + item.title + `</a></div>
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
                        count: 100
                    }
                }).done(function (response) {
                    if(response.status != 'ok') { 
                        throw response.message;
                    }

                    rssData = response;

                    $('#title').html(rssData.feed.title);

                    //append reset
                    $('#report').html('');
                    $('#content').html('');
                    rssData.dates = [];

                    pumpOutTheContentData(rssData);
                    
                    for(var i in rssData.items){ 
                        var item = rssData.items[i];
                        rssData.dates.push(item.pubDate);
                    }
                    var earliestDate = rssData.dates[rssData.dates.length - 1];
                    var latestDate = rssData.dates[0];
    
                    $('#report').append(`
                        <li>Number of articles: ` + rssData.items.length + `</li>
                        <li>Number of articles with images: ` + articleImageCount + `</li>
                        <li>Earliest published date: ` + earliestDate + `</li>
                        <li>Latest published date: ` + latestDate + `</li>
                    `);
    
                    console.log(rssData);

                    $('#overview').show();
                    $('#articles').show();
                });
            });

            

            //TODO
            $('#sortByDate').click(function(){
                rssData.items.sort(function(a, b){
                    return Date.parse(a.pubDate) - Date.parse(b.pubDate);
                });
                $('#content').html('');
                pumpOutTheContentData(rssData);
            });

            $('#sortByTitle').click(function(){
                rssData.items.sort(function (a, b){
                    if(a.title < b.title) return -1;
                    if(a.title > b.title) return 1;
                    return 0;
                });
                $('#content').html('');
                pumpOutTheContentData(rssData);
            });

            $('#sortByDescription').click(function(){
                rssData.items.sort(function (a, b){
                    if(a.description < b.description) return -1;
                    if(a.description > b.description) return 1;
                    return 0;
                });
                $('#content').html('');
                pumpOutTheContentData(rssData);
            });
        });
    });
}