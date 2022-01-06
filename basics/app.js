const app = Vue.createApp({
  data() {
    return {
      url: 'https://thenetninja.co.uk',
      title: 'I am another template',
      author: 'Peter Griffin',
      age: 45,
      showBook: true,
      x: 0,
      y: 0,
      books: [
        {
          title: 'name of the wind',
          author: 'patrick rothfuss',
          img: 'assets/1.jpg',
          isFav: true,
        },
        {
          title: 'the way of the kings',
          author: 'brandon sanderson',
          img: 'assets/2.jpg',
          isFav: false,
        },
        {
          title: 'the final empire',
          author: 'patrick rothfuss',
          img: 'assets/3.jpg',
          isFav: true,
        }
      ]
    };
  },

  methods: {
    changeTitle(title) {
      this.title = title;
    },
    toggleBook() {
      this.showBook = !this.showBook;
    },
    handleEvent(e, value) {
      console.log(e.type, value);
    },
    handleMouseMove(e) {
      this.x = e.offsetX;
      this.y = e.offsetY;
    },
    toggleFav(book) {
      book.isFav = !book.isFav;
    }
  },

  computed: {
    filteredBooks() {
      return this.books.filter((b) => b.isFav);
    }
  }
});

app.mount('#app');