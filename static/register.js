// Generated by CoffeeScript 1.4.0
(function() {
  var $email, $emailInfo, $password, $passwordInfo, $username, $usernameInfo, lolfunc, taken, timer;

  $email = $('#email');

  $username = $('#username');

  $password = $('#password');

  $emailInfo = $('<div/>').insertAfter($email).addClass('faded pad-bottom invis');

  $usernameInfo = $('<div/>').insertAfter($username).addClass('faded pad-bottom invis');

  $passwordInfo = $('<div/>').insertAfter($password).addClass('faded pad-bottom invis').text('Your password is encrypted. For example, (abc123 shows up as ny203cyaca2 in our database.)');

  $email.blur(function() {
    var e;
    $emailInfo.show();
    e = $email.val();
    if (!e) {
      return $emailInfo.text('Please enter an email!');
    } else {
      return $.get('/reg-checkemail', {
        e: e
      }, function(data) {
        if (data === 'taken') {
          return $emailInfo.text('Sorry, that email is taken.');
        } else {
          return $emailInfo.text('That email is available!');
        }
      });
    }
  });

  timer = null;

  taken = false;

  lolfunc = function() {
    var u;
    $usernameInfo.show();
    u = $username.val();
    if (!taken) {
      $usernameInfo.html('Your URL: <span class="link">http://mypinnings.com/' + u);
    }
    if (timer !== null) {
      clearInterval(timer);
      timer = null;
    }
    if (u) {
      return timer = setInterval((function() {
        return $.get('/reg-checkuser', {
          u: u
        }, function(data) {
          if (data === 'taken') {
            $usernameInfo.text('Sorry, that username is taken.');
            return taken = true;
          } else {
            taken = false;
            return $usernameInfo.html('Your URL: <span class="link">http://mypinnings.com/' + u);
          }
        });
      }), 500);
    }
  };

  $username.on('input', lolfunc);

  $username.blur(lolfunc);

}).call(this);