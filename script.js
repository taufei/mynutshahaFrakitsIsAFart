

document.querySelectorAll("a").forEach(function(element) {element.href = "#"})

document.querySelectorAll("#active, #hidden").forEach(function(element) {
    console.log(element);
    element.querySelector("a").onclick = () => {
        console.log("clicked");
        element.id = element.id == "active" ? "hidden" : "active";
    }
})