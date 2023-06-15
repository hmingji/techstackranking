import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Command } from '../command';
import 'brace';
import 'brace/mode/json';
import 'brace/theme/monokai';
import { AceConfigInterface } from 'ngx-ace-wrapper';

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
  editorInput = '';
  config: AceConfigInterface = {
    tabSize: 2,
    wrap: true,
  };

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
      this.editorInput = this.initialCommandValue;
    }
    this.title = this.edit ? 'Edit Command' : 'Add Command';
  }

  onSubmit() {
    if (this.edit) {
      this.formSubmit.emit({
        ...this.commandForm.value,
        id: this.id,
        command: this.editorInput,
      } as Command);
    } else {
      this.formSubmit.emit({
        ...this.commandForm.value,
        command: this.editorInput,
      } as Command);
    }
  }

  onChange(val: string) {
    this.commandForm.patchValue({
      command: val,
    });
  }

  onClose() {
    this.formClose.emit();
  }
}
