window.addEventListener("load", () => {
    const dropzone = document.querySelector(".drop-box");
    const dropList = document.querySelector(".drop-list");

    dropzone.addEventListener("dragover", e => {
        console.log("드래그 오버");
        e.preventDefault();
    });
    dropzone.addEventListener("drop", e => {
        e.preventDefault();
        let fileList = Array.from(e.dataTransfer.files);

        fileList.forEach(f => {
            let formData = new FormData();
            formData.append("file", f);
            

            let xhr = new XMLHttpRequest();
            xhr.open("POST", "/upload.php");
            xhr.addEventListener("load", () => {
                let json = JSON.parse(xhr.responseText);
                if (json.type == "image") {
                    let child = makeTemplate(json.src, f.name);
                    dropList.appendChild(child);
                } else {

                }
            });
            xhr.addEventListener("progress", e => {
                (e.loaded / e.total) * 100;
            });
            xhr.send(formData);
        })
    });
});


function makeTemplate(src, name) {
    let div = document.createElement("div");
    div.innerHTML = `
        <div class="img-box">
            <img src="${src}" alt="">
        </div>
        <div class="text-box">
            ${name}
        </div>`;
    div.classList.add("upload-item");
    return div;
}