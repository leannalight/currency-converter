const from_ammountEl = document.getElementById('from_ammount');
const to_currencyEl = document.getElementById('to_currency');
const to_ammountEl = document.getElementById('to_ammount');
 
/* корзина с выбранными товарами */
const selectedCart = [
    { price: 20 },
    { price: 45 },
    { price: 67 },
    { price: 1305 }
];

/* функция расчета общей цены товаров в корзине*/
function totalCart() {
    let totalCost = 0;
    for (let i in selectedCart) {
        totalCost += selectedCart[i].price;
    }
    return totalCost;
}

/* функцию расчета общей цены для каждого типа валюты */
function calculate() {
	const to_currency = to_currencyEl.value;
    from_ammountEl.value = totalCart(); // общая цена товаров в базовой валюте взята из функции выше
    
	// запрос к API с (базовой) долларовой валютой
	fetch(`https://api.exchangerate-api.com/v4/latest/${"USD"}`)
		.then(res => res.json())
		.then(res => {
        // получаем текущий курс для массива валют, которые у нас в списке опций
        const rate = res.rates[to_currency];
        // рассчитываем общую цену для каждого типа валюты
		to_ammountEl.value = (from_ammountEl.value * rate).toFixed(2);
	})
}

/* Обработчики событий*/
from_ammountEl.addEventListener('input', calculate);
to_currencyEl.addEventListener('change', calculate);
to_ammountEl.addEventListener('input', calculate);

calculate();