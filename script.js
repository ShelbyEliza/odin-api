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

	message.textContent = randomWord;

	getGif(randomWord);
});

searchBtn.addEventListener('click', (e) => {
	e.preventDefault();
	const formData = new FormData(formEl);
	let searchData = formData.get('search');
	if (searchData !== '') {
		message.textContent = '';
		getGif(searchData);
	} else {
		img.src = missingURL;
		message.textContent = 'Invalid search term. Please try another word.';
	}
});

function getGif(searchWord) {
	let search_URL = base_URL + searchWord;

	fetch(search_URL, { mode: 'cors' })
		.then(function (response) {
			return response.json();
		})
		.then(function (response) {
			img.src = response.data.images.original.url;
		})
		.catch(() => {
			message.textContent =
				'Error! Either API key is incorrect or not gifs found for that search term. Refresh to enter a new API Key.';
		});
}
