import * as noteAPI from './api/NoteAPI.js';
const input = document.querySelector('#inp');
const title = document.querySelector('#title');
const btn = document.querySelector('#btn');
const container = document.getElementById('container');
const readDiv = document.getElementById('read');

//create cards from HTML or Node collection
const generateCards = (result) => {

    if(container.children.length > 0){
        let child = container.children;

        //removes the first and only child element of div
        container.removeChild(child[0]);
    }

    let ul = document.createElement('ul');
    ul.id = 'notes';
    container.appendChild(ul);

    for(let i = 0; i < result.length; i++){
        

        let li = document.createElement('li');
        li.className = 'card';
        li.innerHTML = `
            <button class='remove'>x</button>
            <div class='body'>
            <h4 class='title'>${result[i].title}</h4>
            <hr>
            <p class='content'>${result[i].content}</p>
            </div>
        `;

        ul.appendChild(li);
    }

    // click on note listener
    ul.addEventListener('click', (event)=>{

        //select card and show in viewer
        if(event.target.tagName === 'LI'){
    
            let body = event.target.querySelector('.body');
            //event.target.style.border = '2px solid blue';
            const template = body.innerHTML;
            readDiv.innerHTML = `<h3 style='text-align : center'>Note Viewer</h3>${template}`;
            readDiv.style.display = 'block';

        }

        //delete card/////////////
        if(event.target.tagName === 'BUTTON'){
            const parent = event.target.parentNode;
            noteAPI.deleteNote(parent)
            .then(res=> {
                generateCards(res);
                readDiv.style.display = 'none';
            });
        }
    })
}

//create notes
btn.addEventListener('click', ()=>{
    noteAPI.createNote(title,input)
    .then((res)=> {
            //reloads all notes with new notes
            generateCards(res);
    });
});

//load notes
function loadNotes(){

    //load docs from server at start up
    noteAPI.getAll()
    .then(res => {
        let data = JSON.parse(res);
        generateCards(data)
    })
    readDiv.style.display = 'none';
   
}

window.onload = loadNotes();

