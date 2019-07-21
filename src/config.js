function env(env) {
    switch (env) {
        case 'api-netcore':
            return 'https://api-constructoramp.azurewebsites.net/api';
        case 'front-admi':
            return 'https://admin-constructoramejiapolanco.azurewebsites.net/';
        case 'client-app':
            return 'https://constructoramejiapolanco.com/';
        case 'chat-app':
            return 'https://www.jivochat.es/router/?url=https://app.jivosite.com/chat/inbox%23email=brick.developers@gmail.com%26lang=es&utm_source=automatic_emails&utm_medium=mail&utm_content=es&utm_campaign=operators_'
    }
}

try{
    module.exports ={
        api: env('api-netcore'),
        admin: env('front-admi'),
        client: env('client-app'),
        chat: env('chat-app'),
    }
}catch(e){
    console.log(e);
}