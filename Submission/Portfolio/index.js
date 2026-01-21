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
	urlLink.setAttribute("href", "project.html");
	urlLink.setAttribute("target", "_blank");
	urlLink.textContent = urlText;

	const descriptionP = document.createElement("p");
	descriptionP.textContent = descriptionText;

	projectsUl.appendChild(projectLi);

	projectsUl.addEventListener("click", () => {
		projectsUl.classList.toggle("active");
		projectLi.classList.toggle("active");
	});

	projectLi.appendChild(titleHeader);
	projectLi.appendChild(urlLink);
	projectLi.appendChild(descriptionP);
});

class DatabaseObject {
	toString() {
		throw new Error("Not implented");
	}
}

class Testimonial extends DatabaseObject {
	constructor(params) {
		super();
		const { comment, author, rating } = params;
		this.comment = comment;
		this.author = author;
		this.rating = rating;
	}
	toString() {
		return `"${this.comment}" from ${this.author}. Rating: ${this.rating}`;
	}

	static create(params) {
		return new Testimonial(params);
	}
}

class TestimonialDao {
	static seeds = [
		{
			comment: "I said this",
			author: "Martha",
			rating: 5,
		},
		{
			comment: "I said that",
			author: "Dartha",
			rating: 4,
		},
		{
			comment: "I said",
			author: "Wartha",
			rating: 3,
		},
	];
	getAll() {
		throw new Error("Not implented");
	}

	create() {
		throw new Error("Not implented");
	}
}

class SessionStorageTestimonialDao extends TestimonialDao {
	constructor() {
		super();
		this.database = sessionStorage;
	}
	getAll() {
		const testimonialsInSessionStorage = this.database.getItem("testimonials");
		const testimonialsData = testimonialsInSessionStorage
			? JSON.parse(testimonialsInSessionStorage)
			: TestimonialDao.seeds;
		console.log("testimonialsData");
		console.log(testimonialsData);
		return testimonialsData.map((testimonialData) => {
			const { comment, author, rating } = testimonialData;
			return Testimonial.create(testimonialData);
		});
	}

	create(testimonial) {
		const testimonials = this.getAll();
		console.log("testimonials");
		console.log(testimonials);
		testimonials.push(testimonial);
		this.database.setItem("testimonials", JSON.stringify(testimonials));
	}
}

class CookieStorageTestimonialDao extends TestimonialDao {
	constructor() {
		super();
		this.database = document.cookie;
	}
	getAll() {
		const cookieValue = document.cookie
			.split("; ")
			.find((row) => row.startsWith("testimonials"))
			?.split("=")[1];
		console.log("cookieValue");
		console.log(cookieValue);
		const testimonialsData = cookieValue ? JSON.parse(cookieValue) : TestimonialDao.seeds;
		return testimonialsData.map((testimonialData) => new Testimonial(testimonialData));
	}
	create(testimonial) {
		const existingTestimonials = this.getAll();
		console.log("before existingTestimonials");
		console.log(existingTestimonials);
		existingTestimonials.push(testimonial);
		console.log("after existingTestimonials");
		console.log(existingTestimonials);
		document.cookie = `testimonials=${JSON.stringify(
			existingTestimonials,
		)}; max-age=30; path=/;`;
		console.log("document.cookie");
		console.log(document.cookie);
	}
}

class CreateTestimonialService {
	constructor(testimonialDao) {
		this.testimonialDao = testimonialDao;
	}

	createTestimonial(comment, author, rating) {
		const testimonialData = {
			comment,
			author,
			rating,
		};
		this.testimonialDao.create(testimonialData);
	}
}
const testimonialDao = new CookieStorageTestimonialDao();
//const testimonialDao = new SessionStorageTestimonialDao();
const createTestimonialService = new CreateTestimonialService(testimonialDao);

const testimonialList = document.getElementById("testimonials-list");
const testimonials = testimonialDao.getAll();

for (let i = 0; i < testimonials.length; i++) {
	const testimonial = testimonials[i];
	const testimonialLi = document.createElement("li");
	testimonialLi.textContent = testimonial.toString();
	testimonialList.appendChild(testimonialLi);
}

const createTestimonialForm = document.querySelector("#testimonials form");
createTestimonialForm.addEventListener("submit", (event) => {
	//event.preventDefault();
	const formData = new FormData(event.target);
	const comment = formData.get("comment");
	const author = formData.get("Authorname");
	const rating = formData.get("rating");
	createTestimonialService.createTestimonial(comment, author, rating);
});

const AverageRatingDisplay = document.getElementById("Average Rating");
const sumOfRatings = testimonialDao.getAll().reduce((acc, reviews) => {
	return acc + parseInt(reviews.rating);
}, 0);
console.log(sumOfRatings);
const AverageRating = sumOfRatings / testimonialDao.getAll().length;
AverageRatingDisplay.textContent += AverageRating.toString();
