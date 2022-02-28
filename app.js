//    load data from server
const loadData = () => {
   const field = document.getElementById('search-field').value ;
  const url = ` https://openapi.programming-hero.com/api/phones?search=${field}`
    fetch(url)
     .then(res => res.json())
     .then(datas => displayData(datas.data))
}

// display phones 
const displayData = phones => {
    const resultsArea = document.getElementById('results-area')
    phones.forEach(phone => {
        console.log(phone)
          const div = document.createElement('div')
          div.classList.add('col-lg-4')
          div.classList.add('p-2')
          div.classList.add('mb-2')
            div.innerHTML = `
               <div class="card">
                        <img src="${phone.image}" id="phone-img" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h4 class="card-title"> Name :  ${phone.phone_name}</h4>
                        <h4 class="card-title">  Brand : ${phone.brand}</h4>
                        <button type="button" class="btn btn-primary" id="details-button">Details</button>
                     </div>
               </div>
            `
            resultsArea.appendChild(div)
    });
}