// var sendRequest = function(url, data) {
//   $.ajax({
//       type: "POST",
//       url: "/app/usersearch",
//       data: JSON.stringify([{name: "login", value: "' UNION SELECT name,password from users where login='test"}]),
//       success: function(data){
//         console.log(data)
//       },
//       error: function(data){
//         console.log('error');
//       },
//       dataType: "json",
//       contentType : "application/json"
//   }),
// }

$('#runTest').on('click', function() {
  var self = this;
  $(this).addClass('disabled');
  $.when(
      $.ajax({
          type: "POST",
          url: "/app/usersearch",
          data: JSON.stringify([{name: "login", value: "' UNION SELECT name,password from users where login='test"}]),
          success: function(data){
            console.log(data)
          },
          error: function(data){
            console.log('error');
          },
          dataType: "json",
          contentType : "application/json"
      }),
      $.ajax({
          type: "POST",
          url: "/app/usersearch",
          data: JSON.stringify([{name: "login", value: "test"}]),
          success: function(data){
            console.log(data)
          },
          error: function(data){
            console.log('error');
          },
          dataType: "json",
          contentType : "application/json"
      }),
      $.ajax({
          type: "POST",
          url: "/app/usersearch",
          data: JSON.stringify([{name: "login", value: "'"}]),
          success: function(data){
            console.log(data)
          },
          error: function(data){
            console.log('error');
          },
          dataType: "json",
          contentType : "application/json"
      }),
  ).then( function(){
      alert('all complete');
      $(self).removeClass('disabled');
  });
});
