function openTab(event, tableName){
    const tablecontents = document.querySelectorAll(".tabcontent")

    for (content of tablecontents){
        if (content.id === tableName){
            content.style.display = "block";
            continue;
        }
        content.style.display = "none";
    }
}