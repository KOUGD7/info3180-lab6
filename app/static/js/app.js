/* Add your Application JavaScript */
const app = Vue.createApp({
  data() {
    return {
      welcome: 'Hello World! Welcome to VueJS'
    }
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
                  <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">News</a>
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
})

app.component('news-list', {
  name: 'NewsList',
  template: `
    <div class="news">
      <h2>News</h2>

      <ul class="news__list d-flex flex-row flex-wrap">

      <div v-for="article in articles" class = "card" style="width: 17rem; margin: 5px;">
        <div class="card-body">
            <h5 class="ml-2 mb-0 pb-0 card-title"> {{ article.title }} </h5>
            <img :src = article.urlToImage class="card-img-top" alt="news image"/>

            <div class="mb-3 mt-1 d-flex flex-row flex-wrap">
                <p class="card-text"> {{ article.description }} </p>
            </div>

        </div>
        <div class = "btn bg-info card-footer text-center"></div>
      </div>
      </ul>
    </div>
  `,

  created() {
    let self = this;
    fetch('https://newsapi.org/v2/top-headlines?country=us',
  {
    headers: {
      'Authorization': 'Bearer <your token>'
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
      articles: []
    }
  }
})

app.mount('#app');