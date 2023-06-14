import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Command } from '../command';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  constructor(private fb: FormBuilder) {}
  @Input() edit!: boolean;
  @Input() initialNameValue?: string;
  @Input() initialCommandValue?: string;
  @Input() id?: string;
  @Output() formSubmit = new EventEmitter<Command>();
  @Output() formClose = new EventEmitter();
  title = this.edit ? 'Edit Command' : 'Add Command';

  commandForm = this.fb.group({
    name: ['', Validators.required],
    command: ['', Validators.required],
  });

  ngOnInit(): void {
    if (
      this.edit &&
      this.initialCommandValue &&
      this.initialNameValue &&
      this.id
    ) {
      this.commandForm.patchValue({
        name: this.initialNameValue,
        command: this.initialCommandValue,
      });
    }
  }

  onSubmit() {
    if (this.edit) {
      this.formSubmit.emit({
        ...this.commandForm.value,
        id: this.id,
      } as Command);
    } else {
      this.formSubmit.emit(this.commandForm.value as Command);
    }
  }

  onClose() {
    this.formClose.emit();
  }
}
