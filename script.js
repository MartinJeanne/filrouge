let request = new XMLHttpRequest();
request.open('GET', 'https://raw.githubusercontent.com/MartinJeanne/filrouge/master/data.json?token=ALCV2QQTAXNUWI2SWS7DUGLBPAOV4');
request.responseType = 'text';
request.send();

request.onload = function () {
	const data = JSON.parse(request.response);
	console.log(data);
	//populateEmployees(data.employees);
	populateService(data.services, data.employees)
}

function populateEmployees(employees) {
	for (let i = 0; i < employees.length; i++) {
		const myArticle = document.createElement('article');
		const myH2 = document.createElement('h4');
		const myP = document.createElement('p');

		myH2.textContent = employees[i].name;
		myP.textContent = employees[i].service;

		myArticle.appendChild(myH2);
		myArticle.appendChild(myP);

		document.getElementById('employees').appendChild(myArticle);
	}
}

function populateService(services,employees) {
	for (let i = 0; i < services.length; i++) {
		const article = document.createElement('article');
		const h2 = document.createElement('h2');
		const div = document.createElement('div');

		const divEmployees = document.createElement('div');
		const divTitleEmployees = document.createElement('div');
		const h3Employees = document.createElement('h3');
		const countEmployees = document.createElement('p');
		const ulEmployees = document.createElement('ul');

		const divsofts = document.createElement('div');
		const divTitleSofts = document.createElement('div');
		const h3Softs = document.createElement('h3');
		const countSofts = document.createElement('p');
		const ulSofts = document.createElement('ul');

		h2.textContent = services[i].name.charAt(0).toUpperCase() + services[i].name.slice(1);
		countEmployees.textContent = countSofts.textContent = 0;

		article.setAttribute("id", services[i].name);
		article.appendChild(h2);
		article.appendChild(div);
		div.appendChild(divEmployees);
		div.appendChild(divsofts);

		divEmployees.appendChild(divTitleEmployees)
		divEmployees.appendChild(ulEmployees);
		divTitleEmployees.appendChild(h3Employees);
		divTitleEmployees.appendChild(countEmployees);
		divEmployees.setAttribute("class", 'serviceChild');
		countEmployees.setAttribute("id", services[i].name + 'Count');
		ulEmployees.setAttribute("id", services[i].name + 'List');
		h3Employees.textContent = "Employees :";

		divsofts.appendChild(divTitleSofts)
		divsofts.appendChild(ulSofts);
		divTitleSofts.appendChild(h3Softs);
		divTitleSofts.appendChild(countSofts);
		divsofts.setAttribute("class", 'serviceChild');
		countSofts.setAttribute("id", services[i].name + 'Count');
		ulSofts.setAttribute("id", services[i].name + 'List');
		h3Softs.textContent = "Softwares :"
		
		document.getElementById('services').appendChild(article);
	}

	for (let i = 0; i < employees.length; i++) {
		const p = document.createElement('li');

		p.textContent = employees[i].name;
		document.getElementById(employees[i].service + 'Count').textContent++;
		document.getElementById(employees[i].service + 'List').appendChild(p);
	}
}