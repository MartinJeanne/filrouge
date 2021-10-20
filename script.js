let request = new XMLHttpRequest();
request.open('GET', 'https://raw.githubusercontent.com/MartinJeanne/filrouge/master/data.json?token=ALCV2QQTAXNUWI2SWS7DUGLBPAOV4');
request.responseType = 'text';
request.send();

request.onload = function () {
	const data = JSON.parse(request.response);
	console.log(data);
	populateEmployees(data.employees);
	populateSevervice(data.services, data.employees)
}

function populateEmployees(employees) {
	for (let i = 0; i < employees.length; i++) {
		const myArticle = document.createElement('article');
		const myH2 = document.createElement('h2');
		const myP = document.createElement('p');

		myH2.textContent = employees[i].name;
		myP.textContent = employees[i].service;

		myArticle.appendChild(myH2);
		myArticle.appendChild(myP);

		document.getElementById('employees').appendChild(myArticle);
	}
}

function populateSevervice(services,employees) {
	for (let i = 0; i < services.length; i++) {
		const myArticle = document.createElement('article');
		const myH2 = document.createElement('h2');
		const myP = document.createElement('p');
		const myUl = document.createElement('ul');

		myH2.textContent = services[i].name;
		myP.textContent = 0;
		myArticle.setAttribute("id", services[i].name);
		myArticle.appendChild(myH2);
		myArticle.appendChild(myP);
		myArticle.appendChild(myUl);

		document.getElementById('services').appendChild(myArticle);
	}

	for (let i = 0; i < employees.length; i++) {
		const myP = document.createElement('li');

		myP.textContent = employees[i].name;
		let count = document.querySelector("#" + employees[i].service + ">p").textContent++;
		document.querySelector("#" + employees[i].service + ">ul").appendChild(myP);
	}
}