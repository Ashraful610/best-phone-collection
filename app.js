//    load data from server
const loadData = () => {
   const field = document.getElementById('search-field') 
   const fieldValue = field.value
   document.getElementById('spinner-div').style.display = 'block'
  const url = ` https://openapi.programming-hero.com/api/phones?search=${fieldValue}`
    fetch(url)
     .then(res => res.json())
     .then(datas => displayData(datas.data))

     // field clean 
     field.value = ''

}

// display phones 
const displayData = phones => {
    // console.log(phones)
    const resultsArea = document.getElementById('results-area')
      resultsArea.textContent = ''
      const detailsArea = document.getElementById('detalis-area')
      detailsArea.textContent = ''
    phones.forEach(phone => {
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
                        <button type="button"  onclick = " detailsButton('${phone.slug}') " class="btn btn-primary" id="details-button">Details</button>
                     </div>
               </div>
            `
            resultsArea.appendChild(div)
                 // spinner none
                    document.getElementById('spinner-div').style.display = 'none'
    });
}
 
// details button
const detailsButton = detail => {
    const url = `  https://openapi.programming-hero.com/api/phone/${detail}`
    fetch(url)
     .then(res => res.json())
     .then(datas => loadDetails(datas.data))
}

// phone Details
 const loadDetails = phones => {
    //  console.log(phones)
     const detailsArea = document.getElementById('detalis-area')
     const div = document.createElement('div')
     div.classList.add('col-lg-4')
     div.classList.add('p-2')
     div.classList.add('mb-2')
     div.innerHTML = `
             <div class="card">
                        <img src="${phones.image}" id="phone-img" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title"> Name : ${phones.name}</h5>
                        <h5 class="card-title">  Release Date : ${phones.releaseDate}</h5>
                        <h5 class="fw-bold">Main Feature :</h5>
                        
                        <h6>RAM: ${phones.mainFeatures.memory.substr(6,4)}</h6>
                        <h6>Memory: ${phones.mainFeatures.storage.slice(0,5)}</h6>
                        <h6>Display Size: ${phones.mainFeatures.displaySize.slice(0,10)}</h6>

                        <h5 class="fw-bold"> Other Feature :</h5>
                        <h6> Bluetooth: ${phones.others.Bluetooth}</h6>
                        <h6>GPS: ${phones.others.GPS.slice(0,15)}</h6>
                        <h6>USB: ${phones.others.USB}</h6>
                        <h6>Radio: ${phones.others.Radio}</h6>
                        <h6>WLAN: ${phones.others.WLAN}</h6>
                 
                     </div>
               </div>
     `
     detailsArea.appendChild(div)
       
    //  const allSensors = () => {
    //      const sensors = phones.mainFeatures.sensors
    //       for(const sensor of sensors){
    //       console.log(sensor)
    //   }}
    
 }
