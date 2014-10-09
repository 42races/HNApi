(function(){
    'use strict';
    console.log("ok");
    var HNApi = {    
        topStories: function (callback) {
            $.ajax({
                url: "https://hacker-news.firebaseio.com/v0/topstories.json",
                dataType: "jsonp",
                success: function (data) {
                    callback(data);
                }
            });
        },
        
        loadTopic: function(id, callback) {
            $.ajax({
                url: "https://hacker-news.firebaseio.com/v0/item/" + id + ".json",
                dataType: "jsonp",
                success: function(data) {
                    console.log(data);
                    callback(data);
                }
            });
        }
    };
}());

$(document).ready(function () {
//    'use strict';
//    
//    var Api = {
//        topStories: function (callback) {
//            $.ajax({
//                url: "https://hacker-news.firebaseio.com/v0/topstories.json",
//                dataType: "jsonp",
//                success: function (data) {
//                    callback(data);
//                }
//            });
//        },
//        
//        loadTopic: function(id, callback) {
//            $.ajax({
//                url: "https://hacker-news.firebaseio.com/v0/item/" + id + ".json",
//                dataType: "jsonp",
//                success: function(data) {
//                    console.log(data);
//                    callback(data);
//                }
//            });
//        }
//    };
//    
    function main() {
        console.log("loading top stories");
        var display_top_stories = function(data) {
            var display_item = function(data) {
                var t = new EJS({text: $("#topic-list").html()})
                $("ol").append(t.render({data: data})); 
            };
            
            $.each(data, function(index, post_id) {
                HNApi.loadTopic(post_id, display_item);
            });
        };
        
        HNApi.topStories(display_top_stories);
    };
    
    main();
});