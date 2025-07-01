const title = document.querySelector("#Note_title");
const content = document.querySelector("#content");
const savenote = document.querySelector("#submits");
const message = document.querySelector(".message")
const notesContainer = document.querySelector("#notesContainer");
const clear = document.querySelector("#clearall");
const show = document.querySelector("#show");



function saveNoteToLocalStorage(note){
  const notes = JSON.parse(localStorage.getItem("My_Notes"))||[];
  notes.push(note);
  localStorage.setItem("My_Notes",JSON.stringify(notes));
}

function deletenotefromlocalstorage(id){
    let notes = JSON.parse(localStorage.getItem("My_Notes")) || []; 
    notes = notes.filter(note => note.id !== id); 
    localStorage.setItem('My_Notes', JSON.stringify(notes)); 
}
function displayNotes(){
  notesContainer.innerHTML = '';
    const notes = JSON.parse(localStorage.getItem("My_Notes")) || [];
  if(notes.length===0){
    notesContainer.innerHTML='<p class = "no-notes-message">No Notes are saved </p>';
    return;
  }
notes.forEach(note => {
  const noteCard = document.createElement("div");
  noteCard.className = "note-card";
  noteCard.innerHTML = `
  <h3>Title : ${note.Title}</h3>
  <p>Content : ${note.Content}</p>
  <button class="delete-button" data-id = "${note.id}" >&times</button>
  `;

const deletebutton = noteCard.querySelector(".delete-button");
deletebutton.addEventListener("click",()=>{
  const noteid = Number(deletebutton.dataset.id);
  noteCard.classList.add("note-card-vanishing")

  setTimeout(()=>{
      deletenotefromlocalstorage(noteid);
  displayNotes();
  },400)

});

notesContainer.append(noteCard);

});


}

savenote.addEventListener('click',()=>{
  const noteTitle = title.value.trim();
  const noteContent = content.value.trim();
  if(noteTitle === '' || noteContent === ''){
message.innerHTML = '<p class = "message error" >Please write note Title & Content to Make note </p>';
setTimeout(()=>{message.textContent = ""},3000);
return;
  }
const newNote = {
  id:Date.now(),
  Title:noteTitle,
  Content:noteContent
};
saveNoteToLocalStorage(newNote);

message.textContent = "Note saved Successfully";
message.style.color = 'green'
setTimeout(()=>{message.textContent = ""},3000);
title.value = "";
content.value = "";
displayNotes();
});

clear.addEventListener("click",()=>{
  notesContainer.classList.add("notes-vanishing");
setTimeout(() => {
        localStorage.clear(); // लोकल स्टोरेज से नोट्स साफ़ करें
        displayNotes(); // UI को अपडेट करें (जो अब "No Notes are saved" संदेश दिखाएगा)
        notesContainer.classList.remove("notes-vanishing"); // वैनिश क्लास हटा दें ताकि अगली बार नोट्स दिखने पर यह सामान्य हो
    }, 500); // ट्रांज़िशन की अवधि से मेल खाने के लिए यह टाइमआउट 500ms (0.5s) होना चाहिए
});


show.addEventListener("click",()=>{
displayNotes()
})