let inputing = document.querySelector(".inputing")


let arrows = document.querySelectorAll(".thead_title")

let title = document.getElementById("title")
let author = document.getElementById("author")
let isbn = document.getElementById("isbn")
let book_list = document.getElementById("book-list")


let tableFirst = document.querySelector(".table")

let btn = document.querySelector(".btn")



let itemsArr = []


if (localStorage.getItem("itemsLocal")) {

    itemsArr = JSON.parse(localStorage.getItem("itemsLocal"))

    itemsArr.forEach(function (z) {

        book_list.insertAdjacentHTML("beforeend", `

        <tr  id="${z.id}"  >
            <td>${z.title}</td>
            <td>${z.author}</td>
            <td>${z.isbn}</td>
            <td><button       class="delete"   >X</button></td>
        </tr>
    `)



    })

}





btn.addEventListener("click", function (event) {

    event.preventDefault()



    let item = {
        id: Date.now(),
        title: title.value,
        author: author.value,
        isbn: isbn.value
    }

    itemsArr.push(item)


    localStorage.setItem("itemsLocal", JSON.stringify(itemsArr))




    book_list.insertAdjacentHTML("beforeend", `

        <tr   id="${item.id}"      >
            <td>${title.value}</td>
            <td>${author.value}</td>
            <td>${isbn.value}</td>
            <td><button       class="delete"   >X</button></td>
        </tr>
    `)


})



book_list.addEventListener("click", function (event){


    if (event.target.className === "delete") {
        event.target.parentNode.parentNode.remove()
    }


    itemsArr.forEach(function (z, index) {
        if (z.id == event.target.parentNode.parentNode.id) {


            let deleteIndex = index

            itemsArr.splice(deleteIndex , 1)
            localStorage.setItem("itemsLocal", JSON.stringify(itemsArr))

        }
    } )

})



for (let i = 0; i < arrows.length; i++) {

    let sortWay

    arrows[i].addEventListener("click", function () {

        if (arrows[i].classList.contains("active")) {
            arrows[i].classList.remove("active")
            sortWay = false


        }

        else {
            arrows[i].classList.add("active")
            sortWay = true
        }




        sortTableByColumn(tableFirst, i, sortWay)


    })

}










function sortTableByColumn(table, column, srt = true) {

     let boolean
     if (srt === true) {
         boolean = 1
     }
     else {
         boolean = -1
     }

        let answer =  Array.from(book_list.querySelectorAll("tr")).sort(function (a,b) {

        let Acontent =  Array.from(a.querySelectorAll("td"))[`${column}`].textContent.trim()
        let Bcontent =  Array.from(b.querySelectorAll("td"))[`${column}`].textContent.trim()


        if (Acontent > Bcontent) {
            return 1 * boolean;
        }
        if (Acontent < Bcontent) {
            return -1 * boolean;
        }


    })


    book_list.innerHTML = ""


    book_list.append(...answer)



}


inputing.addEventListener("input", function (event) {


    let text = event.target.value.toLowerCase()

    let rowsing = Array.from(book_list.querySelectorAll("tr"))

    for (let i = 0; i < rowsing.length; i++) {

            if (rowsing[i].textContent.toLowerCase().indexOf(text) > -1) {
                rowsing[i].style.display = "";
            } else {
                rowsing[i].style.display = "none";
            }
            console.log(rowsing[i].textContent)

    }

})



