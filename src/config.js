function env(env) {
    switch (env) {
        case 'api-netcore':
            return 'http://localhost:61756/api';
        case 'front-admi':
            return 'http://localhost:4200';
    }
}

try{
    module.exports ={
        api: env('api-netcore'),
    }
}catch(e){
    console.log(e);
}