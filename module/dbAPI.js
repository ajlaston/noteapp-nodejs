const getAll = () => {
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