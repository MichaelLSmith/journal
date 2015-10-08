$(document).ready(function(){
    $('.parallax').parallax();
    
    $('#createEntry').submit(function(event){
        event.preventDefault();
        var frm = $('#createEntry');
        createEntry(frm);
    });

    $('#search').submit(function(event){
        event.preventDefault();
        var frm = $('#search');

    });
});

// Global Variables

    // Create Entry variables:
    var title;
    var content;
    var tags;
    var author;
    var currentEntryTitle;
    var currentEntryContent;
    var currentEntryAuthor;
    var modalHtml;

// Push HTML Functions
function generateHtml(currentEntryTitle){
    var html = '<li>'+'<a href="#'+currentEntryTitle+'"'+'>'+currentEntryTitle+'</a>'+'</li>';
    return html;
}
function generateEntryModal(currentEntryTitle,currentEntryContent,currentEntryAuthor){
    var modalHtml = '<div id="'+currentEntryTitle+'"'+'class="modalDialog"' + '>'+'<div>'+'<a href="#close" title="Close" class="close">X</a>'+'<h2>'+currentEntryTitle+'</h2>'+'<p>'+currentEntryContent+'</p>'+'</div>'+'</div>'
    // console.log(modalHtml);
    return modalHtml;
}

//Helper Functions

var basicLoop = function(againstMeasure){
    for(var counter=0; counter < againstMeasure; counter++)
}

// Main Create Entry Function tied to Create Function Form.
function createEntry(frm){
    //collect values from form
    title = frm.find('input[name="title"]').val();
    content = frm.find('input[name="content"]').val();
    tags = frm.find('input[name="tags"]').val();
    author = frm.find('input[name="author"]').val();
    //create new entry
    MyJournal.publish(title,content,author);

    //generate html
    // var html = generateHtml();
    // $('#response').html(html);
}

// Journal Contructor and prototype Functions

function Journal(){
    this.entries = [];
} 

Journal.prototype.publish = function(title,content,author){
    this.entries.push(new entry(title,content,author));
    // timestamp
        var d = new Date();
        console.log(d);
        this.entries.timestamp = d;
        this.entries[0].timestamp = d;
    // generate html
        // currentEntryTitle = title;
        // console.log(currentEntryTitle);

        var html = generateHtml(title);
        // console.log(html);
        $("#response").append(html);
        var modalHtml = generateEntryModal(title,content,author);
        // console.log(modalHtml);
        $('#dummyModal').before(modalHtml);
    };
Journal.prototype.searchTags = function(searchString) {
        for (var entriesIndex = 0; entriesIndex < this.entries.length; entriesIndex++) { 
            for (var tagsIndex = 0; tagsIndex < this.entries[entriesIndex].tags.length; tagsIndex++){      
                if (this.entries[entriesIndex].tags[tagsIndex].search(searchString) > -1 ){
                    console.log(this.entries[entriesIndex])
                }
                else console.log('no entries containg' + searchString + 'exist. Please try another search.')
            }
        }
    } // end SearchTags function

Journal.prototype.searchEntries = function(searchString) {
        var result = false;
        for (var entriesIndex = 0; entriesIndex < this.entries.length; entriesIndex++) { 
            if (
                this.entries[entriesIndex].title.search(searchString) > -1 || 
                this.entries[entriesIndex].content.search(searchString) > -1 ||
                this.entries[entriesIndex].author.search(searchString) > -1
                ){
                    console.log(this.entries[entriesIndex]);
                    result = true;
                }
        }//end of For
    }//end searchEntries function

Journal.prototype.searchTitle = function(searchString){
    var result = false;
    for(var entriesIndex = 0; entriesIndex< this.entries.length; entriesIndex++){
        if(this.entries[entriesIndex].title.search(searchString) > -1)
            console.log(this.entries[entriesIndex]);
            result = true;
    }
}



//Display Entries

// Journal.prototype.displayEntries = function(){
//     for (var tagsIndex=0; tagsIndex < this.entries.length; entriesIndex++){
//         //convert each entry into html

//     }
// }


// entry Functions:

function entry(title, content, author){
    this.title = title;
    this.content = content;
    this.author = author;
    var timestamp = timestamp;
    this.tags = [];
}
entry.prototype.addTag = function(tag){
        this.tags.push(tag);
    }


var MyJournal = new Journal();
MyJournal.publish('jogging', 'I went Jogging', 'Michael');
MyJournal.publish('sailing', 'I went sailing', 'Michael');
MyJournal.publish('reading', 'I spent the afternoon reading.', 'Michael');
MyJournal.entries[1].addTag('sailing');
MyJournal.entries[0].addTag('jogging');
MyJournal.entries[1].addTag('sports');
MyJournal.entries[0].addTag('sports');
MyJournal.entries[0].addTag('Friday');
MyJournal.searchEntries('went');
MyJournal.searchTags('Friday');