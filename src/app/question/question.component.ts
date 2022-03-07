import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  public name: string = "";
  public questionList: any = [];
  public currentQuestion: number = 0;
  public points: number = 0;
  correctAnswer: number = 0;
  progress: string = '0';
  maxProgress: string = '0';
  minProgress: string = '0';
  correctProgress: string = '0';
  isQuizCompleted: boolean = false;
  isCorrect: number = 0;

  constructor(private questionService: QuestionService) { }

  ngOnInit(): void {
    this.name = localStorage.getItem("name")!;
    this.getAllQuestions();
  }

  getAllQuestions () {
    this.questionService.getQuestionJson().subscribe(
      res=> {
        this.questionList = res;
     }
    );
  }



  nextQuestion () {
    this.currentQuestion++;
    this.getProgressPercentage();
    this.getCurrentProgressPercentage();
    this.getMaxProgressPercentage();
    this.getMinProgressPercentage ();
  }


  answer (currentQno: number, option: any) {

    if (currentQno === this.questionList.length) {
      this.isQuizCompleted = true;
    }
    if (option.correct) {
      this.points += 5;
      this.correctAnswer++;

      setTimeout(()=> {
        this.currentQuestion++;
        this.isCorrect = 0;
        this.getProgressPercentage();
        this.getCurrentProgressPercentage();
        this.getMaxProgressPercentage ();
        this.getMinProgressPercentage ();
      }, 1000);
      this.isCorrect = 1;
    }
    else {
      setTimeout(()=> {
        this.currentQuestion++;
        this.isCorrect = 0;
        this.getProgressPercentage();
        this.getCurrentProgressPercentage();
        this.getMaxProgressPercentage ();
        this.getMinProgressPercentage ();
      }, 1000);
      this.isCorrect = 2;
    }
  }

  resetQuiz () {
    this.getAllQuestions();
    this.points = 0;
    this.currentQuestion = 0;
    this.progress = '0';
    this.maxProgress = '0';
    this.minProgress = '0';
    this.correctProgress = '0';
    this.correctAnswer = 0;
  }

  getCurrentProgressPercentage () {
    this.correctProgress = ( (this.correctAnswer/this.currentQuestion)*100 ).toString();
    return this.correctProgress;
  }

  getMaxProgressPercentage () {
    this.maxProgress = ( ((( this.questionList.length - this.currentQuestion) + this.correctAnswer)/this.questionList.length)*100 ).toString();
    return this.maxProgress;
  }

  getMinProgressPercentage () {
    // this.minProgress = (Number(this.maxProgress) - Number(this.correctProgress)).toString();
    this.minProgress = ( ((( this.questionList.length - this.currentQuestion) - (this.currentQuestion - this.correctAnswer))/this.questionList.length)*100 ).toString();
    return this.minProgress;
  }

  getProgressPercentage () {
    this.progress = ( (this.currentQuestion/this.questionList.length)*100 ).toString();
    return this.progress;
  }


}
