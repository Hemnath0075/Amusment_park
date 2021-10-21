let globaldata= [];
const cardgeneration=document.getElementById("studentscardgeneration");

const addCard = () =>{
    const newCard_details = {
        imageurl:document.getElementById("imageurl").value,
        studentname:document.getElementById("studentname").value,
        studentregisternumber:document.getElementById("registernumber").value
    }
    
    cardgeneration.insertAdjacentHTML("beforeend",generateCard(newCard_details));

    globaldata.push(newCard_details);
    savetolocalstorage();

}
const generateCard= ({imageurl, studentname,studentregisternumber}) =>{
    return (
    `<div class="col-md-6 col-lg-3">
        <div class="card border-2 mb-3" style="border-color: black; max-width: 20rem;">
            <div class="card-header bg-transparen d-flex justify-content-end border-success ">
                <button type="button" class="btn btn-outline-info"><i class="bi bi-pencil-square"></i></button>
                <button type="button" class="btn btn-outline-danger"><i class="bi bi-trash"></i></button>
            </div>
            <div class="card-body">
                <img style="width: 50px; height: 50px;" src=${imageurl} alt="">
                <h5 class="card-title">${studentname}</h5>
                <h3>${studentregisternumber}</h3>
                <span id="present" style="display: none;" class="badge bg-success">Present</span>
                <span id="absent" style="display: none;" class="badge bg-danger">Absent</span>
            </div>
            <div class="card-footer d-flex justify-content-between  bg-transparent border-success">
                <div>
                <button onclick="Present()"  type="button" class="btn btn-outline-success btn-sm">Present</button>
                <button onclick="Absent()"  type="button" class="btn btn-outline-danger btn-sm">Absent</button>
                </div>
                <button type="button" class="btn btn-primary btn-sm">Save Changes</button>
            </div>
        </div>
    </div>`)
}

const savetolocalstorage = ()=>{
    localStorage.setItem("19CS401",JSON.stringify({students: globaldata}));
}

const reloading_storage = ()=>{
    let localStoragecopy=JSON.parse(localStorage.getItem("19CS401"));
    if(localStoragecopy){
        globaldata = localStoragecopy.students;
    }
    globaldata.map((studentdata) => {
        cardgeneration.insertAdjacentHTML("beforeend",generateCard(studentdata));
    })
}