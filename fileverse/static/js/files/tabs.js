function openTab(event, tableName){
    const tablecontents = document.querySelectorAll(".tabcontent")
    const tabs = document.querySelectorAll(".tab_link");

    for (tab of tabs){
        tab.classList.remove("active");
    }

    event.target.classList.add("active");


    for (content of tablecontents){
        if (content.id === tableName){
            content.style.display = "block";
            continue;
        }
        content.style.display = "none";
        content.classList.remove("active");
    }
}