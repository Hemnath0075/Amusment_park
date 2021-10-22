let globaldata= [];
const cardgeneration=document.getElementById("cardgeneration");

const addCard = () =>{
    const newCard_details = {
        id:`${Date.now()}`,
        imageurl:document.getElementById("imageurl").value,
        ridename:document.getElementById("ridename").value,
        capacity:document.getElementById("capacity").value,
        availability:document.getElementById("availability").value
    }
    
    cardgeneration.insertAdjacentHTML("beforeend",generateCard(newCard_details));

    globaldata.push(newCard_details);
    savetolocalstorage();

}
const generateCard= ({id, imageurl, ridename, capacity ,availability}) =>{
    return (
    `<div class="col-md-6 col-lg-3" id=${id}>
            <div class="card border-2 mb-3" style="border-color: black; max-width: 20rem;">
            <div class="card-header bg-transparen d-flex justify-content-end border-success ">
                <button type="button" class="btn btn-outline-info"><i class="bi bi-pencil-square"></i></button>
                <button type="button" class="btn btn-outline-danger" name=${id} onclick="deleteCard(this)" ><i  class="bi bi-trash"></i></button>
            </div>
            <div class="card-body">
                <img style="width: 100%; height: 200px;" src=${imageurl} alt="">
                <h3>${ridename}</h3>
                <h5 class="card-title">Capacity: ${capacity}</h5>
                <h5 class="card-title">Capacity: ${availability}</h5>
                <span class="badge bg-success d">Available</span>
                <span class="badge bg-danger">Not Available</span>
                <span class="badge bg-warning text-dark">Under Construction</span>
            </div>
            <div class="card-footer d-flex justify-content-between  bg-transparent border-success">
                <button type="button" class="btn btn-primary btn-sm">Save Changes</button>
            </div>
            </div>
      </div>`)
}

const savetolocalstorage = ()=>{
    localStorage.setItem("Rides",JSON.stringify({rides: globaldata}));
}

const reloading_storage = ()=>{
    let localStoragecopy=JSON.parse(localStorage.getItem("Rides"));
    if(localStoragecopy){
        globaldata = localStoragecopy.rides;
    }
    globaldata.map((ridedata) => {
        cardgeneration.insertAdjacentHTML("beforeend",generateCard(ridedata));
    })
}

const deleteCard = (e)=>{
    const targetid = e.getAttribute("name");
    console.log(targetid);
    globaldata=globaldata.filter((id)=>id.id!=targetid);
    savetolocalstorage();
    window.location.reload();
}