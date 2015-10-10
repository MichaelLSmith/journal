$(document).ready(function(){
    $('.parallax').parallax();
    $(".button-collapse").sideNav();
    
    $('#createEntry').submit(function(event){
        event.preventDefault();
        var frm = $('#createEntry');
        entryForm(frm);
    });

    $('#search').submit(function(event){
        event.preventDefault();
        var frm = $('#search');

    });
});

// Global Variables

    // Create Entry variables:
    //Variables from form:
    var title;
    var content;
    var tags;
    var author;
    var timestamp;//automatically generated during entry creation.
    //Variables for html generation
    var currentEntryTitle;
    var currentEntryContent;
    var currentEntryAuthor;
    var modalHtml;
    //search-related array variables
    
    var searchEntriesResults = [];

//Helper Functions

function basicLoop(againstMeasure, callback) {
    for(var i = 0; i < againstMeasure.length; i++) {
        callback(i, againstMeasure[i]);
        // console.log(callback);
        console.log(againstMeasure);
    }
}

//Model 1

//1.1 Journal Constructor

function Journal(){
    this.entries = [];
}

//1.2 Entry Constructor

function entry(title, content, author, timestamp){
    this.title = title;
    this.content = content;
    this.author = author;
    this.timestamp = timestamp;
    this.tags = [];
}

//Model 2 Prototype Functions to add content

// 2.1 Journal basic create entry

Journal.prototype.createEntry = function(title,content,author,timestamp){
    //timestamp
    this.entries.push(new entry(title,content,author,timestamp));
    console.log(title+content+author+timestamp);
    //call to publish entry function - written below.
};

// 2.2 Add Tags to Entries

entry.prototype.addTag = function(tag){
        this.tags.push(tag);
    }


// Model 3 --  (Is this the Controler? Ask John)
// 3.1 Search title, content, author

Journal.prototype.searchEntries = function(searchString) {
        for (var entriesIndex = 0; entriesIndex < this.entries.length; entriesIndex++) { 
            if (
                this.entries[entriesIndex].title.search(searchString) > -1 || 
                this.entries[entriesIndex].content.search(searchString) > -1 ||
                this.entries[entriesIndex].author.search(searchString) > -1)
                {searchEntriesResults.push(this.entries[entriesIndex])}//end if action
        
        }//end of For
        console.log(searchEntriesResults);
        return searchEntriesResults;
    }//end searchEntries function

//3.2 Search by Title

Journal.prototype.searchTitle = function(searchString){    
    for(var entriesIndex = 0; entriesIndex < this.entries.length; entriesIndex++){
        if (this.entries[entriesIndex].title.search(searchString) > -1)
        this.entries[entriesIndex].push(searchTitleResults);
        console.log(this.entries[entriesIndex]);
    }

    return searchTitleResults;
    //searchTitleResults array will contain the index numbers of the matching entries with entries array.
}

Journal.prototype.getEntries = function(entryList) {

    var entryResults = [];
    // for each entryID in entryList loop to access entries in entryList
        entryResults.push(this.entries[entryID])
    return entryResults;
}

    // myJournal.getEntries(myJournal.searchTitle("text"));

//  entry Functions:

//3.2.1 Search Tags

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







//     for(var entriesIndex = 0; entriesIndex< this.entries.length; entriesIndex++){
//         if(this.entries[entriesIndex].title.search(searchString) > -1)
//             console.log(this.entries[entriesIndex]);
//             result = true;
//     }
// }


// Push HTML Functions
function generateAllEntriesHtml(currentEntryTitle){
    var html = '<li>'+'<a href="#'+currentEntryTitle+'"'+'>'+currentEntryTitle+'</a>'+'</li>';
    return html;
}

//Search Result Funtions

// 1. Generate List Heading and <ul>
    function generateSearchListHeadingHtml(currentEntryTitle){
        var html = '<p>'+'Search Results:'+'</p>'+'<ul>';
        return html;
    }

// 2. Generate Search Results in <li>
    function generateSearchListItemsHtml(currentEntryTitle){
        var html = '<li>'+'<a href="#'+currentEntryTitle+'"'+'>'+currentEntryTitle+'</a>'+'</li>'+'</ul>';
    }

//Generate Items Modals
    function generateEntryModal(currentEntryTitle,currentEntryContent,currentEntryAuthor){
        var modalHtml = '<div id="'+currentEntryTitle+'"'+'class="modalDialog"' + '>'+'<div>'+'<a href="#close" title="Close" class="close">X</a>'+'<h2>'+currentEntryTitle+'</h2>'+'<p>'+currentEntryContent+'</p>'+'</div>'+'</div>'
        // console.log(modalHtml);
        return modalHtml;
}
//Generate List of Search Results
   //Generate List of Search Results by Title
             // generate html
        // var html = generateHtml(title);
        // // console.log(html);
        // $("#searchResults").html(html);


//Helper Functions

// function basicLoop (againstMeasure){

//Johnson's 3 buttons in one form code
function bindListners(){
 $('.edit').unbind('submit');
 $('.edit').submit(function(event){
     event.preventDefault();
     var frm = $(this);
     var btn = frm.find("button:focus").attr('data-btn');
     if (btn == "add-tag"){
       addTagFromForm(frm);
     } else if (btn == "delete"){
       deleteFromEntry(frm);
     } else {
       populateModal(frm);
     }
 });
}

// Main Create Entry Function tied to Create Function Form.
function entryForm(frm){
    //collect values from form
    title = frm.find('input[name="title"]').val();
    content = frm.find('textarea[name="content"]').val();
    tags = frm.find('input[name="tags"]').val();
    author = frm.find('input[name="author"]').val();
    //timestamp
    timestamp = new Date();
    console.log(title+content+author+timestamp);
    //create new entry
    MyJournal.createEntry(title,content,author,timestamp);
}


   // generate html
    //     var html = generateAllEntriesHtml(title);
    //     // console.log(html);
    //     $("#response").append(html);
    //     var modalHtml = generateEntryModal(title,content,author);
    //     // console.log(modalHtml);
    //     $('#dummyModal').before(modalHtml);
    // // this.entries[1].timestamp = d;
    // };


var MyJournal = new Journal();
MyJournal.createEntry('jogging', 'I went Jogging', 'Michael');
MyJournal.createEntry('sailing', 'I went sailing', 'Michael');
MyJournal.createEntry('sailing on a tuesday', 'I went sailing on tuesday', 'Michael');
MyJournal.createEntry('reading', 'I spent the afternoon reading.', 'Michael');
MyJournal.entries[1].addTag('sailing');
MyJournal.entries[0].addTag('jogging');
MyJournal.entries[1].addTag('sports');
MyJournal.entries[0].addTag('sports');
MyJournal.entries[0].addTag('Friday');
// MyJournal.searchEntries('went');
// MyJournal.searchTags('Friday');