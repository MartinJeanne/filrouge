let request = new XMLHttpRequest();
request.open('GET', 'https://raw.githubusercontent.com/MartinJeanne/filrouge/master/data.json?token=ALCV2QQTAXNUWI2SWS7DUGLBPAOV4');
request.responseType = 'text';
request.send();

request.onload = function () {
	const data = JSON.parse(request.response);
	//populateEmployees(data.employees);
	populateService(data.services, data.employees, data.softs)
}

function populateEmployees(employees) {
	for (let i = 0; i < employees.length; i++) {
		let myArticle = document.createElement('article');
		let myH2 = document.createElement('h4');
		let myP = document.createElement('p');

		myH2.textContent = employees[i].name;
		myP.textContent = employees[i].service;

		myArticle.appendChild(myH2);
		myArticle.appendChild(myP);

		document.getElementById('employees').appendChild(myArticle);
	}
}

function populateService(services, employees, softs) {
	for (let i = 0; i < services.length; i++) {
		let article = document.createElement('article');
		let h2 = document.createElement('h2');
		let div = document.createElement('div');

		let divEmployees = document.createElement('div');
		let divTitleEmployees = document.createElement('div');
		let h3Employees = document.createElement('h3');
		let countEmployees = document.createElement('p');
		let ulEmployees = document.createElement('ul');

		let divSofts = document.createElement('div');
		let divTitleSofts = document.createElement('div');
		let h3Softs = document.createElement('h3');
		let countSofts = document.createElement('p');
		let ulSofts = document.createElement('ul');

		h2.textContent = services[i].name.charAt(0).toUpperCase() + services[i].name.slice(1);
		countEmployees.textContent = countSofts.textContent = 0;

		article.setAttribute("id", services[i].name);
		article.appendChild(h2);
		article.appendChild(div);
		div.appendChild(divEmployees);
		div.appendChild(divSofts);
		div.setAttribute("class", 'serviceChild');

		divEmployees.appendChild(divTitleEmployees)
		divEmployees.appendChild(ulEmployees);
		divEmployees.setAttribute('class', 'divEmployees');
		divTitleEmployees.appendChild(h3Employees);
		divTitleEmployees.appendChild(countEmployees);
		countEmployees.setAttribute("id", services[i].name + 'EmployeesCount');
		ulEmployees.setAttribute("id", services[i].name + 'EmployeesList');
		h3Employees.textContent = "Employees :";

		divSofts.appendChild(divTitleSofts)
		divSofts.appendChild(ulSofts);
		divSofts.setAttribute('class', 'divSofts');
		divTitleSofts.appendChild(h3Softs);
		divTitleSofts.appendChild(countSofts);
		countSofts.setAttribute("id", services[i].name + 'SoftsCount');
		ulSofts.setAttribute("class", services[i].habilitations);
		h3Softs.textContent = "Softwares :"

		document.getElementById('services').appendChild(article);
	}

	for (let i = 0; i < employees.length; i++) {
		let li = document.createElement('li');

		li.textContent = employees[i].name;

		document.getElementById(employees[i].service + 'EmployeesCount').textContent++;
		document.getElementById(employees[i].service + 'EmployeesList').appendChild(li);
	}

	const divSofts = document.querySelectorAll('.divSofts');
	for (let i = 0; i < softs.length; i++) {
		for (let y = 0; y < divSofts.length; y++) {
			let softsUl = divSofts[y].children[1];
			let softCount = divSofts[y].children[0].children[1];
			if (softsUl.className.includes(softs[i].type) || softsUl.className == '*') {
				let li = document.createElement('li');
				li.textContent = softs[i].name;
				softsUl.appendChild(li);
				softCount.textContent++;
			}
		}
	}
}