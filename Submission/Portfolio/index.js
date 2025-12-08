const projectItems = [
	{
		Title: "My First Project",
		URL: "First Project",
		Description:
			"This was cool project where I did cool thing and I received cool rewards for doing said cool things to win an award",
	},
	{
		Title: "My Second Project",
		URL: "Second Project",
		Description:
			"This was cool project where I did cool thing and I received cool rewards for doing said cool things to win an award",
	},
	{
		Title: "My Third Project",
		URL: "Third Project",
		Description:
			"This was cool project where I did cool thing and I received cool rewards for doing said cool things to win an award",
	},
];

const projectsDiv = document.getElementById("projects-div");

const Ul = document.createElement("ul");
Ul.setAttribute("id", "projects-ul");
projectsDiv.appendChild(Ul);
const projectsUl = document.getElementById("projects-ul");

projectItems.forEach((projectItem) => {
	const titleText = projectItem.Title;
	const urlText = projectItem.URL;
	const descriptionText = projectItem.Description;

	const projectLi = document.createElement("li");
	projectLi.classList.add("project");

	const titleHeader = document.createElement("header");
	titleHeader.textContent = titleText;

	const urlLink = document.createElement("a");
	urlLink.setAttribute("href", "#");
	urlLink.setAttribute("target", "_blank");
	urlLink.textContent = urlText;

	const descriptionP = document.createElement("p");
	descriptionP.textContent = descriptionText;

	projectsUl.appendChild(projectLi);
	projectLi.appendChild(titleHeader);
	projectLi.appendChild(urlLink);
	projectLi.appendChild(descriptionP);
});
