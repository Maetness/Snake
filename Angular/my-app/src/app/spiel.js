function game(){
    window.onload = function () {
        alert("adsf");
    var canvasWidth = 900;
    var canvasHeigth = 600;
    var blockSize = 30; //multiply taill dun bloc em pixel
    
    var ctx;
    var delay = 100;   //1 s
    
    var snakee;
    var applee;
        //la largeur d tout mon area
        var widthInBlocks = canvasWidth / blockSize;
        //la longueur d tout mon area
        var heigthInBlocks = canvasHeigth / blockSize;
    
        var score;//pr afficher l score
    
    
        init();
    
        function init() {
            
            var canvas = document.createElement('canvas');
            canvas.width = canvasWidth;
            canvas.height = canvasHeigth;
            canvas.style.border = "30px solid gray";
            canvas.style.margin = "50px auto";
            canvas.style.display = "block";
            canvas.style.backgroundColor = "#ddd";
            document.body.appendChild(canvas);
    
    
            ctx = canvas.getContext('2d');
            snakee = new Snake([[6, 4], [5, 4], [4, 4], [3, 4]], "right");
            score = 0;
            applee = new Apple([10, 10]);//un bloc d pomme 
            refreshCanvas();
        }
    
        function refreshCanvas() {
            //avancer daborr
            snakee.advance();
    
            //O cas il ya collision
            if (snakee.checkCollision()) {
                gameOver();
            }
            else {
    
                //
    
                if (snakee.isEatingApple(applee)) {
                    score++;
                    snakee.ateApple = true;
                    do {
                        applee.setNewPosition();
                    }
                    while (applee.isOnSnake(snakee));
                }
                ctx.clearRect(0, 0, canvasWidth, canvasHeigth);
                drawScore();
                snakee.draw();
                applee.draw();//call function
                setTimeout(refreshCanvas, delay);
    
            }
    
    
        }
    
    
        //la fonction afficher Game Over
        function gameOver() {
            ctx.save(); //enregistrer dja ls parametr davant
    
            ctx.font = "bold 70px sans-serif";//ecrir en gras, d taill 200 px, sans-serif:sera tjr la
            ctx.fillStyle = "#000"; //couleur grise
    
            /*pr centrer l score */
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.strokeStyle = "white"; //la bordure en blanc
            ctx.lineWidth = 5;
            var centreX = canvasWidth / 2;
            var centreY = canvasHeigth / 2;
    
            ctx.strokeText("GAME OVER", centreX, centreY - 180);
            ctx.fillText("GAME OVER", centreX, centreY - 180);
    
            ctx.font = "bold 30px sans-serif";
            ctx.strokeText("DRUECKEN SIE AUF SPACE UM WIEDERZUSPIELEN", centreX, centreY - 120);
            ctx.fillText("DRUECKEN SIE AUF SPACE UM WIEDERZUSPIELEN", centreX, centreY - 120);
    
            ctx.restore();//a la fin, les restaurer ces parametres
    
        }
    
    
        //la fonction restart pr relancer l jeu
        function restart() {
            snakee = new Snake([[6, 4], [5, 4], [4, 4], [3, 4]], "right");
            score = 0;
            applee = new Apple([10, 10]);//un bloc d pomme 
            refreshCanvas();
        }
    
        function drawBlock(ctx, position) {
            var x = position[0] * blockSize;
            var y = position[1] * blockSize;
            ctx.fillRect(x, y, blockSize, blockSize);
        }
    
    
        //Fonction pr afficher le score
        function drawScore() {
            ctx.save();//enregistrer les parametres precedentes#
            ctx.font = "bold 20px sans-serif";//ecrir en gras, d taill 200 px, sans-serif:sera tjr la
            //ctx.fillStyle = "gray"; //couleur grise
    
            /*pr centrer l score */
            //ctx.textAlign = "center";  
            //ctx.textBaseline = "middle";
            //var centreX = canvasWidth/2;
            //var centreY = canvasHeigth/2;
            //ctx.fillText(score.toString() , centreX, centreY);
    
    
            ctx.fillText(score.toString(), 5, canvasHeigth - 5);
            ctx.restore();//les restaurer apres
        }
    
    
        function Snake(body, direction) {
            this.body = body;
            this.direction = direction;
            this.ateApple = false; //savoir sil a mange une pomme
            this.draw = function () {
                ctx.save();
                ctx.fillStyle = "#ff0000";
                for (var i = 0; i < this.body.length; i++) {
                    drawBlock(ctx, this.body[i]);
                    //
    
    
                    //
                }
                ctx.restore;
            };
    
            //pr avancer l serpent
            this.advance = function () {
                var nextPosi = this.body[0].slice();
                //pr m donner lelement lui mm
    
                switch (this.direction) {
                    case "left":
                        nextPosi[0] -= 1;
                        break;
                    case "right":
                        nextPosi[0] += 1;
                        break;
                    case "down":
                        nextPosi[1] += 1;
                        break;
                    case "up":
                        nextPosi[1] -= 1;
                        break;
                    default:
                        throw("Invalid Direction");
                }
    
    
                this.body.unshift(nextPosi);
                //ajout un truc o dbut du array
    
                //Mtn l cas ou il mange de pomme
                if (!this.ateApple) {
                    this.body.pop(); //delete last element
                } else {
                    this.ateApple = false;
                }
    
            };
    
            //pr les directions permises
            this.setDirection = function (newDirection) {
                var allowedDirections;
                switch (this.direction) {
                    case "left":
                    case "right":
                        allowedDirections = ["up", "down"];
                        break;
                    case "down":
                    case "up":
                        allowedDirections = ["left", "right"]
                        break;
    
                    default:
                        throw("Invalid Direction");
                }
    
                //si direction permise, i.e sup a -1??
                if (allowedDirections.indexOf(newDirection) > -1) {
                    this.direction = newDirection;
                }
    
            };
    
    
            //Maintenant le cas de collision
            this.checkCollision = function () {
                var wallCollision = false;
                var snakeCollision = false;
                var head = this.body[0];//Tete du serpent
                var rest = this.body.slice(1);
                //tout l corps du serpent sauf la tete
                var snakeX = head[0];
                var snakeY = head[1];
    
                var minX = 0;
                var minY = 0;
                var maxX = widthInBlocks - 1; //max absiss plan
                var maxY = heigthInBlocks - 1; //max ordonee plan
    
                //Verifier sil est sorti du cadre 
                var isNotBetweenHorizontalWalls = snakeX < minX || snakeX > maxX;
                var isNotBetweenVerticalWalls = snakeY < minY || snakeY > maxY;
                if (isNotBetweenHorizontalWalls || isNotBetweenVerticalWalls) {
                    wallCollision = true;
                }
    
                //Verifier sil la tete est paC par son propr corp
    
                for (var i = 0; i < rest.length; i++) {
                    if (snakeX === rest[i][0] && snakeY === rest[i][1]) {
                        snakeCollision = true;
                    }
                }
    
                return wallCollision || snakeCollision;
    
            };
    
    
            //Mtn la methode pr kil mange des pommes et kil grossisse
    
            this.isEatingApple = function (appleToEat) {
                var head = this.body[0];    //si la tete = o corp a la pos 0
                //si les coordonnes d la tete est egale o coordonnee d la pomm,..
                if (head[0] === appleToEat.position[0] && head[1] === appleToEat.position[1]) {
                    return true;
                } else {
                    return false;
                }
            };
    
    
        }
    
    
        //pr pouvoir manger la pomme
    
        function Apple(position) {
            this.position = position;
            //fction pr dessiner la pomme
            this.draw = function () {
                ctx.save(); //enregistr mes lastconfiguration
                ctx.fillStyle = "#33cc33";
                ctx.beginPath(); //pr dessiner un rond
                var radius = blockSize / 2;
                var x = this.position[0] * blockSize + radius;
                var y = this.position[1] * blockSize + radius;
    
    
                ctx.arc(x, y, radius, 0, Math.PI * 2, true);
                //fction pr dessiner cercle
                ctx.fill(); //pr l remplir
                ctx.restore;//danach, remetr ces configarations
            };
    
    
            //Avoir d nouvell position d notr pomm sur l area
            this.setNewPosition = function () {
                var newX = Math.round(Math.random() * (widthInBlocks - 1));
                var newY = Math.round(Math.random() * (heigthInBlocks - 1));
                this.position = [newX, newY];
    
            };
    
    
            //Verifier si la nouvelle position de la pomme
            //est sur pomme
            this.isOnSnake = function (snakeToCheck) {
                var isOnSnake = false;
                for (var i = 0; i < snakeToCheck.body[i].length; i++) {
                    //
                    if (this.position[0] == snakeToCheck.body[i][0] &&
                        this.position[1] == snakeToCheck.body[i][1]) {
                        isOnSnake = true;
                    }
                }
                return isOnSnake;
            };
        }
    
    
        //jouer avec les touches du clavier
        document.onkeydown = function handleKeyDown(e) {
            var key = e.keyCode;
            //donner l code d la touch appuyee
            var newDirection;
            switch (key) {
                case 37:        //code pr la touch left
                    newDirection = "left";
                    break;
                case 38:
                    newDirection = "up";
                    break;
                case 39:
                    newDirection = "right";
                    break;
                case 40:
                    newDirection = "down";
                    break;
    
                //Mtn l cas ou on appui sur espace pr relancer l jeu
                case 32:
                    restart(); // relancer l jeu
                    return; //pr arreter lexecution d la fonction
    
                default:
                    return;
            }
            snakee.setDirection(newDirection);
        }
    
    
    }

}
window.onload = function () {
    alert("adsf");
var canvasWidth = 900;
var canvasHeigth = 600;
var blockSize = 30; //multiply taill dun bloc em pixel

var ctx;
var delay = 100;   //1 s

var snakee;
var applee;
    //la largeur d tout mon area
    var widthInBlocks = canvasWidth / blockSize;
    //la longueur d tout mon area
    var heigthInBlocks = canvasHeigth / blockSize;

    var score;//pr afficher l score


    init();

    function init() {
        
        var canvas = document.createElement('canvas');
        canvas.width = canvasWidth;
        canvas.height = canvasHeigth;
        canvas.style.border = "30px solid gray";
        canvas.style.margin = "50px auto";
        canvas.style.display = "block";
        canvas.style.backgroundColor = "#ddd";
        document.body.appendChild(canvas);


        ctx = canvas.getContext('2d');
        snakee = new Snake([[6, 4], [5, 4], [4, 4], [3, 4]], "right");
        score = 0;
        applee = new Apple([10, 10]);//un bloc d pomme 
        refreshCanvas();
    }

    function refreshCanvas() {
        //avancer daborr
        snakee.advance();

        //O cas il ya collision
        if (snakee.checkCollision()) {
            gameOver();
        }
        else {

            //

            if (snakee.isEatingApple(applee)) {
                score++;
                snakee.ateApple = true;
                do {
                    applee.setNewPosition();
                }
                while (applee.isOnSnake(snakee));
            }
            ctx.clearRect(0, 0, canvasWidth, canvasHeigth);
            drawScore();
            snakee.draw();
            applee.draw();//call function
            setTimeout(refreshCanvas, delay);

        }


    }


    //la fonction afficher Game Over
    function gameOver() {
        ctx.save(); //enregistrer dja ls parametr davant

        ctx.font = "bold 70px sans-serif";//ecrir en gras, d taill 200 px, sans-serif:sera tjr la
        ctx.fillStyle = "#000"; //couleur grise

        /*pr centrer l score */
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.strokeStyle = "white"; //la bordure en blanc
        ctx.lineWidth = 5;
        var centreX = canvasWidth / 2;
        var centreY = canvasHeigth / 2;

        ctx.strokeText("GAME OVER", centreX, centreY - 180);
        ctx.fillText("GAME OVER", centreX, centreY - 180);

        ctx.font = "bold 30px sans-serif";
        ctx.strokeText("DRUECKEN SIE AUF SPACE UM WIEDERZUSPIELEN", centreX, centreY - 120);
        ctx.fillText("DRUECKEN SIE AUF SPACE UM WIEDERZUSPIELEN", centreX, centreY - 120);

        ctx.restore();//a la fin, les restaurer ces parametres

    }


    //la fonction restart pr relancer l jeu
    function restart() {
        snakee = new Snake([[6, 4], [5, 4], [4, 4], [3, 4]], "right");
        score = 0;
        applee = new Apple([10, 10]);//un bloc d pomme 
        refreshCanvas();
    }

    function drawBlock(ctx, position) {
        var x = position[0] * blockSize;
        var y = position[1] * blockSize;
        ctx.fillRect(x, y, blockSize, blockSize);
    }


    //Fonction pr afficher le score
    function drawScore() {
        ctx.save();//enregistrer les parametres precedentes#
        ctx.font = "bold 20px sans-serif";//ecrir en gras, d taill 200 px, sans-serif:sera tjr la
        //ctx.fillStyle = "gray"; //couleur grise

        /*pr centrer l score */
        //ctx.textAlign = "center";  
        //ctx.textBaseline = "middle";
        //var centreX = canvasWidth/2;
        //var centreY = canvasHeigth/2;
        //ctx.fillText(score.toString() , centreX, centreY);


        ctx.fillText(score.toString(), 5, canvasHeigth - 5);
        ctx.restore();//les restaurer apres
    }


    function Snake(body, direction) {
        this.body = body;
        this.direction = direction;
        this.ateApple = false; //savoir sil a mange une pomme
        this.draw = function () {
            ctx.save();
            ctx.fillStyle = "#ff0000";
            for (var i = 0; i < this.body.length; i++) {
                drawBlock(ctx, this.body[i]);
                //


                //
            }
            ctx.restore;
        };

        //pr avancer l serpent
        this.advance = function () {
            var nextPosi = this.body[0].slice();
            //pr m donner lelement lui mm

            switch (this.direction) {
                case "left":
                    nextPosi[0] -= 1;
                    break;
                case "right":
                    nextPosi[0] += 1;
                    break;
                case "down":
                    nextPosi[1] += 1;
                    break;
                case "up":
                    nextPosi[1] -= 1;
                    break;
                default:
                    throw("Invalid Direction");
            }


            this.body.unshift(nextPosi);
            //ajout un truc o dbut du array

            //Mtn l cas ou il mange de pomme
            if (!this.ateApple) {
                this.body.pop(); //delete last element
            } else {
                this.ateApple = false;
            }

        };

        //pr les directions permises
        this.setDirection = function (newDirection) {
            var allowedDirections;
            switch (this.direction) {
                case "left":
                case "right":
                    allowedDirections = ["up", "down"];
                    break;
                case "down":
                case "up":
                    allowedDirections = ["left", "right"]
                    break;

                default:
                    throw("Invalid Direction");
            }

            //si direction permise, i.e sup a -1??
            if (allowedDirections.indexOf(newDirection) > -1) {
                this.direction = newDirection;
            }

        };


        //Maintenant le cas de collision
        this.checkCollision = function () {
            var wallCollision = false;
            var snakeCollision = false;
            var head = this.body[0];//Tete du serpent
            var rest = this.body.slice(1);
            //tout l corps du serpent sauf la tete
            var snakeX = head[0];
            var snakeY = head[1];

            var minX = 0;
            var minY = 0;
            var maxX = widthInBlocks - 1; //max absiss plan
            var maxY = heigthInBlocks - 1; //max ordonee plan

            //Verifier sil est sorti du cadre 
            var isNotBetweenHorizontalWalls = snakeX < minX || snakeX > maxX;
            var isNotBetweenVerticalWalls = snakeY < minY || snakeY > maxY;
            if (isNotBetweenHorizontalWalls || isNotBetweenVerticalWalls) {
                wallCollision = true;
            }

            //Verifier sil la tete est paC par son propr corp

            for (var i = 0; i < rest.length; i++) {
                if (snakeX === rest[i][0] && snakeY === rest[i][1]) {
                    snakeCollision = true;
                }
            }

            return wallCollision || snakeCollision;

        };


        //Mtn la methode pr kil mange des pommes et kil grossisse

        this.isEatingApple = function (appleToEat) {
            var head = this.body[0];    //si la tete = o corp a la pos 0
            //si les coordonnes d la tete est egale o coordonnee d la pomm,..
            if (head[0] === appleToEat.position[0] && head[1] === appleToEat.position[1]) {
                return true;
            } else {
                return false;
            }
        };


    }


    //pr pouvoir manger la pomme

    function Apple(position) {
        this.position = position;
        //fction pr dessiner la pomme
        this.draw = function () {
            ctx.save(); //enregistr mes lastconfiguration
            ctx.fillStyle = "#33cc33";
            ctx.beginPath(); //pr dessiner un rond
            var radius = blockSize / 2;
            var x = this.position[0] * blockSize + radius;
            var y = this.position[1] * blockSize + radius;


            ctx.arc(x, y, radius, 0, Math.PI * 2, true);
            //fction pr dessiner cercle
            ctx.fill(); //pr l remplir
            ctx.restore;//danach, remetr ces configarations
        };


        //Avoir d nouvell position d notr pomm sur l area
        this.setNewPosition = function () {
            var newX = Math.round(Math.random() * (widthInBlocks - 1));
            var newY = Math.round(Math.random() * (heigthInBlocks - 1));
            this.position = [newX, newY];

        };


        //Verifier si la nouvelle position de la pomme
        //est sur pomme
        this.isOnSnake = function (snakeToCheck) {
            var isOnSnake = false;
            for (var i = 0; i < snakeToCheck.body[i].length; i++) {
                //
                if (this.position[0] == snakeToCheck.body[i][0] &&
                    this.position[1] == snakeToCheck.body[i][1]) {
                    isOnSnake = true;
                }
            }
            return isOnSnake;
        };
    }


    //jouer avec les touches du clavier
    document.onkeydown = function handleKeyDown(e) {
        var key = e.keyCode;
        //donner l code d la touch appuyee
        var newDirection;
        switch (key) {
            case 37:        //code pr la touch left
                newDirection = "left";
                break;
            case 38:
                newDirection = "up";
                break;
            case 39:
                newDirection = "right";
                break;
            case 40:
                newDirection = "down";
                break;

            //Mtn l cas ou on appui sur espace pr relancer l jeu
            case 32:
                restart(); // relancer l jeu
                return; //pr arreter lexecution d la fonction

            default:
                return;
        }
        snakee.setDirection(newDirection);
    }


}