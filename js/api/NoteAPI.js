//server url
const url = 'http://127.0.0.1:3000/';

// get all notes
export const getAll = () => {
    return new Promise((resolve,reject)=>{
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if(xhr.readyState == 4 && xhr.status == 200) {
                resolve(xhr.responseText);
            }
        }
        xhr.open('GET', '/js/db/noteDb.json');
        xhr.send();
    });
}

// check if a note in db has same name
export const nameTaken = (title) => {
    
   return getAll()
    .then(res => {
        let data = JSON.parse(res);
        for(let i = 0; i < data.length; i++){
            if(data[i].internal == title.toLowerCase()){
                return true;
            }
        }
        return false;
    });
}

//create note and post to server
export const createNote = async(title,content) => {

    const check = await nameTaken(title.value);

    return new Promise((resolve,reject)=>{

        if(title.value !== '' && content.value !== '' && !check){
            const dt = new Date();
            const template = {
                "internal" : `${title.value}`.toLowerCase(),
                "title" : `${title.value}`,
                "content" : `${content.value}`,
                "created" : dt,
                "last modified" : dt
            };

            let data = JSON.stringify({"message" : template, "type" : "add"});
        
            const xhr = new XMLHttpRequest();
            xhr.onreadystatechange = () => {
                if(xhr.readyState == 4 && xhr.status == 200){
                    resolve(JSON.parse(xhr.responseText));
                }
            }
            xhr.open('POST', url +'js/db/');
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(data);

        } else if(check){
            alert('Note with name already exists');
        }  else {
            alert('a textbox is empty');
        } 
    });  
}

// delete note////////////
export const deleteNote = (elem) => {

    let title = elem.querySelector('.title').innerHTML.toLowerCase();

    return getAll()
    .then(res => {

        let data = JSON.parse(res);
        
        for(let i = 0; i < data.length; i++){

            if(data[i].internal == title){
                data.splice(i,1);
                return data;
            }
        }   
    }).then(res=> {

        return new Promise((resolve,reject)=>{
            console.log(res);
            let data = JSON.stringify({"message" : res, "type" : "remove"})
    
            const xhr = new XMLHttpRequest();
            xhr.onreadystatechange = () => {
                if(xhr.readyState == 4 && xhr.status == 200){
                   resolve(JSON.parse(xhr.responseText));
                }
            }
            xhr.open('POST', url +'js/db/');
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(data);
        }) 
    });
    
}
