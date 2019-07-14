function env(env) {
    switch (env) {
        case 'api-netcore':
            return 'http://localhost:61756/api';
        case 'front-admi':
            return 'http://constructoramejiapolanco.azurewebsites.net/login';
    }
}

try{
    module.exports ={
        api: env('api-netcore'),
        admin: env('front-admi'),
    }
}catch(e){
    console.log(e);
}