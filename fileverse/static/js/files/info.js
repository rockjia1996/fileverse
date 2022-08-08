function showInfo(name, size, date){
    const infoHTML = document.querySelector(".info-container");
    const fileName = document.querySelector(".info__filename input");
    const fileSize = document.querySelector(".info__filesize input");
    const fileDate = document.querySelector(".info__date input");
    const closeButton = document.querySelector(".info__action button");

    fileName.value = name;
    fileSize.value = size;
    fileDate.value = date;
    infoHTML.classList.replace("display-disable", "display-active");

    closeButton.onclick = (event) => {
        event.preventDefault();
        infoHTML.classList.replace("display-active", "display-disable");
    }
}