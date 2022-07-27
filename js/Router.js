class Router{
    constructor(app){
        this.app = app;
        this.routes = [];
        this.haschange = this.haschange.bind(this);
        window.addEventListener('hashchange',this.haschange)
        window.addEventListener('DomContentLoaded',this.haschange)
    }
    addRoute(name,path){
        this.routes.push({
            name,
            path
        });
    }

    haschange(){
        const {hash} = window.location;
        const route = this.routes.find(route =>{
            return hash.match( new RegExp(route.path) );
        });
        if(route){
            const params = new RegExp(route.path).exec(hash);
            this.params= params;
            this.app.showComponent(route.name);
        }        
    }
}
export default Router;