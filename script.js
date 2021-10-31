let globaldata = [];
const cardgeneration = document.getElementById("cardgeneration");

const addCard = () => {
  const newCard_details = {
    id: `${Date.now()}`,
    imageurl: document.getElementById("imageurl").value,
    ridename: document.getElementById("ridename").value,
    capacity: document.getElementById("capacity").value,
    availability: document.getElementById("availability").value,
  };

  cardgeneration.insertAdjacentHTML("beforeend", generateCard(newCard_details));
  globaldata.push(newCard_details);
  savetolocalstorage();
};
const generateCard = ({ id, imageurl, ridename, capacity, availability }) => {
  return `<div class="col-md-6 col-lg-3" id=${id}>
            <div class="card border-2 mb-3" style="border-color: black; max-width: 20rem;">
                <div class="card-header bg-transparen d-flex justify-content-end border-success ">
                    <button type="button" class="btn btn-outline-info" name=${id} onclick="editCard(this)"><i class="bi bi-pencil-square"></i></button>
                    <button type="button" class="btn btn-outline-danger" name=${id} onclick="deleteCard(this)" ><i  class="bi bi-trash"></i></button>
                </div>
                <div class="card-body">
                    <img style="width: 100%; height: 100px;" src=${imageurl} alt="">
                    <div>
                    <label for="ridename">Ridename:</label>
                    <h3>${ridename}</h3>
                    </div>
                    <div class="d-inline"><label for="capacity">Capacity:</label><h5 class="card-title d-inline">${capacity}</h5></div>
                    <div class="d-block"><label for="availability">Status:</label><h5 class="d-inline card-title">${availability}</h5></div>
                    <span class="badge bg-success ">Available</span>
                    <span class="badge bg-danger ">Not Available</span>
                    <span class="badge bg-warning text-dark ">Under Construction</span>
                </div>
                <div class="card-footer d-flex justify-content-between  bg-transparent border-success">    
                <button type="button" class="btn btn-primary btn-sm" name=${id} onclick="saveEditTask(this)">Save Changes</button>
                </div>
            </div>
      </div>`;
};

const savetolocalstorage = () => {
  localStorage.setItem("Rides", JSON.stringify({ rides: globaldata }));
};

const reloading_storage = () => {
  let localStoragecopy = JSON.parse(localStorage.getItem("Rides"));
  if (localStoragecopy) {
    globaldata = localStoragecopy.rides;
  }
  globaldata.map((ridedata) => {
    cardgeneration.insertAdjacentHTML("beforeend", generateCard(ridedata));
  });
  
};

const deleteCard = (e) => {
  const targetid = e.getAttribute("name");
  console.log(targetid);
  globaldata = globaldata.filter((id) => id.id != targetid);
  savetolocalstorage();
  window.location.reload();
};

const editCard = (e) => {
  const targetid = e.getAttribute("name");
  console.log(targetid);
  // console.log(e.parentNode.parentNode.childNodes[3].childNodes[1].setAttribute("contenteditable",true))
  console.log(e.parentNode.parentNode.childNodes[3].childNodes);
  e.parentNode.parentNode.childNodes[3].childNodes[3].childNodes[3].setAttribute("contenteditable",true);
  e.parentNode.parentNode.childNodes[3].childNodes[5].childNodes[1].setAttribute("contenteditable",true);
  e.parentNode.parentNode.childNodes[3].childNodes[7].childNodes[1].setAttribute("contenteditable",true);
};

const saveEditTask = (e) => {
  const targetid = e.getAttribute("name");
  console.log(targetid);
  const Ridename = e.parentNode.parentNode.childNodes[3].childNodes[3].childNodes[3];
  const Capacity = e.parentNode.parentNode.childNodes[3].childNodes[5].childNodes[1];
  const Availability = e.parentNode.parentNode.childNodes[3].childNodes[7].childNodes[1];
  const updatedData = {
    ridename: Ridename.innerHTML,
    capacity: Capacity.innerHTML,
    availability: Availability.innerHTML,
  };

  let stateCopy = globaldata;
  stateCopy = stateCopy.map((card) =>
    card.id === targetid
      ? {
          id: card.id,
          ridename: updatedData.ridename,
          capacity: updatedData.capacity,
          availability: updatedData.availability,
        }
      : card
  );

  globaldata = stateCopy;
  console.log(updatedData);
  console.log(globaldata)
  savetolocalstorage();
  window.location.reload();
};
