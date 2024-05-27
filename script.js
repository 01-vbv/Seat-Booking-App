//Create you project here from scratch
const moviesList = [
  { movieName: "Flash", price: 7 },
  { movieName: "Spiderman", price: 5 },
  { movieName: "Batman", price: 4 },
];
// Use moviesList array for displaing the Name in the dropdown menu
function addMovie(moviesList) {
  const selectMovie = document.querySelector("#selectMovie");
  for (let i = 0; i < moviesList.length; i++) {
    const movie = document.createElement("option");
    movie.setAttribute("value", moviesList[i].movieName.toLowerCase());
    movie.textContent = `${moviesList[i].movieName} $${moviesList[i].price}`;
    selectMovie.append(movie);
  }

  selectMovie.addEventListener("change", () => {
    const movieName = document.querySelector("#movieName");
    const moviePrice = document.querySelector("#moviePrice");
    const index = selectMovie.selectedIndex;
    movieName.textContent = moviesList[index].movieName;
    moviePrice.textContent = `$ ${moviesList[index].price}`;
    reset();
  });
}

addMovie(moviesList);

//Add eventLister to each unoccupied seat

function unoccupiedSeatEvent() {
  const seats = document.querySelectorAll("#seatCont .seat");
  for (let i = 0; i < seats.length; i++) {
    const moviePrice = document.querySelector("#moviePrice");
    const totalPrice = document.querySelector("#totalPrice");
    const noOfSeats = document.querySelector("#numberOfSeat");
    const selectedSeatsHolder = document.querySelector("#selectedSeatsHolder");

    seats[i].addEventListener("click", (event) => {
      if (!seats[i].classList.contains("occupied")) {
        if (seats[i].classList.contains("selected")) {
          seats[i].classList.remove("selected");
          totalPrice.textContent = `$ 
            ${
              Number(totalPrice.textContent.substring(2)) -
              Number(moviePrice.textContent.substring(2))
            }`;
          noOfSeats.textContent = `${Number(noOfSeats.textContent) - 1}`;
          document.querySelector(`#_${i}`).remove();
          if (
            document.querySelectorAll("#selectedSeatsHolder span").length == 1
          ) {
            document.querySelector(".noSelected").style.display = "block";
          }
        } else {
          seats[i].classList.add("selected");
          totalPrice.textContent = `$ 
            ${
              Number(totalPrice.textContent.substring(2)) +
              Number(moviePrice.textContent.substring(2))
            }`;
          noOfSeats.textContent = `${Number(noOfSeats.textContent) + 1}`;
          seatNumber = document.createElement("span");
          seatNumber.textContent = i;
          seatNumber.setAttribute("id", `_${i}`);
          seatNumber.classList.add("selectedSeat");
          selectedSeatsHolder.append(seatNumber);

          document.querySelector(".noSelected").style.display = "none";
        }
      }
    });
  }
}

unoccupiedSeatEvent();

//Add eventLsiter to continue Button

function continueBtnEvent() {
  const continueBtn = document.querySelector("#proceedBtn");
  const seats = document.querySelectorAll("#seatCont .seat");
  continueBtn.addEventListener("click", () => {
    if (document.querySelector("#seatCont .selected")) {
      alert("Yayy! Your Seats have been booked");
    } else {
      alert("Oops no seat Selected");
    }

    for (let i = 0; i < seats.length; i++) {
      if (seats[i].classList.contains("selected")) {
        seats[i].classList.add("occupied");
        seats[i].classList.remove("selected");
      }
    }
    reset();
  });
}

continueBtnEvent();

// Add eventListerner to Cancel Button

function cancelBtnEvent() {
  cancelBtn.addEventListener("click", reset);
}

cancelBtnEvent();

//Add Reset function

function reset() {
  {
    const cancelBtn = document.querySelector("#cancelBtn");
    const totalPrice = document.querySelector("#totalPrice");
    const noOfSeats = document.querySelector("#numberOfSeat");
    const seats = document.querySelectorAll("#seatCont .seat");
    const selectedSeatsHolder = document.querySelectorAll(
      ".selectedSeatsHolder span"
    );

    for (let i = selectedSeatsHolder.length - 1; i > 0; i--) {
      selectedSeatsHolder[i].remove();
      document.querySelector(".noSelected").style.display = "block";
    }
    for (let i = 0; i < seats.length; i++) {
      if (seats[i].classList.contains("selected")) {
        seats[i].classList.remove("selected");
      }
    }

    totalPrice.textContent = "$ 0";
    noOfSeats.textContent = "0";
  }
}
