const infos_tasks=document.querySelector(".section .cont .little-sec .infos-tasks") ;
const add_butt=document.querySelector(".todo .container-input .fa-container");
const theinput=document.querySelector(".todo .container-input .theinput") ;
const no_task=document.querySelector(".todo .no-task-container") ;
const todo=document.querySelector(".todo") ;

let x=0 ;


window.onload = function() {
    theinput.focus() ;
}

                                        /*window.addEventListener("load",()=>{
                                            theinput.focus() ;
                                        });*/

function add_task(ch) {
    //increment the "All" number :

    let numb_all=document.querySelector(".infos-tasks ul .list-all .numb-All") ;
    x++ ;
    numb_all.textContent=x ;                    /*element.textContent is a string*/

    
    const todo=document.querySelector(".section .cont .little-sec .todo") ;
    
    let container_task=document.createElement("span") ;
    container_task.className="container-task cont-tasks" ;

    
    let toggle=document.createElement("span") ;
    toggle.className="toggle fa-check-trash-container" ;

    check_icon=document.createElement("i") ;
    check_icon.className="fas fa-check" ;
    toggle.appendChild(check_icon) ;
    container_task.appendChild(toggle) ;

    let trash=document.createElement("span") ;
    trash.className="trash fa-check-trash-container" ;

    trash_icon=document.createElement("i") ;
    trash_icon.className="fas fa-trash" ;
    trash.appendChild(trash_icon) ;

    container_task.appendChild(trash) ;

    
    let task=document.createElement("span") ;
    task.className="task" ;
    
    task.textContent=ch ;
    
    container_task.appendChild(task) ;
    todo.appendChild(container_task) ;



}


add_butt.addEventListener("click",()=>{
        if (theinput.value=="")
            alert("input field is empty") ;
        else
            if (theinput.value!=""){
                removeNoTask() ;
                infos_tasks.classList.add("active") ;
                add_task(theinput.value) ;
                /*save todos in the localstorage*/
                SaveTodos(theinput.value) ;
                theinput.value="" ;
            }
});



document.addEventListener("click",(e)=>{
    if (e.target.classList.contains("trash")) {
        showAddNotask() ;
        showInfos()
        remove_el(e.target.parentElement) ;
        let numb_all=document.querySelector(".infos-tasks ul .list-all .numb-All") ;
        numb_all-- ;
    }
});


let y=0 ;
document.addEventListener("click",(e)=>{
    if (e.target.classList.contains("toggle")) {
        const numb_completed=document.querySelector(".infos-tasks ul .list-completed .numb-completed") ;
        y++ ;
        numb_completed.textContent=y ;
        check_span=e.target.parentElement ;
        check_span.classList.toggle("active") ;
    }
});


remove_el = (element)=> {
    element.remove() ;
}
/*completed/active/clear/all */

const list_all=document.querySelector(".infos-tasks ul .list-all") ;
const list_active=document.querySelector(".infos-tasks ul .list-active") ;
const list_completed=document.querySelector(".infos-tasks ul .list-completed") ;
const list_clear_completed=document.querySelector(".infos-tasks ul .list-clear-completed") ;


list_all.addEventListener("click",()=>{
    const todos=document.querySelectorAll(".todo .container-task") ;
    todos.forEach(el => {
            if (el.classList.contains("cont-tasks") && el.style.display=="none")
                el.style.display="flex" ;
    });
});

list_completed.addEventListener("click",(e)=>{
    const todos=document.querySelectorAll(".todo .container-task") ;
    todos.forEach(span => {
        if (span.classList.contains("active"))
            span.style.display="flex" ;
            else
                span.style.display="none" ;
    });
}) ;


list_clear_completed.addEventListener("click",(e)=>{
    const todos=document.querySelectorAll(".todo .container-task") ;
    todos.forEach(span => {
        if (span.classList.contains("active"))
            remove_el(span) ;
    });
}) ;

/*function sweetAlert() {
    const sec=document.querySelector(".section") ;

    let overlay=document.createElement("div") ;
    let box = document.createElement("div") ;

    
    overlay.className="overlay" ;
    box.className="box" ;
    overlay.appendChild(box) ;

    sec.appendChild(overlay) ;

}*/

function removeNoTask() {
    if (!(no_task.classList.contains("hide")))
        no_task.classList.toggle("hide") ;
}

function showAddNotask() {
    if (todo.childNodes.length<=10) {
        no_task.classList.toggle("hide") ;
    }
}

function showInfos() {
    let infosTasks=document.querySelector(".infos-tasks") ;
    if (todo.childNodes.length<=10)
        infosTasks.classList.remove("active") ;
}

function SaveTodos(ch) {

    let todos;

    if(localStorage.getItem(todos)===null) {
        todos=[] ;
    }
    else {
        todos=JSON.parse(localStorage.getItem("todos")) ;
    }

    todos.push(ch) ;                /*push() is a method to add items in the end of the array unshift is same as push, but it adds items in the beginning of the array */
    localStorage.setItem("todos",JSON.stringify(todos)) ;

}


//Some notes

/*

1/ HTMLCollection is an array (and the method GetbyTagName() returns an array filled with elements) .

2/ A "node", in this context, is simply an HTML element.

3/ "DOM" is a tree structure that represents the HTML of the website,and every HTML element is a "node"

4/ The Document Object Model (DOM) is a programming interface for HTML, It represents the page so that programs can change the document structure, style, and content.
The DOM represents the document as nodes and objects 

5/ The localStorage and sessionStorage properties allow to save key/value pairs in a web browser.
The localStorage object stores data with no expiration date.
The data will not be deleted when the browser is closed, and will be available the next day, week, or year.
The localStorage property is read-only.

6/Local storage provides at least 5MB of data storage across all major web browsers .

*/