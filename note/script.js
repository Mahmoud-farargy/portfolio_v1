var loggedInToAccount = false;//note: this is a global variable
const NoteApp= {
    data: function(){
      return {
        addNoteOrQuote: "Note",
        newOutput: '',
        quoteList: this.$store.state.quotes,
        notes: this.$store.state.notes,
        trash: this.$store.getters.trash,
        newNote: '',
        noteModal: '',
        titleModal:'',
        createdDateModal:'',
        changeModalDetails: '',
        noteTitle: '',
        changeModalTitle: '',
        authorName: '',
        editClicked: false,
        cleared: true,
        clearedText: true,
        colorOptions: false,
        applyBlue: false,
        applyTango: false,
        applyRed: false,
        applyTurquoise: false,
        emptyField: false,
        specialIndex: 0,
        search: '',
        searchNoteText: '',
        buttonIndex: 0,
        showTitleAlert: false,
        elementWidth: 100,
        editedItems: [],
        todaysDate: "",
        firebaseNotes: "",
        tempResetData: [],
        createAccountMessage: "",
        connectionError: "",
        descriptionChars: "",
        editable: false,
        selectedColor: "white",
        editedColor: "",
        inset: false,
        loading: true,
        editColorsClicked: false,
        dialog: false,
        valid: true,
        drag: false,
        showDoneList: false,
        isUserOnline: navigator.onLine,
        lazy:false,
        MSG: "",
        isImageUploading: false,
        imageURL: "",
        noteModalImage: "",
        enableSpeakFeature: true,
        uploadingImgError:"",
        imageInserted: false,
        uploadingImgErrFound: false,
        speakerPlayNStopSwitch : true,
        oldNoteIndex: "",
        newNoteIndex: "",
        titleRules:[
          v => !!v || 'Title is required',
          v => (v && v.length <= 20) || 'Name must be less than 20 characters',
          ],
        direction: 'left',
        // fling: false,
        // hover: true,
        // tabs: null,
        transition: 'slide-x-reverse-transition',
        disableDragging: true,
        }
      },
      props:{
        userLoggedIn: [Boolean], //received "userLoggedIn" data as  props
        notification: [Function],
        isDataLoaded: [Boolean],
    },
    
    //   ,
    //   launchSearch: function(){
    //     return this.notes[0].titles.filter((element)=>{
    //      return element.toLowerCase().match(this.search.toLowerCase());
         
    //     })
    //  }
    
    watch: {
      overlay (val) {
        val && setTimeout(() => {
          this.overlay = false
        }, 3000)
      },
    },
    template: `
<div id="mainNotesSection">
<h3 class="mt-3 display-4 text-center" style="letter-spacing:1.5px;">Memo</h3>
<div class="text-center">
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
<v-skeleton-loader v-if="loading && isUserOnline"
height="100vh;"
style="width:70%; margin:100px auto 0 auto; overflow:hidden"
type="paragraph"
></v-skeleton-loader>


<div v-if="isDataLoaded && isUserOnline" v-html="createAccountMessage"></div>
<div v-html="connectionError"></div>
  
<div v-if="!loading && isDataLoaded && userLoggedIn" class="mainSection">
    

  
    <div class="container pb-0">
    
    
      <!--<button id="changeDirection" title="Change display direction"   class="btn btn-light ml-5 mb-4 border border-dark directionBtn"><span><img style="width:30px;" src="horizontal-direction.png"></span></button>-->
      <!-----To do list------>
    <section v-if="toDoListLength || $store.state.toDoList[0].done.length >0">
      
        <div class="progress-display m-auto">
          <h5 class="text-left text-warning trash-titles mt-1 mb-4">To-do items added: Undone <strong class="text-primary">{{$store.state.toDoList[0].undone.length}}</strong>, Done <strong class="text-primary">{{$store.state.toDoList[0].done.length}}</strong></h5>
        </div> 
        <draggable class="toDoDragContainer" v-model="$store.state.toDoList[0].undone" ghost-class="ghost" @start="toDoDragStart" @end="toDoDragEnd">
         <!---Edit area--remove later--->
         <transition-group  name="fade" appear class="toDoParent">
          <div v-for="(undoneList,index) in $store.state.toDoList[0].undone" class="col-md-12" :key="index+$store.state.toDoList[0].id">
            <div class="toDoItem" @click="moveToDoneSection(index)">
              <input type="checkbox" class="mr-1"> 
              <v-icon @click.stop="deleteToDoItem(index,'undone')" color="red" class="mr-1">mdi-trash-can</v-icon>
                <p style="width:90%; margin-top:22px;">{{undoneList}}</p>
              <v-icon color="primary" class="positionFavToDo">mdi-star</v-icon>
            </div>
          </div>
         </transition-group>
        </draggable>
        <div style="position:relative;">
<v-btn @click="showDoneList = !showDoneList" class="thingsDoneBtnStyle" dark color="blue-grey darken-4">${this.showDoneList ?'<i  class="fas fa-chevron-down mr-1"></i>' :'<i  class="fas fa-chevron-up mr-1"></i>'} Things done</v-btn>
      </div>
         <draggable v-if="showDoneList" v-model="$store.state.toDoList.done">
          <transition-group name="fade" class="toDoParent" >
          <div v-for="(doneList,index) in $store.state.toDoList[0].done" :key="$store.state.toDoList[0].id+index">
            <div class="toDoItem styleDoneList" @click="moveToUndoneSection(index)">
                <input id="doneCheck" type="checkbox" class="mr-1"> 
                <v-icon @click.stop="deleteToDoItem(index,'done')" color="red" class="mr-1">mdi-trash-can</v-icon>
                  <p style="width:90%; margin-top:22px;">{{doneList}}</p>
                <v-icon color="primary" class="positionFavToDo">mdi-star</v-icon>
              </div>
            </div>
          </transition-group>
         </draggable>
        
      </section>
      <!---------end to do--------->
        <div v-if="quoteProgressWidth>0" class="progress-display m-auto"> 
                  <h5 class="text-left text-warning trash-titles mt-1">Quotes Added: <strong class="text-primary">{{quoteProgressWidth}}</strong></h5>
        </div>
    </div>
      
      <div class="quote-text-container container">
          <div class="my-3 mr-3 changeD">
          <transition-group name="fade" class="quoteGrid" style="width:100%; margin:0; padding:0;">
            <li class="my-2" v-for="(quote, index) in $store.state.quoteList[0].quoteDetails" :key="$store.state.quoteList[0].id[index]">
                <div class="quote-text px-3 changeD2 thumbnail-settings  text-dark bg-warning"style="overflow:auto;height:140px;" >
                  <i class="fas fa-times delete-quote" style="cursor:pointer;" @click="deleteQuote(index)"></i>
                  <div class="positionDate">
                    <small >{{$store.state.quoteList[0].createdDate[index]}}</small>
                  </div>
                  <blockquote class="blockquote">
                    <h5 style="white-space:pre-line;">{{quote}}</h5>
                    <footer>
                          <small class="text-muted" v-html="$store.state.quoteList[0].authors[index] !== '' ? '~ ' +  $store.state.quoteList[0].authors[index] : null " style="white-space:nowrap; font-size:17px; font-family:'Arial, Helvetica, sans-serif'"></small>
                    </footer>
                  </blockquote>
                  
                </div>
            </li>
            </transition-group>
          </div>
<!-- <transition name="fade"> -->
<div id="mainNotes" >

<div  v-if="notesProgressWidth>0" class="progress-display m-auto">
    <v-divider v-if="notesProgressWidth > 0 && quoteProgressWidth >0" :inset="inset"></v-divider>
    <div class="position-note-upper-elements">
      <h5 class="text-left text-warning mt-4 trash-titles">Notes Added: <strong class="text-primary">{{notesProgressWidth}}</strong></h5>
      <v-icon size="30" v-if="disableDragging" @click="disableDragging= false" color="orange" style="cursor:pointer; width:30px; height:30px;"> mdi-lock</v-icon>
      <v-icon size="30" v-if="!disableDragging" @click="disableDragging = true" color="green" style="cursor:pointer; width:30px; height:30px;"> mdi-lock-open-variant</v-icon>
    </div>
 </div> 
  
<!-- </transition> -->
        <!--NOTES-->
       <!-- <div class="alert alert-info py-1"><h3 class="mt-2">Notes</h3></div> -->
        <div class="mt-3 changeD timeline">
          <div class="vertical-divider"></div>
        <draggable class="draggableContainer" :move="checkMove" handle=".draggable-area" v-model="$store.state.notes" @start="drag = true" ghost-class="ghost" @end="onEnd">
          <transition-group name="fade" class="row" >
            <div class="col-md-12 my-2 noteCard sortable" v-for="(note, index) in $store.state.notes" :key="note.id">
              <div class="timeline-dot" data-toggle="tooltip" data-placement="top" :title="note.createdDate"><div></div></div>
                  <div  class="note-text changeD2 text-dark"  :class="{[note.color]: userLoggedIn, addMoreStyles: userLoggedIn && note.color !== 'white' , draggingStyle: drag}">
                    <div class="note-text-size pt-2 pb-4" data-toggle="modal" data-target="#note-modal" @click="getNoteIndex(index)">
                      <h3 class="text-center NoteTitle " v-html="note.titles"></h3>                      
                      <div class="divider"></div>
                      <blockquote class="blockquote">
                        <p style="white-space: pre-line;">{{note.details}}</p>
                      </blockquote>
                    </div>

          <!------Draggable------>
          <div v-if="!disableDragging" class="draggable-area">
            <v-icon light>mdi-drag</v-icon>
          </div> 
    <!---Note control buttons---->
<div class="note-controls p-1">

  <v-speed-dial
      class="speed-dial-position"
      :direction="direction"
    >
      <template v-slot:activator>
        <v-btn
          color="blue darken-2"
          dark
          fab
        >
          <!--<v-icon v-if="fab">mdi-close</v-icon>-->
          <v-icon >mdi-file-cog</v-icon>
        </v-btn>
      </template>

      <v-btn
        fab
        dark
        small
        color="red"
        title="Delete" @click.stop="deleteNote(index)"
      >
        <v-icon>mdi-delete</v-icon>
      </v-btn>

      <v-btn
        fab
        dark
        small
        color="green"
        title="Edit" @click.stop="editNote(index)"
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="indigo"
        title="Copy" @click.stop="copyNote(index)"
      >
        <v-icon>mdi-content-copy</v-icon>
      </v-btn>
      
      

      <v-btn
        fab
        dark
        small
        color="darkGrey"
        title="Preview" data-toggle="modal" data-target="#note-modal" @click="getNoteIndex(index)"
      >
        <v-icon>mdi-eye</v-icon>
      </v-btn>
      
    </v-speed-dial>
    <div class="positionEdited">
          <v-icon class="square-edit mr-1" style="font-size:17px;" v-if="$store.state.notes[index].edited.length >0">mdi-square-edit-outline</v-icon><small class="text-edit text-muted" v-html="$store.state.notes[index].edited"></small>
    </div>
</div>

                      <!---<div class="note-controls p-1 text-align-right">
                      <hr>

                      <div style="display:flex; flex-direction:row !important; justify-content: space-between;">
                          <div>
                          <small class="text-muted" v-html="$store.state.notes[index].edited"></small>
                        </div>
                        <div class="note-controls-inner">
                          
                        <i class="fas fa-eye text-dark fa-lg px-2"></i>
                        
                        <i class="fas fa-edit text-success fa-lg  px-2"></i=>
                        <i data-toggle="tooltip" ></i>
                        <i class="fas fa-trash-alt text-danger fa-lg px-2" ></i>
                        </div>
                      </div> 
                      
                     
                      
                      </div> -->
                    </div>
                </div>
                </transition-group>
                </draggable>
          </div>
        
          <!--PREVIEW NOTE MODAL--->
    </div>
      <div id="note-modal" class="modal fade" v-if="notesProgressWidth>0">
        <div class="modal-dialog">
          <div class="modal-content" style="position:relative;">
            <div class="modal-header py-1 fixed-header" >

            <div v-if="enableSpeakFeature" class="speakTxtStyle" >
              <v-btn  @click="speakText" v-if="speakerPlayNStopSwitch" dark fab small color="purple" >
                <v-icon >mdi-volume-medium</v-icon>
              </v-btn>
              
              <v-btn  @click="stopSpeech" v-if="!speakerPlayNStopSwitch"dark fab small color="green">
                <v-icon>mdi-volume-mute</v-icon>
              </v-btn>
            </div>

              <div class="d-flex flex-column text-center justify-content-center w-100">
                <h3 class="modal-title text-capitalize">{{titleModal}}</h3>
                <time class="text-center text-muted d-block">Created on {{createdDateModal}}</time>
                <time class="text-center text-muted d-block" id="modDate"></time>
              </div>
              
              <h6 class="close mr-2 desktop-close-modal" @click="closeNoteModal" data-dismiss="modal"  style="max-width:20px; font-size: 30px; cursor:pointer;">&times;</h6>
            </div>
            <div class="modal-body"style="background-color:rgb(250, 250, 237);  position:relative;">
              <div v-if="noteModalImage !=='' " class="note-image-container">
                <img :src="noteModalImage" :alt="titleModal" class="noteImage">
              </div>

                  <article  class="noteOverlay">{{noteModal}}</article>
                  <h6 class="close mobile-close-modal mr-2" data-dismiss="modal" @click="closeNoteModal" style="max-width:20px; font-size: 30px; cursor:pointer;">&times;</h6>
            </div>
            <div class="modal-footer py-2">
                <button class="btn btn-dark py-1"  @click="closeNoteModal" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
       
      </div>

    <!----Note Edit------>
      <!-- <div id="note-search" class="modal fade" v-if="notesProgressWidth>0">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header py-1"><h6 class="close mr-2" data-dismiss="modal"  style="max-width:20px; font-size: 30px;">&times;</h6></div>
              <div class="modal-body">
                
                
                    <p>{{searchNoteText}}</p>
              </div>
            </div>
          </div>
         
        </div>-->
  
  
      <div class="editNote" v-if="editClicked">
    
        <div class="modal-dialog" >
      <transition name="fade">
          <div class="modal-content" style="overflow-y:auto;" :class="{[$store.state.notes[specialIndex].color]: !editColorsClicked && userLoggedIn, [editedColor]: editColorsClicked}">
              <div class="modal-header p-1 py-4">
                <h2 class="mr-auto" @click="closeModal" style="cursor: pointer">&times;</h2>
                  <div class="modal-body p-1 py-4">
                    <form>
                    <label for="title">Title</label>
                      <input class="form-control mb-3" type="text" v-model="changeModalTitle" @input="editable = changeModalTitle !== $store.state.notes[specialIndex].titles">
                      <div class="alert alert-danger text-center p-1" v-if='showTitleAlert' >
                          <p>The title should be between 1 and 20 characters.</p>
                        </div>
                    <label for="description my-2">Description</label>  
                      <textarea id="description" class="form-control" @input="editable = changeModalDetails !== $store.state.notes[specialIndex].details" v-model="changeModalDetails" :keyup.enter="finishEdit" style="min-height:190px !important;"></textarea>
                      
                      <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter" @before-leave="beforeLeave" @leave="leave">
                            <div v-if="addNoteOrQuote === 'Note'" class="color-options d-flex justify-content-center align-items-center  mx-auto p-2 my-4">
                              <button class="btn btn-primary  border border-dark mr-2" @click.prevent="editColorsClicked= true, editedColor ='blue'" style="width:30px; height: 30px; border-radius: 50px;" title="Blue"></button>
                              <button class="btn border border-dark my-1 mr-2" @click.prevent=" editColorsClicked= true, editedColor = 'tango'" style="width:30px; height: 30px; background-color:RGB(221, 65, 36); border-radius: 50px;"  title="Tango" ></button>
                              <button class="btn border border-dark my-1 mr-2" @click.prevent=" editColorsClicked= true, editedColor = 'trueRed'" style="width:30px; height: 30px; background-color:RGB(188, 36, 60); border-radius: 50px;" title="True Red"></button>
                              <button class="btn border border-dark my-1 mr-2" @click.prevent=" editColorsClicked= true, editedColor = 'blueTurquoise'" style="width:30px; height: 30px; background-color:RGB(85, 180, 176); border-radius: 50px;" title="Turquoise" ></button>
                              <button class="btn border border-dark my-1 mr-2" @click.prevent=" editColorsClicked= true, editedColor = 'lightBlue'" style="width:30px; height: 30px;  background-color:#2196f3; border-radius: 50px;" title="Light Blue"></button>
                              <button class="btn border border-dark my-1 mr-2" @click.prevent=" editColorsClicked= true, editedColor = 'lightGreen'" style="width:30px; height: 30px;  background-color:#4caf50; border-radius: 50px;" title="Light Green"></button>
                              <button class="btn border border-dark my-1 mr-2" @click.prevent=" editColorsClicked= true, editedColor = 'orangeClr'" style="width:30px; height: 30px;  background-color:#ff9800; border-radius: 50px;" title="Orange"></button>
                              <button class="btn border border-dark my-1 mr-2" @click.prevent=" editColorsClicked= true, editedColor = 'purpleClr'" style="width:30px; height: 30px;  background-color: #9c27b0; border-radius: 50px;" title="Purple"></button>
                              <button class="btn border border-dark my-1 mr-2" @click.prevent=" editColorsClicked= true, editedColor = 'pinkClr'" style="width:30px; height: 30px;  background-color:#e91e63; border-radius: 50px;" title="Pink"></button>
                              <button class="btn border border-dark my-1 mr-2" @click.prevent=" editColorsClicked= true, editedColor = 'darkGreyClr'" style="width:30px; height: 30px; background-color:#424242; border-radius: 50px;" title="Dark Grey"></button>
                            </div>
                      </transition>
                      
                      <div class="my-3">
                        <button class="btn btn-info  mr-2" @click.prevent="finishEdit" :disabled="!this.editable" :class="{disabled: !this.editable}">Save changes & close</button>
                        <button class="btn btn-info " @click.prevent="storeEditData" :disabled="!this.editable || tempResetData === []" :classs="{disabled: !this.editable || tempResetData == []}">Reset</button>
                      </div>
                  </form>
                    </div>
                </div>
            </div>
          </transition>
        </div>
    </div> 

</div>



<!---Add modal--->

<transition name="fade">
    <v-row justify="center">
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <template v-slot:activator="{ on, attrs }">
      <div class="fixedBtnBox">
        <v-btn fab href="#mainNotesSection" id="arrowUpBtn" class="positionArrowUp" color="green" ><v-icon>mdi-arrow-up-bold-hexagon-outline</v-icon></v-btn>
        <v-btn fab dark @click="resetAddFields" :disabled="isImageUploading" :class="{disabled: isImageUploading}" color="orange accent-4" v-if="isUserOnline && userLoggedIn" v-on="on" v-bind="attrs" title="Add" class="plus-circle d-flex justify-content-center align-items-center"><v-icon>mdi-plus</v-icon></v-btn>
      </div>
        </template>
  
    <div style="transition: all 0.5s linear">
    <transition name="fade" >
      <v-card :class="{[selectedColor] : userLoggedIn && addNoteOrQuote ==='Note' , 'addMoreStyles': selectedColor !== 'white'}">
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog = false, this.newOutput = '', this.noteTitle = '', this.authorName = ''">
            <v-icon @click="imageURL = ''">mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Form</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
          <v-btn id="addNote" text class="mr-3 desktop-app-btn" :disabled="!valid" @click.prevent="addNewItem" >Add</v-btn>
    
          </v-toolbar-items>
        </v-toolbar>
       

<form class="my-5 container"  id="addingForm">
  <v-form ref="form" v-model="valid" :lazy-validation="lazy">
      <h3 class="mb-3 mt-0">Add a new {{addNoteOrQuote}}</h3>

                <div  class="d-flex flex-column my-3">
   
                  <v-text-field
                  v-show="addNoteOrQuote === 'Note'"
                  v-model="noteTitle"
                  :value="titleRules"
                  :dark="selectedColor != 'white' && addNoteOrQuote === 'Note'"
                  class="mb-2"
                  :counter="20"
                  label="Title"
                  required
                  @input="validate"
                ></v-text-field>

                <v-text-field
                  v-if="addNoteOrQuote === 'Quote'"
                  type="text" v-model="authorName"
                  :dark="selectedColor != 'white' && addNoteOrQuote === 'Note'"
                  class="mb-2" id="authorField"
                  :value="titleRules"
                  :counter="20"
                  label="Author"
                  required
                  @input="validate"
                ></v-text-field>


                <v-textarea 
                :dark="selectedColor !== 'white' && addNoteOrQuote === 'Note'"
                required class="quote-textarea mb-2" label="Description" v-model="newOutput" row="3" @input="descriptionChars= newOutput.length " v-on:keyup.enter id="textArea editor1" ></v-textarea>
                
                <p class="desc-chars">{{descriptionChars}}</p>
                      
                      

                  <v-select
                    :items="['Note','Quote', 'To-do list']"
                    v-model="addNoteOrQuote"
                    :dark="selectedColor !== 'white' && addNoteOrQuote === 'Note'"
                    class="selectInput mt-2"
                    label="Type"
                    required
                  ></v-select>
                      <v-subheader style="padding:0px;" :dark="selectedColor != 'white'" v-if="addNoteOrQuote === 'Note'" >Set a background color</v-subheader>
                      <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter" @before-leave="beforeLeave" @leave="leave">
                            <div v-if="addNoteOrQuote === 'Note'" class="color-options d-flex justify-content-center align-items-center p-2 my-4" style="overflow:hidden; border-radius:25px; background-color:rgb(201, 216, 218);">
                              <button class="btn btn-primary  border border-dark mr-2" @click.prevent="applyBlue = !applyBlue, selectedColor ='blue'" style="width:30px; height: 30px; border-radius: 50px;" title="Blue"></button>
                              <button class="btn border border-dark my-1 mr-2 " @click.prevent="applyTango = !applyTango, selectedColor = 'tango'"style="width:30px; height: 30px; background-color:RGB(221, 65, 36); border-radius: 50px;"  title="Tango" ></button>
                              <button class="btn border border-dark my-1 mr-2" @click.prevent="applyRed = !applyRed, selectedColor = 'trueRed'"  style="width:30px; height: 30px; background-color:RGB(188, 36, 60); border-radius: 50px;" title="True Red"></button>
                              <button class="btn border border-dark my-1 mr-2" @click.prevent="applyTurquoise = !applyTurquoise, selectedColor = 'blueTurquoise'" style="width:30px; height: 30px; background-color:RGB(85, 180, 176); border-radius: 50px;" title="Turquoise" ></button>
                              <button class="btn border border-dark my-1 mr-2" @click.prevent=" selectedColor = 'lightBlue'" style="width:30px; height: 30px;  background-color:#2196f3; border-radius: 50px;" title="Light Blue"></button>
                              <button class="btn border border-dark my-1 mr-2" @click.prevent=" selectedColor = 'lightGreen'" style="width:30px; height: 30px;  background-color:#4caf50; border-radius: 50px;" title="Light Green"></button>
                              <button class="btn border border-dark my-1 mr-2" @click.prevent=" selectedColor = 'orangeClr'" style="width:30px; height: 30px;  background-color:#ff9800; border-radius: 50px;" title="Orange"></button>
                              <button class="btn border border-dark my-1 mr-2" @click.prevent=" selectedColor = 'purpleClr'" style="width:30px; height: 30px;  background-color: #9c27b0; border-radius: 50px;" title="Purple"></button>
                              <button class="btn border border-dark my-1 mr-2" @click.prevent=" selectedColor = 'pinkClr'" style="width:30px; height: 30px;  background-color:#e91e63; border-radius: 50px;" title="Pink"></button>
                              <button class="btn border border-dark my-1 mr-2" @click.prevent=" selectedColor = 'darkGreyClr'" style="width:30px; height: 30px; background-color:#424242; border-radius: 50px;" title="Dark Grey"></button>
                            </div>
                      </transition>

                   <div v-if="emptyField" class="alert alert-danger text-center mt-2 mb-0"><p>The fields above should not be empty.</p></div>
                      <div v-if="addNoteOrQuote === 'Note'" class="my-4 d-block" >
                        <p>Attach an image</p>
                        <img id="showUpUploadedImg" class="uploadedImg mb-2">
                        <div v-html="uploadingImgError"></div>
                            <p v-if="isImageUploading" class="mx-auto mb-3" >Loading...</p>
                        <div style="d-flex justify-content-space-between">

                        <v-file-input show-size :dark="selectedColor !== 'white' && addNoteOrQuote === 'Note'" counter @change="uploadImg" id="imageFile" class=" fileUpload" multiple label="File input"></v-file-input>
                        
                          <v-btn dark color="red lighten-4" v-if="imageInserted" class="mt-2" @click="removeUploadedFile">Remove file</v-btn>
                        </div>
                      </div>
                      
                </div>
                <div class="button-panel-container">
                    <div class="button-panel">
                      <button id="addNote" text class="btn btn-primary mobile-app-btn mr-2" :disabled="!valid" @click.prevent="addNewItem" >Add</button>
                      <button class="btn btn-danger"  v-if="cleared, quoteProgressWidth>0 || notesProgressWidth>0" @click.prevent="clearedText= !clearedText">Clear All</button>
                    </div>
                    <transition name="fade">
                      <div v-if="!clearedText" pb-3 class="my-5 button-panel2">
                        <button class="btn btn-danger m-2" v-if="quoteProgressWidth>0" v-once @click.prevent="clearQuotes">Clear All Quotes</button>
                        <button class="btn btn-danger" v-if="notesProgressWidth>0" v-once @click.prevent="clearNotes">Clear All Notes</button>
                      </div>
                    </transition>
                  </div>
                </v-form>
            </form>

      </v-card>
      </transition>
      </div>
    
   
    </v-dialog>
  </v-row>
  </transition>
  
  
          
      
           
    

      <div v-if="isDataLoaded && notesProgressWidth == 0 && quoteProgressWidth == 0 && dialog===false" class="alert alert-info quote-alert mt-5 mx-auto text-center"><h6>Info: Press the plus button at the bottom to start adding notes.</h6></div>
      <div v-if="!isUserOnline" class="offline-alert alert alert-danger mt-5 mx-auto text-center"><h6 class="mt-1">Offline</h6></div>
  
    
  </div>
</div>
    `,
    methods:{
      addNewItem: function(){
        
        if(this.newOutput.length== 0){
          this.emptyField= true;
          document.querySelector(".quote-textarea").style.border="1px solid rgb(141, 42, 42)";
        }else{
          this.emptyField= false;
          document.querySelector(".quote-textarea").style.border="none";
        }

        // var valAuthor = document.getElementById("author").value;
      //if quote is selected
          
              if(this.addNoteOrQuote === "Quote"){
                //passes all info of the new quote through "commit"
                this.$store.commit("addToQuotes",{
                  text:this.newOutput,
                  author:this.authorName,
                  createdDate: this.todaysDate,
                  id:this.generateNewId()
                })
                this.newOutput="";
                this.authorName="";
                this.quoteProgressWidth+=1;
                this.dialog= false;    
                this.emptyField= false;
                
                this.notification("Quote stored.", "success");  
                // this.$http.post('https://note-keeper-app.firebaseio.com/quotes.json',this.$store.state.quoteList)
                //     .then(response =>{
                //       console.log(response);
                //     }, error=>{
                //       console.log(error);
                //     })
                  
                //sends data to the server

                this.refreshData();

                $("#changeDirection").css("visibility","visible"); //if note is selected
            }else if(this.addNoteOrQuote === "Note" && this.noteTitle.length >0 && !this.uploadingImgErrFound){
              this.$store.commit("addToNotes",{ //passes info to the store
                details:this.newOutput,
                titles: this.noteTitle,
                createdDate: this.todaysDate,
                color: this.selectedColor,
                id: this.generateNewId(),
                img: this.imageURL.length >0 ? this.imageURL : ""
              })
              console.log(this.$store.state);
              this.newOutput= "";
              this.noteTitle= "";
              this.imageURL= "";
              this.notesProgressWidth+=1;
              this.dialog= false;
              this.emptyField= false;
              this.refreshData();
              this.notification("Note stored.", "success"); 
              //send data to the server
              // firebase.auth().onAuthStateChanged(user=>{
              //   console.log(user);
              //   if(user){
              //     db.collection("users").doc(user.uid).set({
              //       notes: this.$store.state.notes,
              //       quotes: this.$store.state.quoteList
              //     });
              //   }
                
              // });

              //real-time
              // this.$http.post('https://note-keeper-app.firebaseio.com/notes.json',this.notes)
              //       .then(response =>{
              //         console.log(response);
              //       }, error=>{
              //         console.log(error);
              //       })

                    // var count = 2;
                    // var interval = setInterval(()=>{
                    //   count--;
                      // this.$http.put("https://note-keeper-app.firebaseio.com/notes.json", this.notes)
                      // .then(request=>{
                      //   console.log(request);
                      // }, error=>{
                      //   console.log(error);
                      // });
                  // },2000)
                  // if(count <= 0){
                  //   window.clearInterval(interval);
          
                  // }
                  
            //  db.collection("notes2").add({
            //       details: this.newOutput,
            //       title: this.noteTitle
            //  });      
              $("#changeDirection").css("visibility","visible");
            }else if(this.addNoteOrQuote === "To-do list" && this.newOutput.length >0){
              this.$store.commit("addNewToDo", {
                undone: this.newOutput,
                id: this.generateNewId()
              })
              this.toDoListLength+1;
              this.dialog= false;
              this.refreshData();
              this.notification("To-do item stored." ,"success");
              this.newOutput= "";
            }
          
      },
      deleteQuote(index){
        console.log(this.$store.state.quoteList);
        if(confirm("Are you sure you want to delete this quote?")){//sends deleted data to the trash array
           //deletes current data from the "quoteList" array in the main store
          //passes the index of the element that supposed to be deleted from the store
          this.$store.commit("removeFromQuotes", index);
          this.quoteProgressWidth-=1;
          this.authorName= "";
          this.notification("Quote moved to trash.", 'yellow');
        
          
          console.log(this.trash.quotes, this.$store.state.quoteList);
          this.refreshData();
        }
        
        
      },
      clearQuotes: function(){
        if(confirm("All quotes will be deleted. Proceed?")){
          this.$store.commit("clearQuotes");
          this.newOutput="";
          this.quoteProgressWidth= 0;
          this.cleared= true;
          this.dialog= false;
          $("#changeDirection").css("visibility","hidden");
           this.notification("All quotes have been deleted", "yellow");
        }
        this.refreshData();
      },
      clearNotes: function(){
        if(confirm("All notes will be deleted forever. Proceed?")){
          this.$store.commit("clearNotes");
          this.notesProgressWidth= 0;
          this.newOutput= "";
          this.noteTitle= "";
          this.cleared= true;
          this.emptyField= false;
          this.dialog= false;
          this.notification("All notes have been deleted", "yellow");
          this.refreshData();
          $("#changeDirection").css("visibility","hidden");
        }
      },
      deleteNote: function(index){
          this.refreshData();
        if(confirm(`Are you sure you want to delete ${this.$store.state.notes[index].titles}?`)){
          // passing the index to the store to delete the precise element
          this.$store.commit("removeFromNotes", index);
          this.notesProgressWidth-=1;
          this.newOutput="";
          this.refreshData();
          this.notification("Note moved to trash.", "yellow");
        }
        
      },
      getNoteIndex: function(index){
        $("#note-modal").modal({backdrop: 'static',keyboard: false});
        document.body.style.overflowY = "hidden";
        this.noteModal = this.$store.state.notes[index].details;
        this.titleModal = this.$store.state.notes[index].titles;
        this.createdDateModal =this.$store.state.notes[index].createdDate;
        this.modifiedDateModal =this.$store.state.notes[index].modifiedDate;
        this.noteModalImage = this.$store.state.notes[index].img;
        console.log(this.noteModalImage);
        if(this.$store.state.notes[index].edited){
          this.changeModalModifiedDate = this.$store.state.notes[index].modifiedDate;
          document.getElementById("modDate").innerHTML =`Modified on ${this.modifiedDateModal}`;
        }else{
          document.getElementById("modDate").innerHTML = ``;
        }
      },
      copyNote: function(index){
        var $body = document.getElementsByTagName("body")[0];
        var copiedText= this.changeModalDetails= this.$store.state.notes[index].details;
        var $tempInput = document.createElement("INPUT");
        $body.appendChild($tempInput);
        $tempInput.setAttribute('value', copiedText);
        $tempInput.select();
        $tempInput.setSelectionRange(0, 99999)
        document.execCommand("copy");
        $body.removeChild($tempInput);
        this.notification("Copied to clipboard.",'success');
        this.refreshData();
      },
      editNote: function(index){     
        this.specialIndex= index;
        this.editClicked= true;//equalize the shown info in the modal to the respective note data
        this.changeModalDetails = this.$store.state.notes[index].details;
        this.changeModalTitle = this.$store.state.notes[index].titles;
          //pushes the modal info to the "tempResetData" array
        this.tempResetData.push(this.changeModalDetails);
        this.tempResetData.push(this.changeModalTitle);
        this.refreshData();
      },
      storeEditData(){
        this.changeModalDetails = this.tempResetData[0];
        this.changeModalTitle = this.tempResetData[1];
      },
      finishEdit: function(event){//overrides data
          event.preventDefault();
        if(this.$store.state.notes[this.specialIndex].details !== this.changeModalDetails || this.changeModalTitle !== this.$store.state.notes[this.specialIndex].titles){
            this.$store.commit("changeNote", {
              specialIndex: this.specialIndex,
              todaysDate: this.todaysDate, 
              editColorsClicked: this.editColorsClicked,
              editedColor: this.editedColor
            });
           
          
           this.editable = true;
           this.notification("Note updated.", 'success');
        }else{
           this.editable = false;
        }
        this.editable = false;
        if(this.changeModalTitle.length >0 && this.changeModalTitle.length <=20){
          
          this.$store.commit("commitChanges",{
            changeModalTitle: this.changeModalTitle,
            changeModalDetails: this.changeModalDetails,
            specialIndex: this.specialIndex
          });
            // ---updates data on the cloud
        // firebase.auth().onAuthStateChanged(user=>{
        //   if(user){
        //     db.collection("users").doc(user.uid).set({
        //       notes: this.notes,
        //       quotes: this.quoteList
        //     });
        //   }
        // });
        // console.log(this.notes, [...this.notes[0].createdDate,...this.notes[0].details[this.specialIndex]= this.changeModalDetails, ...this.notes[0].edited, ...this.notes[0].modifiedDate,...this.notes[0].title[this.specialIndex]=this.changeModalTitle]);
        this.refreshData();
        //-------------- 
          this.editColorsClicked =false;
          this.editClicked= false;
          this.showTitleAlert= false;
        }else{
          this.showTitleAlert= true;
        }
        
      },
      showColorOptions: function(){
        this.colorOptions= true;
      },
      closeModal: function(){
        this.editable = false;
        this.editClicked= false;
        this.editColorsClicked =false;
        this.tempResetData = []//deletes tempResetData info
      },
    beforeEnter(el){
      console.log("Before Enter");
      this.elementWidth=200;
      el.style.width= this.elementWidth +'px';
    },
    enter(el, done){
      console.log("Enter");
      let round= 1
      const interval = setInterval(() =>{
        el.style.width= (this.elementWidth + round * 10) + "px";
        round ++;
        if(round >  20){ 
            clearInterval(interval);
            done();
        }
      }, 20);
    
    },
    afterEnter(el){
      el.style.width= this.elementWidth= '270px';
    },
    beforeLeave(el){
      this.elementWidth= 270;
       el.style.width= this.elementWidth +'px';
    },
    leave(el, done){
      let round= 20;
      const interval = setInterval(() =>{
        el.style.width= (this.elementWidth - round * 60 ) + "px";
        round --;
        if(round == 0){
          clearInterval();
          done();
        }
        
      }, 20)
    },
    refreshData(){
            //update user information
            this.$store.commit("refreshData");
            //refresh notes
            // this.$http.put("https://note-keeper-app.firebaseio.com/notes.json", this.notes)
            // .then(request=>{
            //   console.log(request);
            // }, error=>{
            //   console.log(error);
            // });

            //   //refresh quotes
            // this.$http.put('https://note-keeper-app.firebaseio.com/quotes.json',this.quoteList)
            //         .then(response =>{
            //           console.log(response);
            //         }, error=>{
            //           console.log(error);
            //         }) 

        
      },
      generateNewId(){
      
          let char1 = "G";
          let char2 = "j";
          let char3 = "k";
          let char4 = "M";
          let char5 = "N";
          let char6 = "Z";
          var charRandom =()=>{
            return Math.floor((Math.random() *6 )+1);
          }
          for(let i = 0; i<5 ; i++){
            charRandom();//calls the "charRandom" function repeatedly 6 time, each time a new character will be created.
            switch (charRandom()){ //determines which new char will be created for each variable
              case 1:
                char1 = "A";
                break;
              case 2:
                char2 = "B"
                break;
              case 3:
                char3 = "C"
                break;
              case 4:
                char4 = "D"
                break;
              case 5:
                char5 = "E"
                break;
              default:
                char6 = "F"
            }
          };

          const numRandom=()=>{
            return char1 + char2 + char3 + Math.random() *9999 +1 + char4 + char5 + char6 ;
          }
          
          return numRandom();
        },
        validate () {
          // console.log(this.valid);
            this.$refs.form.validate()
        },
        closeNoteModal(){
          document.body.style.overflow = "auto";
          this.speakerPlayNStopSwitch = true;
          if(speechSynthesis){
            speechSynthesis.cancel(this.MSG);
          }
        },
        speakText(){
          this.speakerPlayNStopSwitch = false; //toggles the state
                if(new SpeechSynthesisUtterance()){
                  this.MSG =  new SpeechSynthesisUtterance();
                  this.MSG.text = this.titleModal + this.noteModal;
                  this.MSG.pitch =1;
                  this.MSG.volume =3;
                  this.MSG.rate =0.9;
                  if(speechSynthesis){
                      speechSynthesis.speak(this.MSG);
                      this.enableSpeakFeature = true;
                  }else{
                    this.enableSpeakFeature = false;
                  }
          }
        },
        stopSpeech(){
          this.speakerPlayNStopSwitch = true;
          if(speechSynthesis){
            speechSynthesis.cancel(this.MSG);
          }
        },
        uploadImg(){
          
          this.isImageUploading = true;
          const imageFile = document.getElementById("imageFile").files[0];
          if(imageFile){
            const name = this.todaysDate + "-" + imageFile.name;
            const metadata = {
              contentType :  imageFile.type
            }
            console.log(/image/g.test(metadata.contentType));
            if(/image/g.test(metadata.contentType)){
             
              const task = ref.child(name).put(imageFile, metadata);
              task.then(snapshot => snapshot.ref.getDownloadURL()).then(url=>{
                
                console.log(url);
                const showImg = document.getElementById("showUpUploadedImg");
                showImg.src = url;
                this.isImageUploading = false;
                this.imageInserted = true;
                this.imageURL = url;
                this.uploadingImgErrFound = false;
                this.uploadingImgError ="";
              }).catch(err =>{
                  this.uploadingImgErrFound = true;
                  this.uploadingImgError = `
                  <div class="alert alert-danger">
                      <p>${err}</p>
                  </div>
                  `;
                  this.imageURL = "";
                  console.log("Image upload failed.");
              })
              
              this.uploadingImgErrFound = false;
              this.uploadingImgError = "";
            }else{
              this.isImageUploading = false;
              this.uploadingImgErrFound = true;
              this.uploadingImgError = `
              <div class="alert alert-danger">
                  <p>Please upload an image file only.</p>
              </div>
              `;
            }
            
            
          }
          
        },
        removeUploadedFile(){
          this.imageURL = "";
          this.imageInserted = false;
          if(document.getElementById("imageFile")){
             document.getElementById("imageFile").files[0] = "";
          }
          this.isImageUploading = false;
          this.uploadingImgErrFound = false;
          this.uploadingImgError = "";
        },
        resetAddFields(){
          this.selectedColor = 'white';
          this.removeUploadedFile();
        },
        onEnd(event){
          this.refreshData();
          console.log(event, this.oldNoteIndex, this.newNoteIndex, this.$store.state);
          this.oldNoteIndex = event.oldIndex;
          this.newNoteIndex = event.newIndex;
          this.drag = false;
        },
        checkMove(){
          return !this.disableDragging;
        },
        toDoDragStart(){
          console.log("test start");
        },
        toDoDragEnd(){
          console.log("test end");
        },
        deleteToDoItem(index, type){
          this.$store.state.toDoList[0][type].splice(index,1);
          this.refreshData();
        },
        moveToDoneSection(index){
          this.$store.commit("moveToDoneSection", index);
          this.refreshData();
        },
        moveToUndoneSection(index){
          this.$store.commit("moveToUndoneSection", index);
          this.refreshData();
        }
    },
    computed:{ //updates lengths
      quoteProgressWidth:{
        get(){
          return this.$store.state.quoteList[0].quoteDetails.length;
        },
        set(update){
          return update;
        }
      },
      notesProgressWidth:{
        get(){
          return this.$store.state.notes.length;
        },
        set(update){
          return update;
        }
      },
      toDoListLength:{
        get(){
          console.log(this.$store.state);
          return  this.$store.state.toDoList[0].undone.length;
        },
        set(update){
          return update;
        }
      }
    },
    created(){
      $("#doneCheck").prop("checked",true); //needs to work
      $(".navbar-collapse").collapse("hide"); 
      $(window).scroll(function(){
        var scrollHeight= $(window).scrollTop();
        if(scrollHeight >= 1000){
          $(".positionArrowUp").css("display","flex");
        }else{
          $(".positionArrowUp").css("display","none");
        }
    });

      $("#arrowUpBtn").on("click", function(e){
        console.log("triggered");
          if(this.hash != ""){
            e.preventDefault();
            const hash = this.hash;
            $("html","body").animate({
                  scrollTop: $(hash).offset().top
            },1100, function(){
              window.location.hash = hash;
            });
          }
      });
      // db.collection("notes2").get().then(snapshot=>{
      //   this.setUpNotes(snapshot.docs);
      // });
      // db.collection("notes2").onSnapshot(snapshot=>{
      //   this.setUpNotes(snapshot.docs);
      // });
      //
            //Listens for auth status changes
     
       
      $(document).ready(()=>{
          if(this.quoteProgressWidth <= 0 && this.notesProgressWidth <= 0){
          $("#changeDirection").css("visibility","hidden");
        }else{
          $("#changeDirection").css("visibility","visible");
        }

      })
      
      //adds date
      const dayInTheMonth = new Date().getDate();
      const dayInTheWeek = new Date().getDay()+1;
      const month = new Date().getMonth();
      const year = new Date().getFullYear();
      const hours = new Date().getHours();
      let hrs, mins, period;
      //handles hours
      
      let weekDays = ["Sat", "Sun", "Mon", "Tues","Wed","Thur", "Fri"];
      let months =["Jan","Feb", "Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
      const day = weekDays[dayInTheWeek];
      
      setInterval( () =>{
                if(hours >12){
                hrs = hours-12;
              }else{
                hrs = hours;
              }
              
              if(hours  == 0){
                hrs = 12;
              }
              const minutes = new Date().getMinutes();
              //handle minutes
              if(mins <= 9){
                mins = "0"+minutes;
              }else{
                mins = minutes;
              }
              //handle period
              if(hours >12){
                period = "PM";
              }else{
                period ="AM";
              }
            this.todaysDate = day +", "+ dayInTheMonth+" "+months[month]+" "+year+" "+hrs+":"+mins+" "+period;
            this.isUserOnline = navigator.onLine;
      },1000);

      console.log(this.todaysDate);
        //fetch from firebase database
      firebase.auth().onAuthStateChanged(user=>{
        this.loading = true;
        // document.getElementById("mainSection").innerHTML = "loading.."
        if(user){
          this.loading = false;
          this.$store.commit("receiveDataFromServer", user);
          this.createAccountMessage = null;
          }else{
              this.loading = false;
              this.createAccountMessage =`
                  <div class="firebaseNotes">
                    <div class="alert alert-info text-center signUpMsg">
                      <h5>Sign up or log in to be able to create endless amount of notes.</h5>
                  </div>
                </div>
            `;
          }
          
      });

      //inactive code
      // if(!loggedInToAccount){ 
      //   this.notes =   [
      //     {details:[], titles:[], edited: [], createdDate: [], modifiedDate: [], color: [], id:[]}
      //   ];
      //   this.quoteList = [
      //     {quoteDetails:[], authors:[], createdDate: [], id:[]}
      //   ];
      //   this.trash= {
      //       notes: [
      //         {details:[], titles:[], edited: [], createdDate: [], modifiedDate: [], color: [], id: [], type:"notes"}
      //       ],
      //       quotes: [
      //         {quoteDetails:[], authors:[], id:[], type:"quotes"}
      //       ]
      //     }
        
      // }
      
    }
};  //end



// const firebaseUI = document.querySelector(".firebaseNotes");
//   const setUpNotes = (data)=>{
  // if(data.length && loggedInToAccount){
  //     let htmlText= "";
  //   console.log(data);
  //   data.forEach(item =>{
      
  //     const notes = item.data();
  //     console.log(notes);
      
  //     const li = `
  //     <li>
  //       Title: ${notes.title}
  //       <br>
  //       Content: ${notes.content}
  //       <br>
  //       <br>
  //     </li>
  //     `
  //     htmlText += li ;
      
  //   });
  //   firebaseUI.innerHTML = htmlText;
  // }
  

 
// };

const Home={
  data: function(){
    return{
      test:"22"
    }
  },
  props:{
      userLoggedIn: [Boolean],
      isDataLoaded: [Boolean]
  },
  template: `<section class="home-section container">
   
    <img class="memoLogo"src="iconfinder_91.png">
    <h1>Welcome to Memo</h1>
    <p>An advanced note taking app that allows you to add, edit and manage notes in a very simple way. It also gives you an ability to transfer huge text and passwords from your phone to your computer and vise versa very easily. </p>
    <div v-if="!userLoggedIn && isDataLoaded">
            <v-alert
              color="orange lighten-1"
              dark
              icon="mdi-vuetify"
              border="left"
              prominent
              class="homepage-alert mx-auto my-4">
              Join Memo now and become one of our community. Signing up will take just few minutes to complete <span data-toggle="modal" data-target="#signUpModal">Sign Up.</span>

            </v-alert>
        
        
    </div>
    <p class="text-center " >&copy; 2020 Created by Mahmoud Farargy</p>
    
  </section>`,
  created(){
    $(".navbar-collapse").collapse("hide"); 
  }
}
const About={
  data: function(){
      return{
        text: "",
        sign1: 1,
        sign2: 2 
      }
  },
  template: `<section class="about-section">
    <h2>Hi, I'm Mahmoud!</h2>
    <p>I am a front end developer specialized in Vue.js, React.js, Javascript and other technologies. You can visit my portfolio to find more cool projects like this one <a target="_blank" href="https://mahmoudportfolio.netlify.app">Portfolio.</a></p>
    
  </section>
  `,
  created(){
    $(".navbar-collapse").collapse("hide");
  }
}

const comp4={
  template: `<p class="text-center">  comp#3 this component is under construction. Please swipe to Notes to create notes!</p>`,
  created(){
    $(".navbar-collapse").collapse("hide");
  }
}

const trashComponent= {
  data: function(){
    return{
      createAccountMessage:"",
      loading: true,
      direction:'left',
      isUserOnline: navigator.onLine,
      transition: 'slide-x-reverse-transition',
    }
  },
  template:`
    <section class="trash-container container">
      
      <!-----deleted quotes------>

        <p> <router-link to="/notes" class="mt-4" @click="backToNotes"><v-icon class="mr-1 text-primary">mdi-note-multiple-outline</v-icon> Memo</router-link> > <a href="#" class="selecedTrashRoute"> <v-icon class="mr-1 text-primary">mdi-trash-can-outline</v-icon> Trash</a> </p>
      <div style="margin: 30px 0 !important" >    
        <h5 class="text-danger trash-titles" v-if="$store.state.trash.quotes[0].quoteDetails.length > 0" >Deleted Quotes</h5>
              <!--loaders-->
                  <div class="text-center">
                  <v-overlay :value="loading">
                    <v-progress-circular indeterminate size="64"></v-progress-circular>
                  </v-overlay>
                </div>
              <v-skeleton-loader v-if="loading && isUserOnline"
              height="100vh;"
              style="width:70%; margin:100px auto 0 auto; overflow:hidden"
              type="paragraph"
              ></v-skeleton-loader>
          <div v-if="$store.state.trash.quotes[0].quoteDetails.length === 0 && $store.state.trash.notes.length == 0 && userLoggedIn" class="empty-trash-container">
            <div class="empty-trash-message">
              <v-icon dark color="orange darken-3" size="100">mdi-trash-can-outline</v-icon>
              <p>No notes in Trash to display</p>
            </div>
          </div>
        <p v-html="createAccountMessage"></p>
        
        
          <div class=" my-3 mr-3">
          <transition-group name="fade" class="row" style="width:100%; margin:0; padding:0;">
            <li class="col-md-4 col-sm-12 my-2" v-for="(quote, index) in $store.state.trash.quotes[0].quoteDetails" :key="$store.state.trash.quotes[0].id[index]">
                <div class="quote-text px-3 changeD2 thumbnail-settings  text-dark bg-warning"style="overflow:auto;height:140px;" >
                  <blockquote class="blockquote">
                    <h5 style="white-space:pre-line;">{{quote}}</h5>
                    <footer>
                          <small class="text-muted" v-html="$store.state.trash.quotes[0].authors[index] !== '' ? '~ ' +  $store.state.trash.quotes[0].authors[index] : null " style="white-space:nowrap; font-size:17px; font-family:'Arial, Helvetica, sans-serif'"></small>
                    </footer>
                  </blockquote>

              <!----del btns--->
    <div class="note-controls p-1">
    <div class="speed-dial-position">
      <v-btn fab dark big color="green accent-3" class="mr-2"  title="Restore" @click="restore(index,'quotes')"><v-icon>mdi-file-restore </v-icon></v-btn>
      <v-btn fab dark big color="red" title="Delete forever" @click="deleteForever(index, 'quotes')"><v-icon>mdi-trash-can</v-icon></v-btn>
     
      
    </div>
            
        </div>      
                <div class="positionDate">
                    <small >{{$store.state.trash.quotes[0].createdDate[index]}}</small>
                </div>
                </div>
            </li>
            </transition-group>
          </div>

          
          <!-----deleted notes----->
        <h5 class="text-danger trash-titles my-2" v-if="$store.state.trash.notes.length > 0" >Deleted notes</h5>
          <transition-group name="fade" class="row" >
              <li class="col-md-4 my-2 noteCard" v-for="(note, index) in $store.state.trash.notes" :key="note.id">
              <div class="timeline-dot" data-toggle="tooltip" data-placement="top" :title="note.createdDate"><div></div></div>
                  <div class="note-text changeD2 text-dark" style="cursor:auto;" :class="{[note.color]: userLoggedIn, addMoreStyles: userLoggedIn && note.color !== 'white' }">
                    <div class="note-text-size pt-2 pb-4">
                      <h3 class="text-center NoteTitle" v-html="note.titles"></h3>                      
                      <div class="divider"></div>
                      <blockquote class="blockquote">
                        <p style="white-space: pre-line;">{{note.details}}</p>
                      </blockquote>
                    </div>
    <!---Note control buttons---->
            <div class="note-controls p-1">

              <div class="speed-dial-position">
            <v-btn fab dark big color="green accent-3" class="mr-2" title="Restore" @click="restore(index,'notes')"><v-icon>mdi-file-restore </v-icon></v-btn>
            <v-btn fab dark big color="red" title="Delete forever" @click="deleteForever(index, 'notes')"><v-icon>mdi-trash-can</v-icon></v-btn>
                  
                  
                </div>
                <div class="positionDate">
                    <small >{{$store.state.trash.notes[index].createdDate}}</small>
                </div>
                
                <div class="positionEdited">
                      <v-icon class="square-edit mr-1" style="font-size:17px;" v-if="$store.state.trash.notes[index].edited.length >0">mdi-square-edit-outline</v-icon><small class="text-edit text-muted" v-html="$store.state.trash.notes[index].edited"></small>
                </div>
            </div>
            </div>
                </li>
            </transition-group>
            <div class="fixedBtnBox">
            <v-btn v-if="$store.state.trash.notes.length >0 || $store.state.trash.quotes[0].quoteDetails.length > 0" @click="emptyTrash" style="font-size:10px !important;" dark color="red"><i class="fas fa-trash fa-lg mr-1"></i> 
                empty trash
            </v-btn>
            </div>
        </div>
    </section>
  `,
  props:{
      notification: [Function],
      userLoggedIn: [Boolean]
  },
  methods:{
    backToNotes(){
      if(this.$router.history.current.path !=="/notes"){
        this.$router.push("/notes");
      }
    },
    deleteForever(index,type){
      if(confirm(`${type==="notes"? 'Note' : 'Quote'} will be deleted forever. Proceed?`)){
          this.$store.commit("deleteForever", {index: index, type: type});
          this.notification(`${type ==="notes" ? 'Note' :"Quote" } deleted forever`, "yellow");
          this.$store.commit("refreshData");
      }
    
    },
    restore(index, type){
      this.$store.commit("restore", {index: index, type: type});
      this.notification( `${type ==="notes" ? 'Note' :"Quote" } restored again.`, "success");
      this.$store.commit("refreshData");
    },
    emptyTrash(){
      if(confirm("Empty trash? All items in Trash will be permanently deleted.")){
        this.$store.commit("clearTrash");//clears
        this.$store.commit("refreshData");//refreshes
        this.notification("Trash cleared", "success"); //notifies
      }
    }
  },
  created(){
    $(".navbar-collapse").collapse("hide");
    console.log(this.$store.state);
    firebase.auth().onAuthStateChanged(user=>{
      this.loading = true;
      // document.getElementById("mainSection").innerHTML = "loading.."
      if(user){
        this.loading = false;
        this.$store.commit("receiveDataFromServer", user);
        this.createAccountMessage = null;
        }else{
            this.loading = false;
            this.createAccountMessage =`
              <div class="firebaseNotes">
                <div class="alert alert-info text-center signUpMsg">
                  <h5>Sign up or log in to be able to create endless amount of notes.</h5>
              </div>
            </div>
          `;
        }
        
    });
  }
}

const store = new Vuex.Store({
    state:{
      quoteList: [
        {quoteDetails:[], authors:[], createdDate: [], id:[]}
      ],
      notes: [],
      trash: {
        notes: [],
        quotes: [
          {quoteDetails:[], authors:[], createdDate:[], id:[], type:"quotes"}
        ]
      },
      toDoList:[{undone:[], done:[], id:""}],
      settings: {}
    },
    getters:{
      notes: state=>{
        return state.notes;
      },
      quotes: state=>{
        return state.quoteList;
      },
      trash: state=>{
        return state.trash;
      },
      toDoList: state=>{
        return state.toDoList;
      }
    },
    mutations:{
      receiveDataFromServer: (state, user)=>{
        db.collection("users").doc(user.uid).get().then(data=>{
          // console.log(data.data());
            if(data.data().notes){
              state.notes = data.data().notes; //retrieves data from the server to "notes" array
              //  state.notesProgressWidth =  data.data().notes.length;
            }
            if(data.data().quotes){//retrieves data from the server to "quoteList" array
                state.quoteList = data.data().quotes;
            }
            if(data.data().trash){//retrieves data from the server to "trash" array
              state.trash = data.data().trash;
            }
            if(data.data().toDoList){//retrieves data from the server to "toDoList" array
              state.toDoList = data.data().toDoList;
            }
            if(data.data().settings){//retrieves data from the server to "settings" array
              state.settings = data.data().settings;
            }
            
          }).catch(error=>{
            console.log(error+ "This error is found");
          });
      },
      addToQuotes: (state, payload) =>{
        console.log(state.quoteList[0]);
        const {text, author, createdDate, id} = payload; //using destructuring to extact variables from this main variable
        state.quoteList[0].quoteDetails.push(text);
        state.quoteList[0].authors.push(author);
        state.quoteList[0].createdDate.push(createdDate);
        state.quoteList[0].id.push(id);
        
      },
      removeFromQuotes: (state, index)=>{
        //copies deleted elements to "trash"
        console.log(state.quoteList[0].quoteDetails[index], state.trash);
        state.trash.quotes[0].quoteDetails.push(state.quoteList[0].quoteDetails[index]);
        state.trash.quotes[0].authors.push(state.quoteList[0].authors[index]);
        state.trash.quotes[0].createdDate.push(state.quoteList[0].createdDate[index]);
        state.trash.quotes[0].id.push(state.quoteList[0].id[index]);
        //deletes them from "quoteList"
        state.quoteList[0].quoteDetails.splice(index,1);
        state.quoteList[0].authors.splice(index,1);
        state.quoteList[0].createdDate.splice(index,1);
        state.quoteList[0].id.splice(index,1);
      },
      addToNotes: (state, payload)=>{
        const {details, titles,createdDate,color, id, img} = payload;
        state.notes.push({details:details,
          titles:titles, edited: "",
          createdDate: createdDate,
          modifiedDate: "",
          color: color,
          id: id,
          img: img,
          type: "notes"
        });
      },
      removeFromNotes: (state, index)=>{
        //copies data to the trash
        state.trash.notes.push(state.notes[index]);
        //deletes data from the trash
        state.notes.splice(index,1);
      },
      changeNote: (state, payload)=>{
        const {specialIndex , todaysDate, editColorsClicked, editedColor} = payload; 
        state.notes[specialIndex].edited= "Edited";
        state.notes[specialIndex].modifiedDate = todaysDate;
        if(editColorsClicked){
          state.notes[specialIndex].color= editedColor;
        }else{
          state.notes[specialIndex].color = state.notes[specialIndex].color;
        }
      },
      commitChanges: (state, payload)=>{
        const {changeModalDetails, changeModalTitle, specialIndex} = payload;
        state.notes[specialIndex].details = changeModalDetails;
        state.notes[specialIndex].titles = changeModalTitle;
      },
      clearQuotes: state=>{
          state.quoteList[0].authors = [];
          state.quoteList[0].quoteDetails = [];
          state.quoteList[0].createdDate = [];
          state.quoteList[0].id= [];
      },
      clearNotes: state=>{
        state.notes = [];
      },
      deleteForever: (state, payload)=>{
        const {type, index}  = payload;
        if(type === "notes"){
          state.trash.notes.splice(index,1);

        }else if(type === "quotes"){
          state.trash.quotes[0].authors.splice(index,1);
          state.trash.quotes[0].quoteDetails.splice(index,1);
          state.trash.quotes[0].createdDate.splice(index,1);
          state.trash.quotes[0].id.splice(index,1);
        }
      },
      restore: (state, payload)=>{
        console.log(state);
        const {type, index}  = payload;
        if(type === "notes"){
          //retrieves data to the respective path where it was
          state.notes.push(state.trash.notes[index]);
          //deletes data after being moved
          state.trash.notes.splice(index,1);

        }else if(type ==="quotes"){
          //retrieves data to the respective path where it was
          state.quoteList[0].authors.push(state.trash.quotes[0].authors[index]);
          state.quoteList[0].quoteDetails.push(state.trash.quotes[0].quoteDetails[index]);
          state.quoteList[0].createdDate.push(state.trash.quotes[0].createdDate[index]);
          state.quoteList[0].id.push(state.trash.quotes[0].id[index]);
          //deletes data after being moved
          state.trash.quotes[0].authors.splice(index,1);
          state.trash.quotes[0].quoteDetails.splice(index,1);
          state.trash.quotes[0].createdDate.splice(index,1);
          state.trash.quotes[0].id.splice(index,1);
        }
      },
      refreshData: state=>{
        firebase.auth().onAuthStateChanged(user=>{
          console.log(user);
          if(user){
            db.collection("users").doc(user.uid).set({
              settings: state.settings,
              notes: state.notes,
              quotes: state.quoteList,
              trash: state.trash,
              toDoList: state.toDoList
            });
          }
          
          
        });
      },
      clearTrash: state=>{
        state.trash = {
          notes: [],
          quotes: [
            {quoteDetails:[], authors:[], createdDate:[], id:[], type:"quotes"}
          ],
          toDoList:[{undone:[], done:[], id:[]}]
        }
      },
      addNewToDo: (state, payload) =>{
        const {undone,id} = payload;
        console.log(undone);
        state.toDoList[0].undone.push(undone);
        state.toDoList[0].id.push(id);
      },
      moveToDoneSection: (state, index)=>{
        state.toDoList[0].done.push(state.toDoList[0].undone[index]);
        state.toDoList[0].undone.splice(index,1);
      },
      moveToUndoneSection: (state, index)=>{
        state.toDoList[0].undone.push(state.toDoList[0].done[index]);
        state.toDoList[0].done.splice(index,1);
      }
    }
});


const mainApp = new Vue({ //vue root instance
    el: "#app",
    store,
    components:{
      draggable: window["vuedraggable"] //imports vuedraggable from CDN
    },
    data: function(){
      return{
        userLoggedIn: false,
        isDataloaded: false,
        signUpEmail: "",
        signUpPassword: "",
        signUpBio: "",
        loginEmail: "",
        loginPassword: "",
        signUpErrorMessage : "",
        loginErrorMessage: "",
        accountDetails: "",
        signUpNav: "",
        logInNav: "",
        accountNav: "",
        logOutNav: "",
        notificationMSG: "",
        bottomNav: 'recent',
        active:0,
        valid: true,
        userName: '',
        nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 15) || 'Name must be less than 15 characters',
        ],
        emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        passwordRules: [
          v => !!v || 'Password is required',
          v => /[a-zA-Z0-9]{6,}/.test(v) || 'Password must be at leat 6 characters.',
        ],
        lazy: false,
        passValue: true,
        tile: false,
        type: 'avatar',
        trashCan: ""
      }
    },
    template:`
    <main>
      <v-app>
          <nav class="navbar navbar-expand-lg navbar-light p-1" style="background-color:#0081D2FF;">
          <div class="container">  
            <img src="iconfinder_91.png" id="logo" class="navbar-brand text-white">
              <button class="navbar-toggler ml-auto" data-toggle="collapse" data-target="#mainNav">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="mainNav">
                <ul class="navbar-nav ml-auto" >
                    <li class="nav-item mr-1" @click="changePathToTrash" v-if="userLoggedIn && this.$router.history.current.path === '/notes'" id="trash" v-html="trashCan">
                      <v-skeleton-loader ref="skeleton" v-if="userLoggedIn" :type="type" style="transform: scale(0.80);" :tile="tile" class="mx-auto"
                      ></v-skeleton-loader>
                    </li>
                    <li class="nav-item mr-1" v-if="userLoggedIn" id="account" v-html="accountNav">
                      <v-skeleton-loader ref="skeleton" v-if="userLoggedIn" :type="type" style="transform: scale(0.80);" :tile="tile" class="mx-auto"
                      ></v-skeleton-loader>
                    </li>
                    <li class="nav-item mr-1"  @click="logOut" id="logout" v-html="logOutNav" >
                      <v-skeleton-loader ref="skeleton" :type="type" style="transform: scale(0.80);" :tile="tile" class="mx-auto"
                      ></v-skeleton-loader>
                    </li>
                    <li class="nav-item mr-1" v-if="!userLoggedIn" v-html="logInNav" data-toggle="modal" data-target="#loginModal"></li>
                    <li class="nav-item mr-1" v-if="!userLoggedIn" v-html="signUpNav" data-toggle="modal" data-target="#signUpModal"> </li>
                </ul>
              </div>
              
            <transition name="fade">
                <div v-html="notificationMSG">
                </div>
            </transition>
            
              <!-- Modals -->
            <!-- Account Modal-->
      <div class="modal" id="accountInfo">
      <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-body">
                  <h3 data-dismiss="modal" class=" ml-auto" style="cursor:pointer;">&times;</h3>
                  <div class="text-center">
                    <h4 class="text-primary"><i class="fas fa-user text-dark mr-1"></i> Account details</h4>
                      <h6 id="account-details" v-html="accountDetails"></h6>
                      <button class="btn btn-info my-4" data-dismiss="modal">Cancel</button>
                  </div>
            </div>
                  
                  
          </div>
      </div>

      </div>
                          <!-- lOG IN Modal-->
        <div class="modal" id="loginModal">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                    <h4 class="text-primary">Login</h4>
                    <h3 data-dismiss="modal" style="cursor:pointer;">&times;</h3>
                </div>
                <div class="modal-body">
                  <form class="logIn-form" @submit="loginSubmit">
                    <div class="form-group">
                      <label for="login-email">E-mail</label>
                      <input class="form-control" v-model="loginEmail" id="login-email" type="text">
                    </div>
                    <div class="form-group">
                      <label for="login-password" >Password</label>
                      <input class="form-control" v-model="loginPassword" id="login-password" type="password">
                    </div>
                      <div id="loginErrorMessage" v-html="loginErrorMessage"></div>
                    <input class="btn btn-primary text-white" type="submit" value="Login" >
                  </form>
                  
                </div>
        
                <div class="modal-footer">
                  <button class="btn btn-info" data-dismiss="modal">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        
          <!-- SIGN UP Modal-->
          <div class="modal" id="signUpModal">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                      <h4 class="text-primary">Sign up</h4>
                      <h3 data-dismiss="modal" style="cursor:pointer;">&times;</h3>
                  </div>
                  <div class="modal-body">
                  <!---vuetify-->
              
             <form class="signUp-form"  @submit="signUpSubmit">
               <v-form ref="form" v-model="valid" :lazy-validation="lazy" >
                  <v-text-field
                  autofocus
                    v-model="userName"
                    :counter="15"
                    :rules="nameRules"
                    label="First Name *"
                    required
                    @input = "validate"
                  ></v-text-field>
            
                  <v-text-field
                   v-model="signUpEmail"
                    :rules="emailRules"
                    label="E-mail *"
                    required
                    @input = "validate"
                  ></v-text-field>

                  <v-text-field
                   v-model="signUpPassword" id="signUp-password"
                   :rules="passwordRules"
                   :append-icon="passValue ? 'mdi-eye' : 'mdi-eye-off'"
                   @click:append="() => (passValue = !passValue)"
                   :type="passValue ? 'password' : 'text'"
                   label="password *"
                   required
                   @input = "validate"
                   ></v-text-field>

                   <v-text-field
                   v-model="signUpBio" id="signUp-bio" type="text"
                   label = "One line bio"
                   ></v-text-field>

                  <v-btn
                  class="btn btn-primary mr-4 mb-4" color="success" :disabled="!valid" @click="signUpSubmit"
                   >Register
                  </v-btn>
            
                  <v-btn
                    color="error"
                    class="mr-4 mb-4"
                    @click="reset"
                    :disabled="!valid"
                  >
                    Reset Form
                  </v-btn>
            
                  <v-btn
                  class="mr-4 mb-4"
                    color="warning"
                    @click="resetValidation"
                  >
                    Reset Validation
                  </v-btn>
                  <div class="mt-3" id="signUpErrorMessage" v-html="signUpErrorMessage"></div>
                </v-form>
              </form>
            
                    
                  </div>
        
                  <div class="modal-footer">
                    <button class="btn btn-info" data-dismiss="modal">Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav> 
          
             <!--Passes in user state and other info through props-->
      <router-view :userLoggedIn="this.userLoggedIn" :notification="this.notification" :isDataLoaded="this.isDataLoaded" :loading="this.loading"></router-view>
    <section class="app-footer">
    
    <v-bottom-navigation
    v-model="bottomNav"
    :value="active"
    color="blue lighten-1"
    dark
    shift
    grow
  >
    <router-link to="/" tag="v-btn" exact active-class="active">
      <span>Home</span>
      <v-icon>mdi-home</v-icon>
    </router-link>

    <router-link to="/about" tag="v-btn" exact active-class="active">
        <span>About</span>
        <v-icon>mdi-information</v-icon>
    </router-link>

      <router-link to="/notes" tag="v-btn" exact active-class="active">
        <span>Notes</span>
        <v-icon>mdi-note</v-icon>
      </router-link>
    

    <router-link to="/comp4" tag="v-btn" exact active-class="active">
      <span>image</span>
      <v-icon>mdi-image</v-icon>
    </router-link>
    </v-bottom-navigation>
    </section>
    </v-app>
    </main>
    `,
      router:  new VueRouter({
        routes: [
        {path: "/" , component : Home, userLoggedIn: this.userLoggedIn},
        {path: "/notes", component: NoteApp},
        {path: "/about", component: About},
        {path: "/comp4", component: comp4},
        {path:"/trash", component: trashComponent}
      ],
      scrollBehavior(to, from , savedPosition){
        if(savedPosition){
          return savedPosition;
        };
        if(to.hash){
          return {selector: to.hash}
        };
        
      }
  }),
  vuetify: new Vuetify(),
    methods:{ //Sign Up
            signUpSubmit(e){
              e.preventDefault();
              const email = this.signUpEmail;
              const password= this.signUpPassword;
            
              auth.createUserWithEmailAndPassword(email, password).then(cred =>{ //adds new fields to the newly created account
                db.collection("users").doc(cred.user.uid).set({
                  settings: {
                    bio:  this.signUpBio.length> 0 ? this.signUpBio : null,
                    userName: this.userName,
                  },
                  notes: [],
                  quotes: [
                    {quoteDetails:[], authors:[], createdDate:[], id:[]}
                  ],
                  trash: {
                    notes: [],
                    quotes: [
                      {quoteDetails:[], authors:[], createdDate:[], id:[], type:"quotes"}
                    ]
                  },
                  toDoList: [
                    {undone:[], done:[], id:""}
                  ]
                })
                
              }).then(()=>{
                this.notification("A new account has been created. Enjoy!", "success");
                this.signUpEmail = "",
                this.signUpPassword= "",
                this.signUpBio= "";

                  $(function(){
                    $("#signUpModal").modal("hide");
                  });
                  this.signUpErrorMessage = "";
              }).catch(error=>{
                this.signUpErrorMessage = `
                  <div class="alert alert-danger text-center">
                    <h6>${error}<h6>
                  </div>
                `;
            });
            
          }, //LOGIN
          loginSubmit(e){
            e.preventDefault();
            const email = this.loginEmail;
            const password = this.loginPassword;
            
            auth.signInWithEmailAndPassword(email, password).then(cred=>{
              this.loginEmail ="";
              this.loginPassword ="";
              
              $(function(){
                $("#loginModal").modal("hide"); // hides modal
                
                $(".navbar-collapse").collapse("hide");
                
              });
              this.loginErrorMessage = ""; //deletes potential error messages
            }).catch(error=>{
                this.loginErrorMessage = `
                  <div class="alert alert-danger text-center">
                    <h6>${error}<h6>
                  </div>
                `;
            });
          },   //LOGOUT
          logOut(event){
            event.preventDefault();
              if(confirm("Are you sure you want to log out?")){
                  auth.signOut();
                  loggedInToAccount = false; //note: loggedInToAccount is a global variable
                  this.userLoggedIn= false;
                  this.notification("logged out.", "yellow");
                  location.reload();
              }
          },setupLinks(user){ //Determines if the user is logged in or not 
            this.isDataLoaded =true;
            
            if(user){
              console.log(this.userLoggedIn);
              this.signUpNav = null;
              this.userLoggedIn = true;
              if(navigator.onLine === true){
                this.notification("Signed in successfully.", "success");
              }
              this.logOutNav=`
              <a class="nav-link text-white"><i class="fas fa-sign-out-alt text-white fa-lg  mr-1"></i> Logout</a>
              `;
              this.accountNav=`
              <a class="nav-link text-white" data-toggle="modal" data-target="#accountInfo"><i class="fas fa-user-circle text-white fa-lg  mr-1"></i> Account</a>
              `;
              this.trashCan = `
              <a class="nav-link text-white"><i class="fas fa-trash-alt text-white fa-lg  mr-1"></i> Trash</a> 
              `;
              this.createAccountMessage = null;
            }else{
              this.logInNav= `
              <a class="nav-link text-white"><i class="fas fa-sign-in-alt fa-lg mr-1 text-white"></i> Login</a>
              `;
              this.signUpNav = `
              <a class="nav-link text-white" ><i class="fas fa-user-plus fa-lg text-white mr-1"></i> Sign up</a>
              `;
              this.userLoggedIn = false;
            }
        },
        notification(text , color){
          console.log(text,color);
          let assignedColor;
            switch(color){
              case "success":
              assignedColor = "#4caf50";
              break;
              case  "danger":
              assignedColor = "#F32013";
              break;
              case  "yellow":
              assignedColor = "#ffae42";
              break;
              default:
              assignedColor = "#4caf50";
            }
            
            if(text.length>0){
              this.notificationMSG = `
              <div class="notificationStyle " style="background-color:${assignedColor}">
                <i v-if="color === 'success'" class="fas fa-check mr-1 mb-2"></i> <p class="mt-1">${text}</p>
              </div>
              `;
            }else{
              this.notificationMSG = null;
            }
            setTimeout(()=>{
                this.notificationMSG = null;
            },4500);
        },
        validate () {
          this.$refs.form.validate()
          console.log(this.valid);
        },
        reset () {
          this.$refs.form.reset();
        },
        resetValidation () {
          this.$refs.form.resetValidation();
        },
        changePathToTrash(){
          console.log(this.$router);
          this.$router.push('/trash');
        }
    },
    computed:{
        color () {
          switch (this.bottomNav) {
            case 0: return 'blue-grey'
            case 1: return 'teal'
            case 2: return 'brown'
            case 3: return 'indigo'
          }
      }
  },
    created(){
          console.log(this.$router.history.current.path);
      $(".navbar-collapse").collapse("hide");

      $("#changeDirection").click(function(){
            
        if($(".changeD").hasClass("row")){
          $(".changeD").removeClass("row");
          $("#changeDirection span img").attr("src","vertical-direction.png");
          $(".changeD li").removeClass("col-md-3");
          $(".changeD2").css("transform","scale(1)");
          $(".changeD2").css("width","600px");
          $(".changeD2").css("margin","0 auto");
        }else{
          $(".changeD").addClass("row");
          $(".changeD li").addClass("col-md-3");
          $("#changeDirection span img").attr("src","horizontal-direction.png");
          $(".changeD2").css("width","100%");
          $(".changeD2").css("margin","0 10px");
      }
    });

      auth.onAuthStateChanged(user=>{
        if(user){
          console.log(user);
          db.collection('users').doc(user.uid).get().then((data)=>{
                  // console.log(data.data().notes);
              this.accountDetails = `
                <div>
                  ${this.$store.state.settings.userName ? `<h5 class="mb-1">Welcome, ${this.$store.state.settings.userName}. </h5>`: "" }
                  <h6 class="mb-1">You logged in as ${user.email}</h6>
                  <small class="text-muted">ID: ${user.uid}</small>
                </div>
              `;
              this.connectionError= "";
          }).catch(error=>{
            this.connectionError=   `
              <div class="alert alert-danger text-center">
                <p>${error}</p>
              </div>
            `;
            console.log("error has found " + error);
          })
          
          $(".plus-circle").css("display","block");
          console.log("User has logged in", user);
          loggedInToAccount = true; //note: loggedinToAccount is a global variable
          db.collection("notes").get().then(snapshot=>{
            // this.setUpNotes(snapshot.docs);
            this.userLoggedIn = true;
            this.setupLinks(user);
            // document.getElementById("mainNotes").style.display= "block";
            //shows content when the user is logged in
            
        }).catch(err=>{
          this.connectionError= `
            <div class="alert alert-danger">
              <p>${err}</p>
            </div>
          `;
          console.log("error has found" + err);
        });
        }else{
          
          // document.getElementById("mainNotes").style.display= "none";
        this.accountDetails = '';
        //hides content when the user is logged out
        this.userLoggedIn = false;
          loggedInToAccount = false;
          this.setupLinks();
          // setUpNotes([]);
        } 
      });

    }
});



