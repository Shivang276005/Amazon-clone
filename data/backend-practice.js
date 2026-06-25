/*
const xhr = new XMLHttpRequest();

xhr.addEventListener('load',()=>{
  console.log(xhr.response);
})

xhr.open('GET','https://supersimplebackend.dev');
xhr.send();

const xhr = new XMLHttpRequest();
xhr.addEventListener('load',()=>{
  console.log("XMLHttpRequest():");
  console.log(xhr.response);
})
xhr.open('GET','https://supersimplebackend.dev/greeting');
xhr.send();


async function fetchMsg(){
  const response = await fetch('https://supersimplebackend.dev/greeting');
  const msg = await response.text();
  console.log('Fetch request: ')
  console.log(msg)
}
fetchMsg();

async function fetchPost(){
  const msg = {name: "Shivang singh"};
  const response = await fetch('https://supersimplebackend.dev/greeting',{
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(msg)
  });

  const returnMsg = await response.text();
  console.log(returnMsg)
}
fetchPost();

async function fetchAmazon(){
  try {
    const response = await fetch('https://amazon.com');
    
    const data = await response.json();
    console.log(data);
  
  } catch (error) {
    console.log('CORS error: Your request was blocked by the backend')  
  }
}
fetchAmazon();


async function throwFetch() {
  try {
    
    const response = await fetch('https://supersimplebackend.dev',{
      method: 'POST',
      headers:{
        'content-type':'application/json'
      }
    })
    if(response.status >= 400){
      throw response;
    }
    const data = await response.json();
    console.log(data);
  
  } catch (error) {
    if(error.status === 400){
      console.log(await error.json())
    }else{
      console.log('Network Error: Please try again later')
    }
  }
}
throwFetch();
*/