window.addEventListener('load', function(){

  
  document.getElementById('checkbox').
  addEventListener('click', function(event){
    const isChecked = document.getElementsByName('checkbox')[0].checked;
        const selectMenu = document.getElementsByClassName('custom-select')[0];
          if(isChecked){
            selectMenu.classList.remove("hidden")

          }else{
            selectMenu.classList.add("hidden") 
          }
    
  })
  document.getElementById('submit-btn').
  addEventListener('click', function(){
      const form = document.getElementById('user-form').elements;
      if (isFormValid(form)){
          let userList = localStorage.userList;

        if (userList){
          userList = JSON.parse(userList);
        } else {
          userList = [];
        }
        

        const isChecked = document.getElementsByName('checkbox')[0].checked
      
        const user = {
          username: form.namedItem('username').value,
          email: form.namedItem('email').value,
          checkbox: isChecked ? 'on' : 'off',
          select: form.namedItem('select').value,
        };
      
        console.log(isChecked);
        const userId = form.namedItem('user-id').value;
          if (userId){
            userList[userId] = JSON.stringify(user);

          } else{
           userList.push(JSON.stringify(user));
          }


       
        localStorage.userList = JSON.stringify(userList);
        renderTable();

        console.log('can be saved')
      

      }else{
        console.log('form not valid')

      }

  });
  function isFormValid(form){
      let isFormValid = true;

const errorMsgBlocks = document.getElementsByClassName('error-msg');
Object.values(errorMsgBlocks).forEach(function(block){
  block.innerHTML = '';

})

      const username = form.namedItem('username').value;
      console.log(username);
      
      if (username.length<6){
        
       const errorMsg =  document.getElementsByClassName('error-msg username')[0]
       errorMsg.innerHTML = 'Min 6 characters for username';
        isFormValid = false;
      }

      const email = form.namedItem('email').value;
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (!re.test(email)){
        const errorMsg =  document.getElementsByClassName('error-msg email')[0]
        errorMsg.innerHTML = 'Not a valid email';
         isFormValid = false;

      }
      
    

      return isFormValid;
  }

  document.getElementById('submit-btn').
  addEventListener('click', function(){
      const form = document.getElementById('user-form').elements;
      if (isFormValid(form)){
        var modal = document.getElementById("myModal");
        var span = document.getElementsByClassName("close")[0];

          
            modal.style.display = "block";
            var username = form.namedItem('username').value;
            document.getElementById("msg").innerHTML= username + ", you have successfully entered your data. ";

          span.onclick = function() {
            modal.style.display = "none";
            }
          window.onclick = function(event) {
            if (event.target == modal) {
              modal.style.display = "none";
            }
          }
      }
  })

  function renderTable(){
    const table = document.getElementById('users-table');
    const tBody = table.getElementsByTagName('tbody')[0];
    tBody.innerHTML = '';
    const usersList = localStorage.userList ? JSON.parse(localStorage.userList) : [];
    

     usersList.forEach(function(user, index){
        user = JSON.parse(user)
       tBody.innerHTML+=`
       <tr>
        <td>` +index+ `</td>
        <td>` +user.username+ `</td>
        <td>` +user.email+`</td>
        <td>` +user.checkbox+ `</td>
        <td>` +user.select+ `</td>
        <td>
          <button class = "delete-btn" user-id = `+index+`>Delete</button>
        </td>
        
        </tr>`;
       
     })
     

      const deleteBtns = document.getElementsByClassName('delete-btn');
      Object.values(deleteBtns).forEach(function(btn){
          btn.addEventListener('click', function(e){
          const userId = e.target.getAttribute('user-id');
          const userList = JSON.parse(localStorage.userList);

          userList.splice(userId, 1);
        
          localStorage.userList = JSON.stringify(userList);

        renderTable();
        
      })
     })
    }
      
  
     renderTable()





})