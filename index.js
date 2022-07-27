import App from './js/App.js';
import Router from './js/Router.js';
import Api from './js/Api.js';

const app = new App('#app');
const router = new Router(app);
// template dogs
const dogTempleate = (dog)=>`
<div class="dog__listing">
    <a href="#/dogs/${dog.id}">
        <h3 class="name">${dog.name}</h3>
        <div>
            <figure>
                <img src="${dog.url}" alt="${dog.name}">
            </figure>
            <p>${dog.description}</p>
        </div>
    </a>
</div>
`;

app.addComponent({
    name: 'home',
    model: {
        data: ''
    },
    view(model){
        return `
            <div>
                <h1>Home</h1>
                <p>${model.data}</p>
            </div>
        `;
    },
    controller(model){
        model.data = 'data home!';
    }
});

//component dog
app.addComponent({
    name: 'dogs',
    model: {
        dogs: []
    },
    view(model){
        return `
            <section class="container__dogs">
                ${model.dogs.map(dog=>`<li>${dogTempleate(dog)}</li>`).join('')}
            </section>
        `;
    },
    async controller(model){
        const dataDogs = await Api.getDogs();
        console.log(dataDogs);
        model.dogs = dataDogs;
    }
});

//component dog
app.addComponent({
    name: 'dog',
    model: {
        dog: {}
    },
    view(model){
        return dogTempleate(model.dog);
    },
    async controller(model){
        const dataDog = await Api.getDog(router.params[1]);
        console.log(dataDog);
        model.dog = dataDog;
    }
});





router.addRoute('home','^#/home$');
router.addRoute('dogs','^#/dogs$');
router.addRoute('dog','^#/dogs/([0-9]+)$');