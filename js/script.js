$(document).ready(function(){
   var data = "http://api.foursquare.com/v2/venues/search?client_id=HJDJKAKK1ARQNLJEHVSKDW45HZYMXGPEEUG3TYXV5JSZZW1M&client_secret=XL0J2OL1WFJVVOQN0KV3NYCUIWVR0LJAPPK2JDK41QTPXMOO&categoryId=4bf58dd8d48988d1d2941735,4bf58dd8d48988d1ca941735,4bf58dd8d48988d145941735,4bf58dd8d48988d16e941735,4bf58dd8d48988d10e941735,4bf58dd8d48988d110941735&near=Breda&radius=20000&limit=50&v=20140101&callback=?";
    
$.getJSON(data, function(obj){
   
    // model voor listFood
    function listFood() {
        var venues = obj.response.venues;
        var foods = [];
        
        venues.forEach(function(food){
           foods.push(food.categories[0].shortName);
        });
        
        console.log(foods);
        
        var remove = foods.indexOf('Grocery Store');
        if (remove != -1) {
            foods.splice(remove, 1);
        }
                
        var dedupedFoods = foods.filter(function(elem, pos){
           return foods.indexOf(elem) == pos; 
        });
        
        dedupedFoods.forEach(function(food){
            // id heeft een replace(regex) om de spaties er uit te halen
           var output = '<li><a href="#town" data-params="id=' + food.replace(/ /g,'_') + '" data-transition="slidedown"><h3>' + food + '</h3></a></li>'; 
            $('#listFood').append(output);
            $('#listFood').listview().listview('refresh');
        });
        
    }
     listFood();
   
    // model voor listPlaces
    function listPlaces() {
        var venues = obj.response.venues;
        var places = [];
        
        
        // pak alle steden uit de array en push ze in de places array
        
        venues.forEach(function(el) {
            // valideer of er wel data aanwezig is
            if (el.location.city){
            places.push(el.location.city);
            }
          
        });
          
        // filtert de places array op dat de index hetzelfde moet zijn als de positie van waar hij in de array zit. zo worden dubbelingen voorkomen 
        var dedupedPlaces = places.filter(function(elem, pos){
           return places.indexOf(elem) == pos; 
        });
        
        // count functie om aantal duplicates in places array te vinden
        function count(array, value) {
        var counter = 0;
        for(var i=0;i<array.length;i++) {
            if (array[i] === value) counter++;
        }
        return counter;
        }
        
        
        // voor iedere plaats en in place array, append naar html
        dedupedPlaces.forEach(function(place){
            var output = '<li><a href="#restaurant" data-transition="slidedown">' + place + '<span class="ui-li-count " >' + count(places, place) +  '</span></a></li>';
                   
            $('#listPlaces').append(output);
            $('#listPlaces').listview().listview('refresh');
        });
        
        
    }
    
    listPlaces();
    
    
    //model voor listrestaurant
    function listRestaurants() {
        var venues = obj.response.venues;
        var restaurants = [];
        
        // pak alle restaurants met naam en zet ze in array
    
        venues.forEach(function(el){
           if (el.name){
            restaurants.push(el.name);
           }
        });
        
        restaurants.forEach(function(restaurant){
           var output = '<li><a href="restaurant.html" data-transition="slidedown"><h2>' + restaurant + '</h2></a></li>';
            $('#listRestaurants').append(output);
            $('#listRestaurants').listview().listview('refresh');
        });
    }
    
    listRestaurants();
    
});
    
});