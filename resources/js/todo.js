$(document).ready(()=>{

    //Initialize Variables
    window.done = done;
    window.notDone = notDone;
    var doneList = []
    var notdoneList = []


    //CHECK IF LOCALSTORAGE IS AVAILABLE
    if (localStorage["doneList"].length >= 4) {
        doneList = JSON.parse(localStorage["doneList"])
        refreshDone();
    }
    if (localStorage["notdoneList"].length >= 4) {
        notdoneList = JSON.parse(localStorage["notdoneList"])
        refreshNotDone();
    }


    //Trigger enter click to continue
    $('#todoInput').keypress(function (e) {
        if (e.which == 13) {
            console.log('[INFO] triggerd Enter button')
            $('#todoButton').trigger('click');
        }
    });


    $('#todoButton').click(() => {
        console.log('[INFO] ToDo Add Button pressed')
        //Add Event
        //check text value
        if(!$('#todoInput').val()){
            //value is empty
            //place for a warning but not relevant in this application
            console.log('[ERR] Value empty')
        } else {
            //value is not empty -> lets go
            var text = $('#todoInput').val()
            console.log('[INFO] Value is' + text)
        

        //Push new Object to List
        notdoneList.push(text)

        console.log('[INFO] '+text+' was added to notdoneList')
        console.log(notdoneList)

        //trigger List refresh
        refreshNotDone()

        //clear input
        $('#todoInput').val('')
        }

    })

    function done(id){

        console.log('[INFO] Switching State from Item '+id+' to done')

        //notdone Object was marked as Done
        //getting array index to make sure its unique
        var i = 0;
        notdoneList.forEach(listItem => {
            if(i == id){
                //found unique item

                //adding to doneList
                doneList.push(listItem)
                refreshDone()
                console.log('[INFO] Added '+listItem+' to Done List!')

                //removing from notdoneList via Index
                notdoneList.splice(id,1);
                refreshNotDone()
            }
            i++;
        })
        
    }

    function notDone(id){

        console.log('[INFO] Switching State from Item '+id+' to not done')

        //notdone Object was marked as Done
        //getting array index to make sure its unique
        var i = 0;
        doneList.forEach(listItem => {
            if(i == id){
                //found unique item

                //adding to notdoneList
                notdoneList.push(listItem)
                refreshNotDone()
                console.log('[INFO] Added '+listItem+' to not Done List!')

                //removing from doneList via Index
                doneList.splice(id,1);
                refreshDone()
                refreshDone()
                console.log(doneList)
            }
            i++;
        })
        
    }


    function refreshDone(){
        //List refresh for DoneList
        console.log('[INFO] refresh doneList!')
        var newHtml = ""
        var i = 0;
        
        //mush together the new List
        doneList.forEach(listItem => {
            newHtml = newHtml+"<button onclick='notDone("+i+")'>"+listItem+"</button>";
            i++;
        });

        //printing new List
        $('#doneList').html(newHtml)

        //saving new data to localstorage
        localStorage["doneList"] = JSON.stringify(doneList)
    }

    function refreshNotDone(){
        //List refresh for notDoneList
        console.log('[INFO] refresh notdoneList!')
        var newHtml = ""
        var i = 0;

        //mush together the new List
        notdoneList.forEach(listItem => {
            newHtml = newHtml+"<button onclick='done("+i+")'>"+listItem+"</button>";
            i++;
        });

        //printing new List
        $('#notdoneList').html(newHtml)

        //saving new data to localstorage
        localStorage["notdoneList"] = JSON.stringify(notdoneList)
    }


    $('#clear').click(()=>{
        //clearing both Lists!
        doneList = []
        notdoneList = []
        
        //refresh Lists
        refreshDone()
        refreshNotDone()
    })


})