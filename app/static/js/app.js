/* Add your Application JavaScript */

const Home = {
  name: 'Home',
  template: `
    <div class="home">
      <img src="/static/images/logo.png" alt="VueJS Logo">
      <h1>{{ welcome }}</h1>
    </div>
  `,
  data() {
    return {
      welcome: 'Hello World! Welcome to VueJS'
    }
  }
}

const NewsList = {
  name: 'NewsList',
  template: `
    <div class="news d-flex flex-column align-items-center">
      <h2>News</h2>

      <div class="form-inline d-flex justify-content-center">
        <div class="form-group mx-sm-3 mb-2">
          <label class="sr-only" for="search">Search</label>
          <input type="search" name="search" v-model="searchTerm"
          id="search" class="form-control mb-2 mr-sm-2" placeholder="Enter search term here" />
          <button class="btn btn-primary mb-2"
          @click="searchNews">Search</button>
          <!-- <p>You are searching for {{ searchTerm }}</p> -->
        </div>
      </div>

      <ul class="news__list d-flex flex-row flex-wrap">

      <div v-for="article in articles" class = "card mr-2 mb-4" style="width: 17rem;">
      <div class = "bg-info card-header text-center"></div>
        <div class="card-body">
            <h5 class="ml-2 mb-0 pb-0 card-title"> {{ article.title }} </h5>
            <img :src = article.urlToImage class="card-img-top" alt="news image"/>

            <div class="mb-3 mt-1 d-flex flex-row flex-wrap">
                <p class="card-text"> {{ article.description }} </p>
            </div>

        </div>
        <!-- <div class = "bg-info card-footer text-center"></div> -->
      </div>
      </ul>
    </div>
  `,
  created() {
    let self = this;
    fetch('https://newsapi.org/v2/top-headlines?country=us',
  {
    headers: {
      'Authorization': 'Bearer <your-api-token>'
    }
  })
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data);
      self.articles = data.articles;
    });
  },
  data() {
    return {
      articles: [],
      searchTerm: ''
    }
  },
  methods: {
    searchNews() {
      let self = this;
      fetch('https://newsapi.org/v2/everything?q='+ self.searchTerm + '&language=en', {
      headers: {
        'Authorization': 'Bearer <your-api-token>'
    }
   })
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data);
      self.articles = data.articles;
    });
    }
  }
}

const app = Vue.createApp({
  data() {
    return {
      welcome: 'Hello World! Welcome to VueJS'
    }
  },
  components: {
    'home': Home,
    'news-list': NewsList
    }
});

app.component('app-header', {
  name: 'AppHeader',
  template: `
      <header>
          <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
            <a class="navbar-brand" href="#">VueJS App</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                  <!-- <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a> -->
                  <router-link to="/" class="nav-link">Home</router-link>
                </li>
                <li class="nav-item">
                  <!--<a class="nav-link" href="#">News</a> -->
                  <router-link to="/news" class="nav-link">News</router-link>
                </li>
              </ul>
            </div>
          </nav>
      </header>    
  `,
  data: function() {
    return {};
  }
});

app.component('app-footer', {
  name: 'AppFooter',
  template: `
      <footer>
          <div class="container">
              <p>Copyright &copy {{ year }} Flask Inc.</p>
          </div>
      </footer>
  `,
  data: function() {
      return {
          year: (new Date).getFullYear()
      }
  }
});

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes: [
  { path: '/', component: Home },
  { path: '/news', component: NewsList }
  ]
 });

app.use(router);
app.mount('#app');