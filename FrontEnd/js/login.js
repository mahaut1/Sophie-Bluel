
 /********************** LOGIN ***************************/
   // sessionStorage.clear();

   const loginForm = document.querySelector('#submit')
   const errorMsg = document.getElementById('errorMsg');
   loginForm.addEventListener('click', function(e){
       e.preventDefault();
       const user= {
           email:document.getElementById("email").value,
           password:document.getElementById("password").value
       
       };
      
       const newUser= JSON.stringify(user);
           fetch ('http://localhost:5678/api/users/login',  {
                   method:"POST",
                   mode:"cors",
                   headers: {
                       "Content-Type": "application/json",
                       "accept": "application/json",
                       'Access-Control-Allow-Origin':'*',
                       "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
                       "Access-Control-Allow-Headers": "origin, x-requested-with, content-type, Authorization"
                   },
                   body: newUser
               })
                  .then(response => response.json())
                  .then(data => {
                      let userId = data.userId;
                      if (userId == 1){
                          let token = data;
                          console.log('je suis connecté')
                          sessionStorage.setItem('token', token.token);
                          //redirection vers l'index.html
                          document.location.href="index.html";                      
                      }else{
                          let errorMsg = document.getElementById('errorMsg');
                          errorMsg.textContent="Identifiant ou mot de passe incorrect !";
                          if (!id.email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/g)) {
                            const p = document.createElement("p");
                            p.innerHTML = "Veuillez entrer une addresse mail valide";
                            loginEmailError.appendChild(p);
                            return;
                        }
                        // vérifcation du mot de passe
                        if (id.password.length < 5 && !id.password.match(/^[a-zA-Z0-9]+$/g)) {
                            const p = document.createElement("p");
                            p.innerHTML = "Veuillez entrer un mot de passe valide";
                            loginMdpError.appendChild(p);
                            return;
                        }
                      }
                      })
                     
                      .catch(error => {
                        errorMsg.textContent = "Une erreur s'est produite : " + errorMsg.textContent; // Affichez l'erreur dans l'élément HTML
                      
                  });
             
   })
 
/************** CREATION DE LA PAGE D'ADMINISTRATION  **********************/



