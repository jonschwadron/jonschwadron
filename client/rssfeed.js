if (Meteor.isClient) {
    
    Template.RssFeed.onRendered(function () {
        $(document).ready(function(){
            $('body').css({"background-color": "#98dafc"});


            var rssData = {
                items: [],
                dates: []
            }

            $('#input-form').submit(function (event){
                event.preventDefault();

                const target = event.target;
                const input = target.rssInput.value;
    
                var articleCount = 0,
                    articleImageCount = 0;

                $.ajax({
                    url: 'https://api.rss2json.com/v1/api.json',
                    method: 'GET',
                    dataType: 'json',
                    data: {
                        rss_url: input,
                        api_key: 'dcyulzglkxpltzz1ndyv9niqjnlfxc6bdtq0gqbq'
                    }
                }).done(function (response) {
                    if(response.status != 'ok') { 
                        throw response.message;
                    }

                    $('#title').html(response.feed.title);

                    rssData.items = response.items;
    
                    //append reset
                    $('#report').html('');
                    $('#content').html('');
                    rssData.dates = [];
                    
                    for(var i in rssData.items){
                        var item = rssData.items[i];
                        articleCount++;
                        rssData.dates.push(item.pubDate);
    
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
    
                    rssData.dates.sort(function(a, b){
                        return Date.parse(a) - Date.parse(b);
                    });
    
                    var latestDate = rssData.dates[rssData.dates.length - 1];
                    var earliestDate = rssData.dates[0];
    
                    $('#report').append(`
                        <li>Number of articles: ` + articleCount + `</li>
                        <li>Number of articles with images: ` + articleImageCount + `</li>
                        <li>Earliest published date: ` + earliestDate + `</li>
                        <li>Latest published date: ` + latestDate + `</li>
                    `);
    
                    console.log(rssData);
                    console.log('article count: ' + articleCount); 
                    console.log(rssData.dates);

                    $('#overview').show();
                    $('#articles').show();
                });
            });

            //TODO
            $('#sortByDate').click(function(){
                
            });

            $('#sortByTitle').click(function(){
                
            });

            $('#sortByDescription').click(function(){
                
            });
        });
    });
}