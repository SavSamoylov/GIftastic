$(document).ready(function(){

//==================================================================================
// GENERAL VARIABLES
//==================================================================================


var app = {
	giphyKey:"dc6zaTOxFJmzC",
	gifQuantity: "10",
	queryURL:"http://api.giphy.com/v1/gifs/search?q=",
	topics: ["Cheers", "Frasier", "Arrested Development", "Buffy The Vampire Slayer", "Firefly"],
	loadButtons: function(){ // Display all buttons in the "topics" array when the page loads.

		for(var i = 0; i < this.topics.length; i++){
			$(".sidebar--List").prepend(`
				<li><a href="#" class="gifCat">${[this.topics[i]]}</a></li>
				`)
		}
		console.log(this.topics);
	},
	addButton: function(){   // Add Buttons to the DOM using the users input.

		$("#addBtn").on("click", function(event){
			event.preventDefault();

			var newCat = $("#categoryInput").val();

			if (newCat != ""){ // Prevents empty string from being submitted.
				app.topics.push(newCat);

				$(".sidebar--List").empty();

				app.loadButtons();

				$("#categoryInput").val("");

				app.clearGifs();
				app.loadGifs(newCat);
			} 

		})
	},
	displayCat: function(){
		$(document).on("click", ".gifCat", function(){
			var newCat = $(this).html();
			console.log(newCat);
			app.clearGifs();
			app.loadGifs(newCat);
		});
	},
	loadGifs: function(category){
		$.ajax({
			url: this.queryURL+category+"&api_key="+this.giphyKey+"&limit="+this.gifQuantity,
			method: "GET",
		})
		.done(function(result){
			console.log(result);
			var result = result.data;

			for (var i = 0; i < result.length; i++){
				$(".contentBlock").append(
					`
					<div class="gifBlock">
						<img 
						src="${[result[i].images.fixed_height_still.url]}" 
						data-toggle="still"
						data-animate="${[result[i].images.fixed_height.url]}" 
						data-still="${[result[i].images.fixed_height_still.url]}" 
						class="gif" width="100%"/>
						<div class="gifRating">${[result[i].rating]}</div>
					</div>
					`
					);
			}

		})

	},
	clearGifs: function(){
		$(".contentBlock").html("");
	},
	toggleGifs: function(){
		$(document).on("click", ".gif", function(){
			var toggleState = $(this).data("toggle");
			var animatedURL = $(this).data("animate");
			var stillURL = $(this).data("still");
			if (toggleState === "still"){
				$(this).attr("src", animatedURL);
				$(this).data("toggle", "animate");
			} else if (toggleState === "animate"){
				$(this).attr("src", stillURL);
				$(this).data("toggle", "still");
			}
		});
	}
}

// Populate the sidebar with starter links.
app.loadButtons();
// Listen for new Category Submissions.
app.addButton();
// Listen for clicks on existing category links.
app.displayCat();
// Listen for clicks on GIFs.
app.toggleGifs();

});