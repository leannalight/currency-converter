const from_ammountEl = document.getElementById('from_ammount');
const to_currencyEl = document.getElementById('to_currency');
const to_ammountEl = document.getElementById('to_ammount');
 
const selectedCart = [
    { price: 20 },
    { price: 45 },
    { price: 67 },
    { price: 1305 }
];

function totalCart() {
    let totalCost = 0;
    for (let i in selectedCart) {
        totalCost += selectedCart[i].price;
    }
    return totalCost;
}
 
function calculate() {
	const to_currency = to_currencyEl.value;
	from_ammountEl.value = totalCart();
	
	fetch(`https://api.exchangerate-api.com/v4/latest/${"USD"}`)
		.then(res => res.json())
		.then(res => {
		const rate = res.rates[to_currency];
		to_ammountEl.value = (from_ammountEl.value * rate).toFixed(2);
	})
}

from_ammountEl.addEventListener('input', calculate);
to_currencyEl.addEventListener('change', calculate);
to_ammountEl.addEventListener('input', calculate);

calculate();