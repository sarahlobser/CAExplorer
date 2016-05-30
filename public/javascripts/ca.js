var bots = [];
var width = 600;
var height = 500;
var botsize = 10;
var allBinStrings = [];
var demographics = {};
var notEmptyNeighborhoods = [];
var userInputs = [];
var inputs = document.getElementsByName('number');
var button = document.getElementById('submitInputs');
var favButton = document.getElementById('savemyfavorite');
var favForm = document.getElementById('save');

function makeBinString(number) {
    var s = 'b' + (number >>> 0).toString(2);
        var addedzeros = '';
        for(var j = 0; j < 9-s.length; j++) {
            addedzeros += '0';
        }
    return s.substring(0,1) + addedzeros + s.substring(1);
}

function getAllBinStrings() {
    for (var i = 0; i <= 255; i++) {
        allBinStrings[i] = makeBinString(i);
        demographics[parseInt(allBinStrings[i].substring(1), 2)] = 0;
        
    }
    console.log(demographics);
}

function getMostPopularNeighborhoods() {
    notEmptyNeighborhoods = [];
    for(p in demographics) {
        if(demographics[p] > 0) notEmptyNeighborhoods.push(p);
    }
    return notEmptyNeighborhoods.sort(function(a, b){return demographics[b]-demographics[a];});
}

var nStrings = ['b00000001', 'b10000000', 'b11100000', 'b11100011',
               'b00011111', 'b00000000', 'b01010101', 'b10101010',
               'b00110011', 'b11001100', 'b11100010', 'b11111110', 
               'b01111111', 'b11111111', 'b00110110'];

function changeState(n) {
    var nStateString = 'b';
    for(var i = 0; i < n.length; i++) {
        if(n[i].state === false) {
            nStateString += '0';
        }
        else nStateString += '1';
    }
    demographics[parseInt(nStateString.substring(1), 2)]++;
    
//    for(var i = 0; i < nStrings.length; i++) {
//        if (nStrings[i] === nStateString) {
//            return true;
//        }
//    }
//    if(allBinStrings.indexOf(nStateString)%16 === 0) {
//        return true;
//    }
    if(userInputs.indexOf(nStateString) !== -1) {
        //console.log(demographics[parseInt(nStateString.substring(1), 2)]);
        return true;
    }
    else return false;
}

function getRandomColor() {
	var color = {
			r: Math.floor(Math.random() * 255),
			g: Math.floor(Math.random() * 200),
			b: Math.floor(Math.random() * 255),
	}
    var colorString = 'rgb('+color.r+','+color.g+','+color.b+')';
	return colorString;
}

function initialize() {
    getAllBinStrings();
    for(var i = 0; i < height/botsize; i++) {
        var botline = [];
        for(var j = 0; j < width/botsize; j++) {
            botline[j] = new Bot(j*botsize, i*botsize);
        }
        bots[i] = botline;
    }
        
    cagrid.start();
}

function Bot(x, y) {
    this.x = x;
    this.y = y;
    this.tempstate = false;
    this.color = 150;
    
    //this.state = (((this.x%2 === 0 || this.x%3 === 0) && (this.y%2 === 0 || this.y%5 === 0)) ? false : true);
    //this.state = (Math.random()<0.001 ? true : false);
    this.state = ((this.x === width - 50 && this.y === height / 2) ? true : false);
    
    this.update = function(n) {
      this.tempstate = (changeState(n) ? !this.state: this.state);
      //this.tempstate = (changeState(n) === true ? true: false);
    }
    
    this.fixstate = function(i, j) {
        //this.state = this.tempstate;
        this.state = bots[i][j+1].tempstate;
    }
    this.draw = function() {
        ctx = cagrid.context;
        if (this.state == true) {
            //ctx.fillStyle = getRandomColor();
            ctx.fillStyle = 'rgb(50, 50, ' + this.color + ')';
            //ctx.fillStyle = 'rgb(50,50,' + + ')';
        }
        else ctx.fillStyle = 'rgb(0,0,0)';
            ctx.fillRect(this.x, this.y, this.x + botsize, this.y + botsize);
    }
}

var cagrid = {
	    canvas : document.createElement("canvas"),
	    start : function() {
	        this.canvas.width = width;
	        this.canvas.height = height;
	        this.context = this.canvas.getContext("2d");
	        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
	        this.interval = setInterval(updateGrid, 100);
	    },
	    clear : function() {
	        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	    },
	    end : function() {
	    	var timeout = setTimeout(function() {
	    	    clearInterval(myGameArea.interval);
	    	    presentEndGame();
	    	}, 5000);
	    }
}

function updateGrid() {
    cagrid.clear();
    var w = bots.length;
    var h = bots[0].length;
    
    for(p in demographics) {
        demographics[p] = 0;
    }
//    for(var i = 1; i < bots.length; i++) {
//        for(var j = 1; j < bots[i].length-1; j++) {
//            
//            bots[i][j].draw();
//        }
//    }
    for(var i = 1; i < bots.length-1; i++) {
        for(var j = 1; j < bots[i].length-1; j++) {
            bots[i][j].update([bots[i+1][j+1], bots[i][j+1], bots[i-1][j+1], bots[i-1][j],
                             bots[i-1][j-1], bots[i][j-1], bots[i+1][j-1], bots[i+1][j]]);
            
        }
    }
    for(var i = 1; i < bots.length-1; i++) {
        for(var j = 1; j < bots[i].length-1; j++) {
            
            bots[i][j].fixstate(i, j);
        }
    }
    for(var i = 1; i < bots.length; i++) {
        for(var j = 1; j < bots[i].length; j++) {
            
            bots[i][j].draw();
        }
    }
    
}

button.addEventListener('click', function(e) {
    e.preventDefault();
    //console.log(inputs);
    userInputs = [];
    var numbers = inputs[0].value.split(' ');
    for(var i = 0; i < numbers.length; i++) {
        var num = parseInt(numbers[i]);
        if(num >=0 && num <256) {
            userInputs.push(makeBinString(num));
        }
        
    }
    console.log(demographics);
    var suggestions = getMostPopularNeighborhoods();
    displayPopularNeighborhoods(suggestions);
    //console.log(suggestions);
    
//    suggestionsDiv.innerHTML = '';
//    suggestionsDiv.textContent = suggestions;
    
})

favButton.addEventListener('click', function(e) {
    e.preventDefault();
    console.log('licked!');
    
    var outputImage = document.getElementsByTagName("canvas")[0];
    var imgURL = outputImage.toDataURL("test_ca_image/png");
    console.log(imgURL);
    var image = document.createElement("img");
    image.src = imgURL;
    document.body.appendChild(image);
    favForm.submit();
})

function displayPopularNeighborhoods(suggestions) {
    var neighborhoodlist = document.createElement('ol');
    for (var i = 0; i < 10; i++) {
        var neighborhood = document.createElement('li');
        neighborhood.textContent = suggestions[i];
        neighborhoodlist.appendChild(neighborhood);
    }
    var suggestionsDiv = document.getElementById("suggestions");
    suggestionsDiv.innerHTML = '';
    suggestionsDiv.appendChild(neighborhoodlist);
}

window.addEventListener('mousedown', function (e) {
            cagrid.x = e.pageX;
            cagrid.y = e.pageY;
    console.log(cagrid.x + " " + cagrid.y);
    bots[parseInt(cagrid.y/botsize)][parseInt(cagrid.x/botsize)].state = true;
        })

initialize();

