//    load data from server
const loadData = () => {
   const field = document.getElementById('search-field') 
   const fieldValue = field.value

   if(fieldValue.toLowerCase() === 'apple' || fieldValue.toLowerCase() === 'samsung' ||     fieldValue.toLowerCase() === 'oppo' || fieldValue.toLowerCase() === 'huawei' || fieldValue.toLowerCase() == 'iphone'){

      document.getElementById('errorMessage1').style.display='none'
      document.getElementById('errorMessage2').style.display='none'
      const url = ` https://openapi.programming-hero.com/api/phones?search=${fieldValue}`
      // console.log(url)
      fetch(url)
       .then(res => res.json())
       .then(datas => displayData(datas.data.slice(0,20)))

      // spinner display block
       document.getElementById('spinner-div').style.display = 'block'
   }
   else if(fieldValue === ''){
      // error message one
      document.getElementById('errorMessage1').style.display='block'
      // error message two
      document.getElementById('errorMessage2').style.display='none'

        // clean resultsArea value
      const resultsArea = document.getElementById('results-area')
      resultsArea.textContent = ''

      // clean show area
      const showArea = document.getElementById('showAll-area')
      showArea.textContent = ''

         //  clean details area value
      const detailsArea = document.getElementById('detalis-area')
      detailsArea.textContent=''

       // clean spinner 
       document.getElementById('spinner-div').style.display = 'none'

      //  show all button clean 
      const show = document.getElementById('allPhones-button')
      show.style.display='none'
   }
   else if(fieldValue.toLowerCase() !== 'apple' || fieldValue.toLowerCase() !== 'samsung' || fieldValue.toLowerCase() !== 'oppo' || fieldValue.toLowerCase() !== 'huawei' || fieldValue.toLowerCase() !== 'iphone'){
      // error message one
      document.getElementById('errorMessage1').style.display='none'
         // error message two
      document.getElementById('errorMessage2').style.display='block'
      field.value = ''
      // clean resultsArea 
      const resultsArea = document.getElementById('results-area')
      resultsArea.textContent = ''

      // clean show area
      const showArea = document.getElementById('showAll-area')
      showArea.textContent = ''

      //  clean details area 
      const detailsArea = document.getElementById('detalis-area')
      detailsArea.textContent=''

      // clean spinner 
      document.getElementById('spinner-div').style.display = 'none'

      //  show all button clean 
      const show = document.getElementById('allPhones-button')
      show.style.display='none'
   }
   
}

// display phones 
const displayData = phones => {
   //  console.log(phones)
    const resultsArea = document.getElementById('results-area')
    resultsArea.textContent=''
      const detailsArea = document.getElementById('detalis-area')
      detailsArea.textContent = ''
    phones?.forEach(phone => {
          const div = document.createElement('div')
          div.classList.add('col-lg-4')
          div.classList.add('p-2')
          div.classList.add('mb-2')
            div.innerHTML = `
               <div class="card card1">
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

                      // show all button area 
             document.getElementById('allPhones-button').style.display= 'block'    
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
     const detailsArea = document.getElementById('detalis-area')
      detailsArea.textContent=''
    
     const div = document.createElement('div')
     div.classList.add('col-lg-4')
     div.classList.add('p-2')
     div.classList.add('mb-2')
     div.innerHTML = `
             <div class="card">
                        <img src="${phones.image}" id="phone-img" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title"> Name : ${phones.name}</h5>
                        <h5 class="card-title">  Release Date : ${phones.releaseDate?phones.releaseDate:' No Release Date found'}</h5>

                        <h5 class="fw-bold">Main Feature :</h5>
                        <h6>RAM: ${phones.mainFeatures.memory.substr(6,4)}</h6>
                        <h6>Memory: ${phones.mainFeatures.storage.slice(0,5)}</h6>
                        <h6>Display Size: ${phones.mainFeatures.displaySize.slice(0,10)}</h6>

                        <h5 class="fw-bold">Sensor :</h5>
                      

                        <h5 class="fw-bold"> Other Feature :</h5>
                        <h6> Bluetooth: ${phones.others?.Bluetooth? phones.others.Bluetooth:'No'}</h6>
                        <h6>GPS: ${phones.others?.GPS?phones.others.GPS:'No'}</h6>
                        <h6>USB: ${phones.others?.USB?phones.others.USB:'No'}</h6>
                        <h6>NFC: ${phones.others?.NFC?phones.others.NFC:'No'}</h6>
                        <h6>Radio: ${phones.others?.Radio?phones.others.Radio:'No'}</h6>
                        <h6>WLAN: ${phones.others?.WLAN?phones.others.WLAN:'No'}</h6>
                 
                     </div>
               </div>
     `
     detailsArea.appendChild(div)
 }
//  show all button
 const showAllPhones = () => {
   const field = document.getElementById('search-field') 
   const fieldValue = field.value
   const url = ` https://openapi.programming-hero.com/api/phones?search=${fieldValue}`
   fetch(url)
    .then(res => res.json())
    .then(datas =>displayAll(datas.data.slice(20,100)))

    // clear field
    field.value = ''
}

// show all 
const displayAll = phoneArray => {
      const showArea = document.getElementById('showAll-area')
      const detailsArea = document.getElementById('detalis-area')
      detailsArea.textContent = ''
    phoneArray?.forEach(phone => {
       const div = document.createElement('div')
       div.classList.add('col-lg-4')
       div.classList.add('p-2')
       div.classList.add('mb-2')
         div.innerHTML = `
            <div class="card card1">
                     <img src="${phone.image}" id="phone-img" class="card-img-top" alt="...">
                 <div class="card-body">
                     <h4 class="card-title"> Name :  ${phone.phone_name}</h4>
                     <h4 class="card-title">  Brand : ${phone.brand}</h4>
                     <button type="button"  onclick = " detailsButton('${phone.slug}') " class="btn btn-primary" id="details-button">Details</button>
                  </div>
            </div>
         `
         showArea.appendChild(div)
})
    document.getElementById('allPhones-button').style.display= 'none'
}
