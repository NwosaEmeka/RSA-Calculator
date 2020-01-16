const pandqerror = document.querySelector('.pandqerror'); //error meesage for p and q
const errore = document.querySelector('.errore'); //error for wrong e
const ptexterror = document.querySelector('.ptexterror');
const btn_calc = document.querySelector('.btn-calc'); // calcualte N button
const findN = document.querySelector('#findN'); // hold the result of N
const getR = document.querySelector('#getR');
const p = document.querySelector('#p'); //p
const q = document.querySelector('#q'); //q
const ValuesofE = document.querySelector('#ValuesofE'); //all possible value of e
const getE = document.querySelector('#getE'); //Get user input  for e
const setD = document.querySelector('#setD'); //set the calculated value of d
let Errormsg; // for error message

// Add Event Listiner
btn_calc.addEventListener('click', Allcalculation);

//Calculate N
function Allcalculation() {
	const pvalue = parseInt(p.value);
	const qvalue = parseInt(q.value);

	//check if p and q are prime numbers
	if (isPrime(pvalue) == true && isPrime(qvalue) == true && pvalue !== qvalue) {
		//calculate for N
		const n = pvalue * qvalue; // Calculate N
		findN.value = `${pvalue} * ${qvalue} = ${n}`;

		//caluslate for theta of n
		const r = (pvalue - 1) * (qvalue - 1); // calculate theta on n
		getR.value = `(${pvalue}-1) * (${qvalue}-1) = ${r}`;

		//Get all possible values of e
		let possibleE = getAlle(r);
		ValuesofE.value = possibleE;

		//get value of e from user and check if it's a relative prime with theta(N)
		getE.addEventListener('keyup', function() {
			//check if entered e is in the possible Es or if gcd of th E and r = 1
			const e = parseInt(getE.value);
			if (possibleE.includes(e) && e < r) {
				//calculate d
				const d = calcD(e, r);
				setD.value = d;

				//set the public key
				const publicKey = document.querySelector('#publicKey'); // set the public key
				publicKey.value = `{ ${e} , ${n} }`;

				//set private Key
				const privateKey = document.querySelector('#privateKey'); // set the public key
				privateKey.value = `{ ${d} , ${n} }`;

				//Message Encryption
				const msg = document.querySelector('#msg'); // Message to emcrypt
				const btn_encrypt = document.querySelector('.btn-encrypt'); //button for encryption

				btn_encrypt.addEventListener('click', encryptMsg);

				function encryptMsg() {
					let plainMsg = parseInt(msg.value);
					if (typeof plainMsg === 'number' && plainMsg < n) {
						//base = plainMsg
						//exponent = d
						// modulus = n
						let C = calculateCipher(plainMsg, d, n);

						document.querySelector(
							'#plainResult'
						).innerHTML = `${plainMsg} <sup>${d}</sup>(mod ${n}) = ${C}`;
					} else {
						errorMsg = `please enter an integer number less than ${n}`;
						displayError(ptexterror, errorMsg);
					}
				}
			} else {
				errorMsg = `${e} is not relatively prime of ${r}`;
				displayError(errore, errorMsg);
			}
		});
	} else {
		errorMsg = `check if p and q are distinct and prime numbers`;
		displayError(pandqerror, errorMsg);
	}
}

//Calculate and return all possible value of e
function getAlle(num) {
	let result_e = [];
	for (let i = 2; i < num; i++) {
		if (gcd_of(num, i) === 1) {
			result_e.push(i);
		}
	}
	return result_e;
}

//Calculate the GCD of each pair
function gcd_of(x, y) {
	x = Math.abs(x);
	y = Math.abs(y);
	while (y) {
		var t = y;
		y = x % y;
		x = t;
	}
	return x;
}
//calucate prime
function isPrime(num) {
	let flag;
	if (num === 2) {
		return true;
	} else {
		for (let i = 2; i <= Math.sqrt(num); i++) {
			if (num % i === 0) {
				flag = 1;
				break;
			}
		}
		// if (flag === 1) {
		// 	return false;
		// } else {
		// 	return true;
		// }
		return flag === 1 ? false : true;
	}
}

//calculate for d
function calcD(e, r) {
	let i = 1;
	while ((i * e) % r != 1) {
		i += 1;
	}
	return i;
}

//Calculate the cipherTex using Modular Exponentiation Calculator
function calculateCipher(base, exponent, modulus) {
	let result = 1;
	for (let i = 0; i < exponent; i++) {
		result = (result * base) % modulus;
	}
	return result;
}

//display error message
function displayError(elementName, message) {
	elementName.textContent = message;
	elementName.classList.add('errorMsg');
	//hide after 3 seconds
	setTimeout(hideError, 3000, elementName);
}

//Hide error message
function hideError(elementName) {
	elementName.classList.remove('errorMsg');
	elementName.textContent = '';
}
