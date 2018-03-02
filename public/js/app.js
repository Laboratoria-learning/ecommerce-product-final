$(document).ready(function() {
  $.ajax({
    url: 'https://examen-laboratoria-sprint-5.herokuapp.com/topics',
    method: 'GET',
    contentType: 'application/json',
    crossOrigin: true,
    success: function(response) {
      console.log(response);
      $.each(response, function(i, data) {
        let output = `<div class="row post"><div class="col s6 l6"><a href="verTopic.html?topic_id=${data.id}">${data.content}</a></div><div class="col s3 l3"><span>Por: </span><strong>${data.author_name}</strong></div><div class="col s3 l3"><a class="waves-effect waves-light btn indigo lighten-5 black-text text-black">${data.responses_count}<span> Respuestas </span> </a></div></div>`;
        $('.foro').append(output); 
      });
    },
    fail: function(request) { }
  });
});