   // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyDlmWHH0CcUff5CvpQIOTd7auxrpkxB75Y",
    authDomain: "plastrack-login-form.firebaseapp.com",
    projectId: "plastrack-login-form",
    storageBucket: "plastrack-login-form.appspot.com",
    messagingSenderId: "388777565381",
    appId: "1:388777565381:web:6f201b617746455b9124ac",
    measurementId: "G-5PH8K66169"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

	const auth = firebase.auth();
	
		
	
	auth.onAuthStateChanged(function(user){
		
		if(user){
			var email = user.email;
			//alert("Welcome user " + email);
			//$( "div.demo-stuff" ).html(function() {
		  	//return email;
			//});
			$( ".demo-stuff" ).append(email);
			document.getElementById("sign-in-container").style.visibility = "hidden";
			 document.getElementById('username').innerHTML = email;
			document.getElementById("sign-out-container").style.visibility = "visible";
		} else{
			document.getElementById("sign-out-container").style.visibility = "hidden";
			document.getElementById("sign-in-container").style.visibility = "visible";
		}
		
	});
	
	function signUp(){
		
		var email = document.getElementById("email");
		var password = document.getElementById("password");
		
		const promise = auth.createUserWithEmailAndPassword(email.value, password.value);
		promise.catch(e => alert(e.message));
		
		alert("Signed Up");
	}
	
	function signIn(){
		
		var email = document.getElementById("email");
		var password = document.getElementById("password");
		
		const promise = auth.signInWithEmailAndPassword(email.value, password.value);
		promise.catch(e => alert(e.message));
		alert("Signed In");

	}
	
	
	function signOut(){
		auth.signOut();
		alert("Signed Out");
		
	}

