import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {TeamService} from "../team.service";
import {Team} from "../team";
import {ActivatedRoute, Router} from "@angular/router";
import {AngularFire, FirebaseListObservable} from "angularfire2";


@Component({
  selector: 'app-teamedit',
  templateUrl: './teamedit.component.html',
  styleUrls: ['./teamedit.component.css']
})
export class TeameditComponent implements OnInit {

  private isNew = true;
  taskForm:FormGroup;
  key=null;

  teams:FirebaseListObservable<Team[]>;
  constructor(private  fb:FormBuilder
    ,private route:ActivatedRoute
    , private  router:Router,
    private af:AngularFire ) {



    this.taskForm = fb.group({
      "name" : ["",Validators.required],
      "position" : ["",Validators.required],
      "imgUrl" :  ["",Validators.required]
    });

        this.teams  = this.af.database.list('/team') as FirebaseListObservable<Team[]>;



  }

  ngOnInit() {
    

    console.log(this.teams);


  }

  submitForm(){
    const team = new Team(this.taskForm.value.name, this.taskForm.value.position,this.taskForm.value.imgUrl);

    if(this.isNew) {

      // console.log(this.taskForm.value.name);
      
      return this.teams.push(team);
    }else{
      this.teams.update(this.key,team);

    }

  }

  private navigateBack(){
    this.router.navigate(['../']);

  }

  onCancel(){
    this.navigateBack();
  }

  onEdit(item){
    this.key = item;
    this.isNew= false;
    var name = item.name;
    var position = item.position;
    var imgUrl = item.imgUrl;

    this.taskForm = this.fb.group({
      name: [name , Validators.required],
      position: [position , Validators.required],
      imgUrl: [imgUrl , Validators.required ]
    });

    this.submitForm();





  }


  onDelete(item){
    this.teams.remove(item);
  }


}
