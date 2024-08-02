import {getFirestore,db,collection, addDoc,app,getDocs,doc, deleteDoc } from './app.js'

try{
    let openArea = document.querySelector('.openArea');

// get openArea Elements
let title = document.querySelector('.title');
let description = document.querySelector('.description');
let category = document.querySelector('.category');
let rating = document.querySelector('.rating');

let mensCollection = document.getElementById('mensCollection')
let womensCollection = document.getElementById('womensCollection')
let jwellery = document.getElementById('jwellery')
let electronics = document.getElementById('electronics')

let fetchUrl = async() => {
    let response = await fetch('https://fakestoreapi.com/products');
    let data = await response.json();


    for(let i = 0; i < data.length; i++){
        if(i < 4){
            let createDivForMens = document.createElement('div');
        createDivForMens.className = 'sec_child';
        let HTML = `<img src="${data[i].image}" alt="">
                <h1 class="item_title">${data[i].title}</H1>
                <p class="items_details">${data[i].description}</p>
                <button class="view">View Item</button>
                <button class="add_to_cart">Add to Cart</button>`;
                createDivForMens.innerHTML = HTML;
                mensCollection.querySelector('.sec').appendChild(createDivForMens)
        }else if(i < 8){
            let createDivForJwellery = document.createElement('div');
            createDivForJwellery.className = 'sec_child';
        let HTML = `<img src="${data[i].image}" alt="">
                <h1 class="item_title">${data[i].title}</H1>
                <p class="items_details">${data[i].description}</p>
                <button class="view">View Item</button>
                <button class="add_to_cart">Add to Cart</button>`;
                createDivForJwellery.innerHTML = HTML;
                jwellery.querySelector('.sec').appendChild(createDivForJwellery)
        }else if(i < 14){
            let createDivForElectronic = document.createElement('div');
            createDivForElectronic.className = 'sec_child';
        let HTML = `<img src="${data[i].image}" alt="">
                <h1 class="item_title">${data[i].title}</H1>
                <p class="items_details">${data[i].description}</p>
                <button class="view">View Item</button>
                <button class="add_to_cart">Add to Cart</button>`;
                createDivForElectronic.innerHTML = HTML;
                electronics.querySelector('.sec').appendChild(createDivForElectronic)
        }else{
            let createDivForWomens = document.createElement('div');
            createDivForWomens.className = 'sec_child';
        let HTML = `<img src="${data[i].image}" alt="">
                <h1 class="item_title">${data[i].title}</H1>
                <p class="items_details">${data[i].description}</p>
                <button class="view">View Item</button>
                <button class="add_to_cart">Add to Cart</button>`;
                createDivForWomens.innerHTML = HTML;
                womensCollection.querySelector('.sec').appendChild(createDivForWomens)
        }
        let viewBtns = document.querySelectorAll('.view');
        viewBtns.forEach(view => {
            view.addEventListener('click', (e)=> {
                sessionStorage.setItem('openArea', true)
                openArea.style.display = 'flex'
                document.querySelector('.all').style.display = 'none'
                title.innerHTML = `<strong style="color: red; font-weight: 800; font-size: 20px;">Title:- </strong> ${view.parentElement.querySelector('h1').textContent}`
                description.innerHTML = `<strong style="color: red; font-weight: 800; font-size: 20px;">Descroipotion:- </strong> ${view.parentElement.querySelector('p').textContent}`

                if(view.parentElement.querySelector('p').textContent == data[i].description){
                    category.innerHTML = `<strong style="color: red; font-weight: 800; font-size: 20px;">Category:- </strong> ${data[i].category}`
                    rating.innerHTML = `<strong style="color: red; font-weight: 800; font-size: 20px;">Rating:- </strong> ${data[i].rating.rate}`
                    openArea.querySelector('img').src = data[i].image
                }
            })
        })
    }

    let addToCartCollec = collection(db, "NewCart");
document.querySelectorAll('.add_to_cart').forEach(btn => {
    btn.addEventListener('click', async () => {
        document.querySelector('.cartPopUp').style.display = 'flex';
        setTimeout(() => {
            document.querySelector('.cartPopUp').style.display = 'none';
        }, 1000)
        try {
            const currentUser = sessionStorage.getItem('displayName');
            const docRef = await addDoc(addToCartCollec, {
                ref: btn.parentElement.querySelector('.item_title').innerHTML,
                user: currentUser
            });
            getDocuments();
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    });
});


    async function getDocuments() {
        document.querySelector('.cart').innerHTML = '<div class="cartTop"><h1>Shopping Cart</h1></div>'
        const querySnapshot = await getDocs(addToCartCollec);
        querySnapshot.forEach((doc) => {
        for(let j = 0; j < data.length; j++){
            if(doc.data().user == sessionStorage.getItem('displayName')){
                if(doc.data().ref == data[j].title){
                    document.querySelector('.cart').innerHTML += `<div class="cartRow"><img src="${data[j].image}" alt="">
                        <p>${doc.data().ref}</p>
                        <button class="deleteCart" id="${doc.id}">Delete</button></div>`;
                        }
            }
        }
        });
        document.querySelectorAll('.deleteCart').forEach(dlt => {
            dlt.addEventListener('click', deleteCart)
        })
    }
    getDocuments()

    async function deleteCart() {
        let id = this.id;
        let docCollection = doc(db, 'NewCart', id)
        await deleteDoc(docCollection);
        getDocuments()

    }

}


openArea.querySelector('.fa-xmark').addEventListener('click', ()=> {
    openArea.style.display = 'none'
    document.querySelector('.all').style.display = 'block'
})

fetchUrl();

window.addEventListener('scroll', () => {
    if(window.pageYOffset > 450){
        document.querySelector('.fa-angle-up').style.transform = 'scale(1)'
        setTimeout(() =>{
        document.querySelector('.fa-angle-up').style.right = 10 + 'px'
        }, 200)
    }else{
        document.querySelector('.fa-angle-up').style.transform = 'scale(0)'
        document.querySelector('.fa-angle-up').style.right = 0 + 'px'
    }
})
}catch(err){
    console.log(err);
}

document.querySelector('.fa-shopping-bag').addEventListener('click', () => {
    document.querySelector('.cart').classList.toggle('showCart');
    if(document.querySelector('.cart').classList.contains('showCart')){
        document.querySelector('.fa-shopping-bag').style.background = '#ccc'
        document.querySelector('.fa-shopping-bag').style.color = '#000'
    }else{
        document.querySelector('.fa-shopping-bag').style.background = '#000000ab'
        document.querySelector('.fa-shopping-bag').style.color = '#ccc'
    }
})

document.querySelector('.fa-bars').addEventListener('click', () => {
    let nav = document.querySelector('nav ul');
    nav.classList.toggle('show')
    if(nav.classList.contains('show')){
        document.querySelector('.fa-bars').classList.add('fa-xmark')
    }else{
        document.querySelector('.fa-bars').classList.remove('fa-xmark')
    }
})

document.querySelector('.fa-right-from-bracket').addEventListener('click', sweetAlert)


function sweetAlert() {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
      });
      swalWithBootstrapButtons.fire({
        title: "Do you want to log out?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "yes i want",
        cancelButtonText: "No I don't want to!",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
            location.href = 'index.html'
            sessionStorage.removeItem('displayName')
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            icon: "error"
          });
        }
      });
}


document.querySelector('.nav1 span').innerHTML = `<strong style="font-weight: 700;">User: </strong>${sessionStorage.getItem('displayName')}`