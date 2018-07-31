/*written by Benno Falkner*/

var Jeopardy = (function(){
    var GameData = null;
    var Start = null;
    var Points = [0,0];
    var GameView = null;
    var Selection = null;
    return {
        OpenFile: function(evt){
            var files = evt.target.files; 

            for (var i = 0, f; f = files[i]; i++) {
            var reader = new FileReader();
                reader.onload = function(e) {
                    var data = JSON.parse(e.target.result);
                    console.log(data);
                    Jeopardy.NewGame(data);
                };
                reader.readAsText(f);
            }
        },

        NewGame: function(data) {
            GameData = data;
            Jeopardy.UpdatePoints();

            var cols = data.Colums.length;
            var rows = data.Colums[0].Questions.length;

            var render ="<div>"
            for(var i=0; i<cols; i++){
                render = render + "<div class=\"box hsmall two\">"+data.Colums[i].Top+"</div>" ;
            }
            render = render + "</div>";

            var val = 0
            for(var j=0; j<rows; j++){
                render = render + "<div>"
                val += 100;
                for(var i=0; i<cols; i++){
                    render = render + "<div id=\""+i+"_"+j+"\" class=\"box small two\">"+val+"</div>" ;
                }
                render = render + "</div>"
            }

            document.getElementById("game").addEventListener('click', Jeopardy.ShowQuestion, false);
            document.getElementById("game").innerHTML = render;
        },

        ShowQuestion: function(e) {
            console.log(e.target.id);
            Selection = e.target.id.split('_').map(Number);
            if (Selection.length != 2 || typeof Selection[0] != 'number' || typeof Selection[1] != 'number') {
                return ;
            }
            if ( document.getElementById(Selection[0]+"_"+Selection[1]).classList.contains("done") ) {
                return ;
            }
            var obj = document.getElementById("game");
            var render = "<div class=\"box\"><div class=\"large\">"+GameData.Colums[Selection[0]].Questions[Selection[1]].Q+"</div><div class=\"result_clt\"><button id=\"solution\">Lösung</button></div></div>";
            GameView = obj.innerHTML
            obj.innerHTML = render;
            obj.removeEventListener('click', Jeopardy.ShowQuestion);
            obj.addEventListener('click', Jeopardy.ShowAnswer, false);
        },

        ShowAnswer: function(e){
            console.log(e.target.id);
            var obj = document.getElementById("game");
            if (e.target.id != "solution" ) {
                obj.innerHTML = GameView;
                obj.removeEventListener('click', Jeopardy.ShowAnswer);
                obj.addEventListener('click', Jeopardy.ShowQuestion, false);
                return ;
            }
            var render = "<div class=\"box\"><div class=\"large\">"+GameData.Colums[Selection[0]].Questions[Selection[1]].A+"</div><div class=\"result_clt\"><button id=\"okteam_1\" class=\"ok\">Team 1</button><button id=\"false\" class=\"false\">Falsch</button><button id=\"okteam_2\" class=\"ok\">Team 2</button></div></div>";
            obj.innerHTML = render;
            obj.removeEventListener('click', Jeopardy.ShowAnswer);
            obj.addEventListener('click', Jeopardy.ShowNextRound, false);
        },

        ShowNextRound: function(e){
            console.log(e.target);
            var val="";
            if (e.target.id == "okteam_1" ){
                Points[0] += 100*(Selection[1]+1);
                Jeopardy.UpdatePoints()
                var val="Team 1";
            } else if (e.target.id == "okteam_2" ) {
                Points[1] += 100*(Selection[1]+1);
                Jeopardy.UpdatePoints()
                var val="Team 2";
            } else if (e.target.id == "false" ) {
                var val="<span>Falsch</span>";
            } else {
                return;
            }
            var obj = document.getElementById("game");
            obj.innerHTML = GameView;
            obj.removeEventListener('click', Jeopardy.ShowNextRound);
            obj.addEventListener('click', Jeopardy.ShowQuestion, false);
            document.getElementById(Selection[0]+"_"+Selection[1]).innerHTML=val;
            document.getElementById(Selection[0]+"_"+Selection[1]).classList.add("done");
        },

        UpdatePoints: function (){
            document.getElementById("pointsteam1").innerHTML = Points[0];
            document.getElementById("pointsteam2").innerHTML = Points[1];
        }
    }
})();


$( document ).ready(function() {
    console.log( "ready!" );
    document.getElementById('file').addEventListener('change', Jeopardy.OpenFile, false);
});