//extract params from the URL querystring
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

//returns timestamp in a human readable format
function formatDate(dt_create){
    var elemDate = new Date(dt_create);
    return elemDate.toDateString() +' '+ elemDate.toLocaleTimeString();    
}

//returns the hostname only for a given URL
function getHostname(url){    
    var parser = document.createElement('a');
    parser.href = url;
    return parser.hostname;    
} 
  
function getSortedPostList(sort){
    
    $.ajax('/api/cobject/v0/post/?sort='+sort)
        .success(function(response,status){ 
            var count = 1;
            response.data.forEach(function(elem){                        
                var tElem = '<tr><td align="right" valign="top" class="title">' + count + '.</td><td><center><a href="#" class="voteelem" data-postid="' + elem.id + '"><div class="votearrow" title="upvote"></div></a><span id="down_'+ elem.id +'"></span></center></td><td class="title"><a href="' + elem.url + '">' + elem.title + '</a><span class="comhead">('+ getHostname(elem.url) + ')</span></td></tr><tr><td colspan="2"></td><td class="subtext buffer-inserted"><span id="score_'+ elem.id +'" data-score="' + elem.actions.votes.total + '">' + elem.actions.votes.total + ' points</span> ' + formatDate(elem.dt_create) + '  |<a href="item?id=' + elem._id + '">'+ elem.actions.comments.length +' comments</a>|</td></tr><tr style="height:5px"></tr>'            
                $('#newstable').append(tElem)    
                count++;
            })
        })
}


$( document ).ready(function() {
    if(window.location.href.indexOf("item") > -1) {
        
        var postId = getParameterByName("id")     
          $.ajax('/api/cobject/v0/post/'+postId)
            .success(function(elem,status){ 
                
                var tElem = '<tr><td><center><a href="#" class="voteelem" data-postid="' + elem.id +'"><div class="votearrow" title="upvote"></div></a><span id="down_7904658"></span></center></td><td class="title"><a href="' + elem.url +'" target="_blank">' + elem.title + '</a><span class="comhead"> ('+ getHostname(elem.url) + ')</span></td></tr><tr><td colspan="1"></td><td class="subtext buffer-inserted"><span>' + elem.actions.votes.total +' points</span> ' + formatDate(elem.dt_create) + ' </td></tr><tr style="height:10px"></tr><tr><td></td><td><form id="submitcomment" data-postid="' + elem.id +'" method="post" action="comment"><textarea name="text" rows="6" cols="60"></textarea><br><br><input type="submit" value="add comment"></form></td></tr>'
                $('#postcontent').append(tElem)   
                
                elem.actions.comments.forEach(function(comment){
                    var comment = '<tr><td><table border="0"><tbody><tr><td><img src="s.gif" height="1" width="0"></td><td valign="top"><center><a href="#"><div class="votearrow" title="upvote"></div></a><span id="down_7904745"></span></center></td><td class="default"><div style="margin-top:2px; margin-bottom:-10px; "><span class="comhead"><a href="#">' + comment.displayName + '</a> ' + formatDate(comment.dt_create) + '</span>    </div><br><span class="comment"><font color="#000000">' + comment.text + '</font></span></td></tr></tbody></table></td></tr>'
                    $('#postcomments').append(comment)    
                })
            })
     } 
     
     else if(window.location.href.indexOf("newest") > -1) {
        getSortedPostList('-dt_create') 
     } 
     
     else if (window.location.href.indexOf("search") > -1) {
        
        var title = getParameterByName("title")     
        $.ajax('/api/cobject/v0/post/?sort=-dt_create&title='+title)
        .success(function(response,status){ 
            var count = 1;
            response.data.forEach(function(elem){                        
                var tElem = '<tr><td align="right" valign="top" class="title">' + count + '.</td><td><center><a href="#" class="voteelem" data-postid="' + elem.id + '"><div class="votearrow" title="upvote"></div></a><span id="down_'+ elem.id +'"></span></center></td><td class="title"><a href="' + elem.url + '">' + elem.title + '</a><span class="comhead">('+ getHostname(elem.url) + ')</span></td></tr><tr><td colspan="2"></td><td class="subtext buffer-inserted"><span id="score_'+ elem.id +'" data-score="' + elem.actions.votes.total + '">' + elem.actions.votes.total + ' points</span> ' + formatDate(elem.dt_create) + '  |<a href="item?id=' + elem._id + '">'+ elem.actions.comments.length +' comments</a>|</td></tr><tr style="height:5px"></tr>'            
                $('#newstable').append(tElem)    
                count++;
            })
        })
     }
     
     else {
        getSortedPostList('-actions.votes.total')
     }
});


$( "#sendnews" ).submit(function( event ) {  
  event.preventDefault();
  
  var data = {};
  data.title = $("input[name='title']").val();
  data.url = $("input[name='url']").val();
  data.description = $("input[name='description']").val();
  
   $.post("/api/cobject/v0/post/", data,  function(response) {    
        window.location.href = "/index";
    });
});


$( "#contactform" ).submit(function( event ) {  
  event.preventDefault();
  
  var data = {};
  data.userId = $("#contactform input[name='userId']").val();
  data.email = $("#contactform input[name='email']").val();
  data.message = $("#contactform textarea[name='message']").val();
  
   $.post("/api/form/v0/forms/contact/entries", data,  function(response) {    
        window.location.href = "/index";
    });
});


$('body').on('click', 'a.voteelem', function(e) {
    e.preventDefault();    
    var postid = $(this).data('postid')

    $.ajax({
      url:'/api/cobject/v0/post/' + postid + '/vote',
      method: 'PUT'
    }).success(function(resp,err){

      var score = $("#score_"+postid).data('score'); 
      score++;
      $("#score_"+postid).html( score + ' points' );
      
    })  
});

$('body').on('submit', '#submitcomment', function( e ) {  
    e.preventDefault();        
    var postid = $(this).data('postid')
    var data = {text : $("textarea[name='text']").val()};
        
    $.ajax({
       url: "/api/cobject/v0/post/"+postid+"/comment",
       type: "PUT",
       data: data,
       dataType: "json",
       success: function(response) {
         document.location.reload(true);
       }
    });        
});






