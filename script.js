let request = new XMLHttpRequest();
request.open('GET', 'https://raw.githubusercontent.com/MartinJeanne/filrouge/master/data.json?token=ALCV2QXSNI76Y6J4PDUQJ6DBQIW3S');
request.responseType = 'text';
request.send();

request.onload = function () {
	const data = JSON.parse(request.response);
	populateServices(data.services);
	populateEmployees(data.employees);
	populateSofts(data.softs);
	useOfSoftware(data.softs);
	licenceDashboard(data.licence);
}

function populateServices(services) {
	services.forEach(service => {
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

		h2.textContent = service.name.charAt(0).toUpperCase() + service.name.slice(1);
		countEmployees.textContent = countSofts.textContent = 0;

		article.setAttribute("id", service.name);
		article.appendChild(h2);
		article.appendChild(div);
		div.appendChild(divEmployees);
		div.appendChild(divSofts);
		div.setAttribute("class", 'servicesChild');

		divEmployees.appendChild(divTitleEmployees)
		divEmployees.appendChild(ulEmployees);
		divEmployees.setAttribute('class', 'divEmployees');
		divTitleEmployees.appendChild(h3Employees);
		divTitleEmployees.appendChild(countEmployees);
		countEmployees.setAttribute("class", 'employeesCount');
		ulEmployees.setAttribute("class", 'employeesList');
		h3Employees.textContent = "Employees :";

		divSofts.appendChild(divTitleSofts)
		divSofts.appendChild(ulSofts);
		divSofts.setAttribute('class', 'divSofts');
		divTitleSofts.appendChild(h3Softs);
		divTitleSofts.appendChild(countSofts);
		countSofts.setAttribute("class", 'softsCount');
		ulSofts.setAttribute("class", service.habilitations);
		h3Softs.textContent = "Softwares :"

		document.getElementById('services').appendChild(article);
	});
}

function populateEmployees(employees) {
	employees.forEach(employee => {
		let li = document.createElement('li');
		li.textContent = employee.name;
		let count = document.querySelector('#' + employee.service).querySelector('.employeesCount');
		let list = document.querySelector('#' + employee.service).querySelector('.employeesList');
		count.textContent++;
		list.appendChild(li);
	});
}

function populateSofts(softs) {
	const divSofts = document.querySelectorAll('.divSofts');
	softs.forEach(soft => {
		divSofts.forEach(divSoft => {
			let softsUl = divSoft.querySelector('ul');
			let softCount = divSoft.querySelector('.softsCount');
			if (softsUl.className.includes(soft.type) || softsUl.className == '*') {
				let li = document.createElement('li');
				li.textContent = soft.name;
				softsUl.appendChild(li);
				softCount.textContent++;
			}
		});
	});
}

function useOfSoftware(softs) {
	const servicesChild = document.querySelectorAll('.servicesChild');
	const table = document.getElementById("softsUseT");
	softs.forEach(soft => {
		let tr = document.createElement('tr');
		let tdName = document.createElement('td');
		let tdCount = document.createElement('td');
		tdCount.setAttribute('id', soft.name + 'Use')
		tdName.textContent = soft.name;
		tr.appendChild(tdName);
		tr.appendChild(tdCount);
		table.appendChild(tr);
		servicesChild.forEach(serviceChild => {
			let softsUl = serviceChild.querySelector('.divSofts').querySelector('ul');
			let employeesCount = serviceChild.querySelector('.divEmployees').querySelector('.employeesCount');
			if (softsUl.className.includes(soft.type) || softsUl.className == '*') {
				tdCount.textContent = Number(tdCount.textContent) + Number(employeesCount.textContent);
			}
		});
	});
}

function licenceDashboard(licences) {
	const tableN = document.getElementById("licenceNeededT");
	const tableO = document.getElementById("licenceOverflowT");
	licences.forEach(licence => {
		let tr = document.createElement('tr');
		let tdName = document.createElement('td');
		let tdCount = document.createElement('td');
		tdName.textContent = licence.name;
		tdCount.setAttribute('id', licence.name + 'Need')
		tr.appendChild(tdName);
		tr.appendChild(tdCount);
		tableN.appendChild(tr);

		let softUse = document.getElementById(licence.name + 'Use');
		var needed;
		var overflow;
		if (softUse) {
			needed = Number(softUse.textContent) - licence.count;
			if (needed < 0) {
				overflow = -needed;
				tdCount.setAttribute('id', licence.name + 'Overflow')
				tdCount.textContent = overflow;
				tr.appendChild(tdName);
				tr.appendChild(tdCount);
				tableO.appendChild(tr);
			}
		}
		if (overflow) tdCount.textContent = overflow;
		else tdCount.textContent = needed;
	});
}