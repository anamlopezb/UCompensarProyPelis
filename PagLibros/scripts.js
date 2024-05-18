// Supongamos que tenemos un array de libros
const books = [
  // Aquí definimos objetos que representan libros, cada objeto tiene propiedades como id, título, autor, etc.
  // Cada objeto representa un libro diferente en la colección.
  {
    id: 1,
    title: "El Señor de los Anillos",
    author: "J.R.R. Tolkien",
    genre: "Fantasía",
    year: 1954,
    synopsis: "La Comunidad del Anillo es el primer volumen de la novela El Señor de los Anillos, escrita por J. R. R. Tolkien.",
    rating: 4.5,
    image: "https://pics.filmaffinity.com/El_seanor_de_los_anillos_La_comunidad_del_anillo-952398002-large.jpg"
  },
  {
    id: 2,
    title: "Cien años de soledad",
    author: "Gabriel García Márquez",
    genre: "Realismo mágico",
    year: 1967,
    synopsis: "Cien años de soledad es una novela del escritor colombiano Gabriel García Márquez, ganador del Premio Nobel de Literatura en 1982.",
    rating: 4.8,
    image: "https://fce.com.co/wp-content/uploads/2021/03/820170173-1.jpg"
  },
  {
    id: 3,
    title: "1984",
    author: "George Orwell",
    genre: "Ciencia ficción",
    year: 1949,
    synopsis: "1984 es una novela política de ficción distópica, escrita por George Orwell y publicada en 1949.",
    rating: 4.7,
    image: "https://images.cdn2.buscalibre.com/fit-in/360x360/85/64/8564963be6e21ee55d0bd7b532c3a9bb.jpg"
  },
  {
    id: 4,
    title: "Orgullo y prejuicio",
    author: "Jane Austen",
    genre: "Romance",
    year: 1813,
    synopsis: "Orgullo y prejuicio es una novela escrita por Jane Austen y publicada por primera vez en 1813.",
    rating: 4.6,
    image: "https://images.justwatch.com/poster/203481059/s718/orgullo-y-prejuicio.jpg"
  },
  {
    id: 5,
    title: "Matar a un ruiseñor",
    author: "Harper Lee",
    genre: "Ficción clásica",
    year: 1960,
    synopsis: "Matar a un ruiseñor es una novela escrita por Harper Lee y publicada en 1960.",
    rating: 4.9,
    image: "https://images.cdn3.buscalibre.com/fit-in/360x360/da/72/da72fbd1dc886ff64eb46a854c7e5811.jpg"
  },
  {
    id: 6,
    title: "El Hobbit",
    author: "J.R.R. Tolkien",
    genre: "Fantasía",
    year: 1937,
    synopsis: "El Hobbit es una novela de fantasía del escritor británico J. R. R. Tolkien.",
    rating: 4.8,
    image: "https://images.cdn1.buscalibre.com/fit-in/360x360/45/44/4544aa9e50feca33c58b1d4646f34b2f.jpg"
  }
];

// Función para mostrar los libros en la página
function displayBooks(booksToShow) {
  // Obtener el elemento de la lista de libros del DOM
  const bookList = document.getElementById("bookList");
  // Limpiar el contenido previo de la lista
  bookList.innerHTML = "";

  // Verificar si no hay libros para mostrar
  if (booksToShow.length === 0) {
    // Si no hay libros, mostrar un mensaje en la lista
    bookList.innerHTML = "<p>No se encontraron resultados.</p>";
  } else {
    // Iterar sobre cada libro para crear un elemento de tarjeta y agregarlo a la lista
    booksToShow.forEach(book => {
      const bookCard = `
        <div class="col-md-4 mb-4">
          <div class="card">
            <img src="${book.image}" class="card-img-top" alt="${book.title}">
            <div class="card-body">
              <h5 class="card-title">${book.title}</h5>
              <h6 class="card-subtitle mb-2 text-muted">${book.author}</h6>
              <p class="card-text">${book.synopsis}</p>
              <p class="card-text">Año: ${book.year}</p>
              <p class="card-text">Género: ${book.genre}</p>
              <p class="card-text">Puntuación: ${book.rating}</p>
              <button class="btn btn-primary details-btn" data-toggle="modal" data-target="#bookModal">Detalles</button>
            </div>
          </div>
        </div>
      `;
      // Agregar la tarjeta del libro al contenido de la lista
      bookList.innerHTML += bookCard;
    });
  }

// Agregar event listeners a los botones de detalles
const detailsButtons = document.querySelectorAll(".details-btn");
detailsButtons.forEach((button, index) => {
  // Para cada botón, agregar un event listener que muestra un modal con los detalles del libro correspondiente
  button.addEventListener("click", () => {
    const selectedBook = books[index];
    const modalBody = `
      <img src="${selectedBook.image}" class="img-fluid mb-3" alt="${selectedBook.title}">
      <p><strong>Título:</strong> ${selectedBook.title}</p>
      <p><strong>Autor:</strong> ${selectedBook.author}</p>
      <p><strong>Género:</strong> ${selectedBook.genre}</p>
      <p><strong>Año:</strong> ${selectedBook.year}</p>
      <p><strong>Puntuación:</strong> ${selectedBook.rating}</p>
      <p><strong>Sinopsis:</strong> ${selectedBook.synopsis}</p>
    `;
    // Obtener el cuerpo del modal y mostrar los detalles del libro seleccionado
    const modalBodyElement = document.getElementById("bookModalBody");
    modalBodyElement.innerHTML = modalBody;
    // Mostrar el modal
    const bookModal = new bootstrap.Modal(document.getElementById('bookModal'));
    bookModal.show();
  });
});
    
}

// Función para buscar libros
function searchBooks(query) {
  // Limpiar y convertir el término de búsqueda en minúsculas para facilitar la comparación
  const searchTerm = query.trim().toLowerCase();
  
  // Filtrar los libros que coincidan con el término de búsqueda
  const filteredBooks = books.filter(book => {
    return (
      book.title.toLowerCase().includes(searchTerm) ||
      book.author.toLowerCase().includes(searchTerm) ||
      String(book.year).includes(searchTerm)
    );
  });
  
  // Mostrar los libros filtrados
  displayBooks(filteredBooks);
}

// Función para inicializar la página
document.addEventListener("DOMContentLoaded", () => {
  // Mostrar todos los libros al cargar la página
  displayBooks(books);
});

// Agregar un event listener al campo de búsqueda
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", () => {
  // Llamar a la función de búsqueda cada vez que se ingresa texto en el campo de búsqueda
  searchBooks(searchInput.value);
});
