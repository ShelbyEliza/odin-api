const missingURL = '../images/question_mark.jpg';
const img = document.querySelector('img');
const randomBtn = document.getElementById('random-btn');
const searchBtn = document.getElementById('search-btn');
const formEl = document.getElementById('search-form');
const message = document.getElementById('message');
let key = window.prompt('Giphy API Key:');

const base_URL = 'https://api.giphy.com/v1/gifs/translate?api_key=' + key + '=';

const randomWords = ['cats', 'dogs', 'breakfast', 'school', 'dancing', 'sick'];

randomBtn.addEventListener('click', (e) => {
	e.preventDefault();
	formEl.reset();
	let randomWord = randomWords[Math.floor(Math.random() * randomWords.length)];

	message.hidden = false;
	message.textContent = randomWord;

	getGif(randomWord);
});

searchBtn.addEventListener('click', (e) => {
	e.preventDefault();
	const formData = new FormData(formEl);
	let searchData = formData.get('search');
	if (searchData !== '') {
		message.textContent = '';
		message.hidden = true;

		getGif(searchData);
	} else {
		img.src = missingURL;
		message.hidden = false;
		message.textContent = 'Invalid search term. Please try another word.';
	}
});

async function getGif(searchWord) {
	let search_URL = base_URL + searchWord;

	try {
		let res = await fetch(search_URL, { mode: 'cors' });
		res = await res.json();
		img.src = res.data.images.original.url;
	} catch {
		message.hidden = false;

		message.textContent =
			'Error! Either API key is incorrect or not gifs found for that search term. Refresh to enter a new API Key.';
	}
}
