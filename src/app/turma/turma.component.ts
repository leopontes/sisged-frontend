import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';  
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import * as Api from "../api.service";
import { Turma } from '../turma';
import { Escola } from "../escola";

@Component({
  selector: 'app-turma',
  templateUrl: './turma.component.html',
  styleUrls: ['./turma.component.css']
})
export class TurmaComponent implements OnInit {

  closeResult = '';
  dataSaved = false;  
  turmaForm: any;  
  allTurmas: Turma[];  
  allEscolas: Escola[];
  turmaIdUpdate = null;  
  message = null;  

  @Input() searchText:string = '';

  constructor(
    private formbulider: FormBuilder, 
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    //this.loadAllEscolas();
    this.loadAllTurmas();
    this.turmaForm = this.formbulider.group({
      codigo:    ['', [Validators.required, Validators.maxLength(5)]],  
      ano: ['', [Validators.required, Validators.maxLength(4), Validators.minLength(4)]],
      tipoEnsino: [Validators.required],
      escolaId: ['', []]
    });
  }

  onSubmit() {
    const turma = new Turma();

    turma.codigo = this.turmaForm.value.codigo;
    turma.tipoEnsino = Number.parseInt(this.turmaForm.value.tipoEnsino);
    turma.ano = Number.parseInt(this.turmaForm.value.ano);
    turma.escola = new Escola();
    turma.escola.id = Number.parseInt(this.turmaForm.value.escolaId);
    this.createTurma(turma);
    this.turmaForm.reset();
  }
  

  open(content) {
    this.loadAllEscolas();
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  loadAllTurmas(){
     Api.getAllTurmas().then(turmas=>this.allTurmas=turmas);
  }

  loadAllEscolas(){
    Api.getAllEscola().then(escolas=>this.allEscolas = escolas);
  }

  onFormSubmit(){
    this.dataSaved = false;
    const turma = new Turma();

    turma.codigo = this.turmaForm.value.codigo;
    turma.tipoEnsino = this.turmaForm.value.tipoEnsino;
    turma.ano = this.turmaForm.value.ano;
    turma.escola.id = Number.parseInt(this.turmaForm.value.escolaId);
    
    this.createTurma(turma);
    this.turmaForm.reset();
  }

  createTurma(turma: Turma){
    if(this.turmaIdUpdate == null){
      Api.createTurma(turma).then((data)=>{
        this.savedCallback();
      });
    }else{
      turma.id = this.turmaIdUpdate;
      Api.updateTurma(this.turmaIdUpdate, turma).then((data)=>{
        this.updatedCallback();
      });
    }
  }

  loadTurmaToEdit(id: number, content: any){
    Api.getTurmaById(id).then((turma)=>{
      this.turmaIdUpdate = id;
      this.turmaForm.controls['codigo'].setValue(turma.codigo);
      this.turmaForm.controls['ano'].setValue(turma.ano);
      this.turmaForm.controls['escolaId'].setValue(turma.escola.id);
      this.turmaForm.controls['tipoEnsino'].setValue(turma.tipoEnsino);
      this.open(content); 
    });
  }

  deleteTurma(id: number){
    if(confirm("Deseja realmente excluir a a turma?")){
      Api.deleteTurma(id).then((data)=>{
        this.deletedCallback();
      });
    }
  }

  resetForm(){
    this.turmaForm.reset();
    this.message = null;
    this.dataSaved = false;
  }

  savedCallback(){
    this.callbackState("Registro incluído com sucesso!");
  }

  updatedCallback(){
    this.callbackState("Registro atualizado com sucesso!");
  }

  deletedCallback(){
    this.callbackState("Registro excluído com sucesso!");
  }

  callbackState(message: string){
    this.dataSaved = true;
    this.message = message;
    this.loadAllTurmas();
    this.turmaIdUpdate = null;
    this.turmaForm.reset();
    this.modalService.dismissAll();
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
