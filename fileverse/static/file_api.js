function upload_file(){

}

function update_file(){

}



async function delete_file(event){
    const  id = event.target.parentElement.parentElement.id;
    const  delete_request = "/files/delete/" + id;
    response = await fetch(delete_request, {method: "DELETE"});

}


function download_file(){

}

function getFileId(event){

    let element = event.target
    
    if (element.name === "delete"){
        alert("onclick delete button, id = " + element.parentElement.parentElement.id)

    }

    if (element.name === "download"){
        alert("onclick download button, id =" + element.parentElement.parentElement.id)
    }
}



