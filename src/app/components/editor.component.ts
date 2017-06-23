import { Component, HostListener } from '@angular/core';

declare var jQuery: any;

@Component({
  selector: 'editor',
  template: `
    <div class="content" *ngFor="let sentence of sentences; let s_i = index;">
      <span class="content" *ngFor="let word of sentence; let i = index; trackBy:trackByFn">

        <span *ngIf="(currentIndex === i) && (currentSentence === s_i) && !(editing)"
              class="selectedWord"
              (click)="onClick(s_i, i)">{{word}} </span>
        <input *ngIf="(currentIndex === i) && (currentSentence === s_i) && (editing)"
              id="editingWord"
              (click)="onClick(s_i, i)"
              type="text"
              [(ngModel)]="sentences[s_i][i]"
              >
        <span *ngIf="(currentIndex !== i) || (currentSentence !== s_i)"
              (click)="onClick(s_i, i)">{{word}} </span>
      </span>
      <br>
    </div>

    <span class="content" *ngFor="let word of array; let i = index;"> 

    </span>
  `,
  styles: [`
    .content {
      color: white;
    }

    .selectedWord {
      background-color: yellow;
      color: black;
    }

    #editingWord {
      background-color: pink;
      min-width: 400px;
    }
  `]
})
export class EditorComponent { 
    text: string;

    sentences: string[][];
    sentenceCount: number;

    currentSentence: number;
    currentIndex: number;
    editing: boolean;

    constructor() {
      this.text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
      var array = this.text.split(" ");
      console.log(array);  
      this.sentences = [];
      this.sentenceCount = this.sentences.push(array);
      this.currentIndex = 0;
      this.currentSentence = 0;
      this.editing = false;
    }

    onClick(s_i:number, i: number) {
      console.log("The sentence number is", s_i,
                  "The word number is", i, 
                  "and the word there is", this.sentences[s_i][i]);
      if (this.currentSentence !== s_i || this.currentIndex !== i) {
        this.editing = false;
      }
      this.currentSentence = s_i;
      this.currentIndex = i;
    }

    @HostListener('window:keydown', ['$event'])
    onKey(event: KeyboardEvent) {
      var keycode = event.keyCode;
      console.log("You pressed", keycode);

      switch (keycode) {
        case 13: // ENTER
          this.createSentence();
          break;
        case 27: // ESC
          this.finishWord();
          break;
        case 72: // 'h'
          this.moveLeft();
          break;
        case 74: // 'j'
          this.moveDown();
          break;
        case 75: // 'k'
          this.moveUp();
          break;
        case 76: // 'l'
          this.moveRight();
          break;
        case 82: // 'r'
          this.editWord();
          this.focusWord();
          break;

      }
    }

    private createSentence = function() {
      if (this.currentSentence !== this.sentenceCount - 1)
        return;
      var sentence = this.sentences[this.currentSentence].splice(0, this.currentIndex + 1);
      sentence.push(sentence.pop() + ".");
      /*for (var i = 0; i <= this.currentIndex; i++) {
        sentence += (i !== this.currentIndex) ? 
                   this.sentences[this.currentSentence][i] + " " : 
                   this.sentences[this.currentSentence][i];
      }
      sentence += ".";*/
      var lastSentence = this.sentences.pop();
      this.sentenceCount = this.sentences.push(sentence);
      this.sentenceCount = this.sentences.push(lastSentence);
      this.goToEnd();
      console.log(sentence);
    }

    private editWord = function() {
      this.editing = true;
    }

    private focusWord = function() {
      console.log("Focusing word");
      var item = document.getElementsByClassName(".selectedWord");
      console.log(item);
      setTimeout(() => document.getElementById("#editingWord").focus(), 2000);
    }

    private finishWord = function() {
      this.editing = false;
    }

    private isEditing = function() {
      return this.editing;
    }

    private moveUp = function() {
      if (this.isEditing())
        return;
      this.currentSentence--;
      if (this.currentSentence < 0) 
        this.currentSentence = 0;
      this.goToEnd();
    }

    private moveDown = function() {
      if (this.isEditing())
        return;
      this.currentSentence++;
      if (this.currentSentence >= this.sentenceCount) 
        this.currentSentence = this.sentenceCount - 1;
      this.goToEnd()
      }

    private moveLeft = function() {
      if (this.isEditing())
        return;
      this.currentIndex--;
      if (this.currentIndex < 0)
        this.currentIndex = 0;
    }

    private moveRight = function() {
      if (this.isEditing())
        return;
      this.currentIndex++;
      if (this.currentIndex >= this.sentences[this.currentSentence].length)
        this.currentIndex = this.sentences[this.currentSentence].length - 1;
    }

    private goToEnd = function() {
      if (this.currentIndex > this.sentences[this.currentSentence].length)
        this.currentIndex = this.sentences[this.currentSentence].length - 1;
    }
    
    trackByFn(index: any, item: any) {
      return index;
    }
}
