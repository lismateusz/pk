/* global firebase */

(function() {
    var config = {
        apiKey: "AIzaSyAMpkYgH_j9uh2bIkrl9PXs9ZOcAM8f5Ik",
        authDomain: "endless-runner-uek.firebaseapp.com",
        databaseURL: "https://endless-runner-uek.firebaseio.com",
        projectId: "endless-runner-uek",
        storageBucket: "endless-runner-uek.appspot.com",
        messagingSenderId: "521108526108"
    };

    firebase.initializeApp(config);
})();

function uuid()
{
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (d + Math.random()*16)%16 | 0;
    d = Math.floor(d/16);
        return (c==='x' ? r : (r&0x3|0x8)).toString(16);
    });

    return uuid;
}

function getResults()
{
    firebase
        .database()
        .ref('/results')
        .orderByChild("/result")
        .limitToLast(3)
        .on('value', function(snapshot) {
            var elem = $('<ul/>');
            var anyElement = false;
            snapshot.forEach(function (snapshotElem) {
                var nickname = snapshotElem.key;
                var score = snapshotElem.val();
                elem.prepend(`<li>${nickname}: ${score.result}</li>`);
                anyElement = true;
            });
            
            if(anyElement) {
                $('#topResults').html(elem);
            } else {
                $('#topResults').html("<p>(brak wyników)</p>");
            }
        });
};

function saveResult(result)
{
    nickname = localStorage.getItem("nickname");
    if(
        typeof nickname === "undefined"
        || !nickname
    ) {
        nickname = uuid();
    }
    
    firebase.database().ref('/results/' + nickname).set({
        result: result
    });
}

$(document).ready(function() {
    getResults();
});