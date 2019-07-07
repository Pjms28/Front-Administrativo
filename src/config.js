function env(env) {
    switch (env) {
        case 'api-netcore':
            return 'https://api-constructoramp.azurewebsites.net/api';
        case 'front-admi':
            return 'http://localhost:4200';
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