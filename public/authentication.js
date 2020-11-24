function init(){
    $(document).ready(function(){
        $('#register').click(function(){
            var name = $('#username').val();
            var pass = $('#password').val();
            var user = {username:name, password:pass};
            console.log('Register; ' + name + ';' + pass);
            $.post('/api/register', user, function(result){
                console.log('registered  successfully');
                console.log(result.username);
            });
        });

        $('#login').click(function(){
            var name = $('#username').val();
            var pass = $('#password').val();
            var user = {username:name, password:pass};
            console.log('Login; ' + name + ';' + pass);
            $.post('/api/login', user, function(result){
                console.log('logged in successfully');
                console.log(result.username);
            });
        });
        });
}