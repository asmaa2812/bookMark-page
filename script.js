var site = document.getElementById('nameInput');
var address = document.getElementById('urlInput');
var search = document.getElementById('searchInput');
var submit = document.getElementById('btnSubmit');
var counter=0;
     
if(localStorage.getItem('allSite')==null){
  var siteContainer=[]
}
else{
  siteContainer=JSON.parse(localStorage.getItem('allSite'))
    displaySite()
}

submit.onclick=function(){
 if(validateSite()==true){
  if(submit.innerHTML=='submit'){
    createSite()
  }
  else{
    updateSite()
  }
  // localStorage.setItem('allSite',JSON.stringify(siteContainer) )
  //  clearSite()
  //  displaySite() 
 }
 else{
  alert('insert valid name')
 }
}
//create
function createSite(){
   var website=
   {
    siteName:site.value,
    siteAddress:address.value
   }
   siteContainer.push(website)
   console.log(siteContainer)
   localStorage.setItem('allSite',JSON.stringify(siteContainer) )
   clearSite()
   displaySite() 
}

//clear
function clearSite(){
  site.value = '';
  address.value = '';  
}

//display

 function displaySite(){
  // var x='<input onkeyup="searchSite()" type="search" class="form-control my-3 w-75 mx-auto" id="searchInput" placeholder="search...">'
   var trs='';
  for(var i=0; i<siteContainer.length; i++){
    trs+=`
    <tr >
    <td>${siteContainer[i].siteName}</td>
    <td><button  class="btn btn-success">visit</button></td>
    <td><button onclick="siteInfo(${i})" class="btn btn-warning">up date</button></td>
    <td><button onclick="deleteSite(${i})" class="btn btn-danger">delete</button></td>
    </tr>`
  }
document.getElementById('tablebody').innerHTML=trs;
//  document.getElementById('box').innerHTML=x;
}

//delete
function deleteSite(index){
    siteContainer.splice(index,1)
    console.log(siteContainer)
    localStorage.setItem('allSite',JSON.stringify(siteContainer))
    displaySite()
}

//search
function searchSite(){
  var trs='';
  for(var i=0; i<siteContainer.length; i++){
    if(siteContainer[i].siteName.toLowerCase().includes(search.value.toLowerCase())){
      trs+=`
      <tr >
      <td>${siteContainer[i].siteName}</td>
      <td><button  class="btn btn-success">visit</button></td>
      <td><button onclick="siteInfo(${i})" class="btn btn-warning">up date</button></td>
      <td><button onclick="deleteSite(${i})" class="btn btn-danger">delete</button></td>
      </tr>`
    }
  }
  // console.log(trs);
document.getElementById('tablebody').innerHTML=trs;
  // alert('search')
}

//update
function siteInfo(index){
  counter=index;
  site.value=siteContainer[index].siteName
  address.value=siteContainer[index].siteAddress
  submit.innerHTML='update site'
  // alert('update')
}

function updateSite(){
  var website=
  {
   siteName:site.value,
   siteAddress:address.value
  }
  siteContainer[counter]=website;
  submit.innerHTML='submit'
  clearSite()
  localStorage.setItem('allSite',JSON.stringify(siteContainer))
  displaySite()
  // alert('update')
}

//validation
function validateSite(){
  var nameRegex=/^[A-Z][a-z]{3,9}/
  var siteName=site.value
  if(nameRegex.test(siteName)==true){
    return true
  }
  else{
    return false
  }
}