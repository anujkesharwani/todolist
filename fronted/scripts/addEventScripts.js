const enterToTable=document.getElementById("entertask");
const addToTable=document.getElementById("addtask");
const todoListNode=document.getElementById("todo-item");
const dataForDeleted=document.getElementById("deletetask");
const removeFromTable=document.getElementById("deleted");

addToTable.addEventListener("click",function(){
  // get text from the input
  // send text to server using api ( fetch or xmlhttprequest )
  // get response from server
  // if request is successful then add to table
  // else display error message


 const enteredtask=enterToTable.value;
  // console.log(enteredtask)
   if(!enteredtask){
    alert("please enter the task ");
     return;
   }
  const todo={enteredtask};
   fetch("/todo",{
     method:"POST",
     headers:{
         "Content-Type":"application/json",
     },
  body:JSON.stringify(todo),
   }).then(function (response){
    if(response.status===200){
  //       //display todo in table
       showTodoInTable(todo);
     }
     else{
         alert("something wrong");
    }
    
   });


});




function showTodoInTable(todo){
    const todoTextNode=document.createElement("anuj");
    todoTextNode.innerText=todo.enteredtask;
    todoListNode.appendChild(todoTextNode);
}
fetch("/todo")
  .then(function (response) {
    if (response.status === 200) {
      return response.json();
    } else {
      alert("something weird happened");
    }
  })
  .then(function (todos) {
    todos.forEach(function (todo) {
      showTodoInTable(todo);
    });
  });
