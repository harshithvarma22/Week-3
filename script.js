const categorieslist=document.getElementById('categorieslist');
const noteslist=document.getElementById('noteslist');
const newcategoryinput=document.getElementById('newcategoryinput');
const addcategoriesbtn=document.getElementById('addcategoriesbtn');
const searchcategoryinput=document.getElementById('searchcategoryinput');
const searchcategoriesbtn=document.getElementById('searchcategoriesbtn');
const notecontent=document.getElementById('notecontent');
const addnotesbtn=document.getElementById('addnotesbtn');
const editnotesbutton=document.getElementById('editnotesbutton');
const deletenotesbutton=document.getElementById('deletenotesbutton');
const showAllCategory=document.getElementById('showAllCategory');

let categories=['Personal', 'Work'];
let currentCategory='Personal';

let notes={
    'Personal':['Buy Milk', 'Buy Fruits'],
    'Work':['Finish Report', 'Finish Project', 'Meeting'],
}

function displayCategories(){
    categorieslist.innerHTML="";
    categories.forEach(category=>{
        const li=document.createElement('li');
        li.textContent=category;
        li.addEventListener('click',()=>{
            currentCategory=category;
            displaynotes(category);
        })
        categorieslist.appendChild(li);
    })
}
displayCategories();


function displaynotes(category){
    noteslist.innerHTML="";
    notes[category].forEach(note=>{
        const li=document.createElement('li');
        li.textContent=note;
        li.addEventListener('click',()=>{
            notecontent.value=note;
            notecontent.dataset.category=category;
            notecontent.dataset.note=note;
            editnotesbutton.style.display='inline';
        })
        noteslist.appendChild(li);
    })
}


showAllCategory.addEventListener('click',()=>{
    displayCategories();
})

addcategoriesbtn.addEventListener('click', ()=>{
    const newcategory=newcategoryinput.value.trim();
    if(newcategory!==''){
        categories.push(newcategory);
        notes[newcategory]=[];
    displayCategories();
    newcategoryinput.value="";
    }
    else{
        alert("Enter new category before adding");
    }
});

searchcategoriesbtn.addEventListener('click', () => {
    const searchCategory = searchcategoryinput.value.trim().toLowerCase();
    if (searchCategory !== '') {
        const matchingCategories = categories.filter(category => {
            return category.toLowerCase().includes(searchCategory);
        });
        if (matchingCategories.length > 0) {
            const originalCategories = [...categories];
            categories = matchingCategories;
            displayCategories();
            categories = originalCategories;
            searchcategoryinput.value='';
        } else {
            alert("No matching categories found.");
        }
    } else {
        alert("Please enter a search query.");
    }
});



addnotesbtn.addEventListener('click', ()=>{
    const newnote=notecontent.value.trim();
    if(newnote!==''){
     notes[currentCategory].push(newnote);
     displaynotes(currentCategory);
     notecontent.value="";
    }
    else{
     alert("Enter new note before adding");
 }
 });

editnotesbutton.addEventListener('click',()=>{
    const category=notecontent.dataset.category;
    const oldNotes=notecontent.dataset.note;
    const newNotes=notecontent.value.trim();

    if(category && oldNotes && newNotes !==''){
        const index=notes[category].indexOf(oldNotes);
        if(index!==-1){
            notes[category][index]=newNotes;
            displaynotes(category);
            notecontent.value='';
            editnotesbutton.style.display='none';
        }
    }
});

deletenotesbutton.addEventListener('click',()=>{
    const category=notecontent.dataset.category;
    const note= notecontent.dataset.note;
    if(category&&note){
        const index=notes[category].indexOf(note);
        if(index!==-1){
            notes[category].splice(index,1);
            displaynotes(category);
            notecontent.value='';
        }
    }
});