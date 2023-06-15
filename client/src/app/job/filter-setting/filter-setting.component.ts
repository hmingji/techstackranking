import { Component } from '@angular/core';
import { JobService } from '../job.service';
import { TechStackNameAndId } from '../job';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-filter-setting',
  templateUrl: './filter-setting.component.html',
  styleUrls: ['./filter-setting.component.scss'],
})
export class FilterSettingComponent {
  constructor(
    private jobService: JobService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  isEntryModalOpen = false;
  isTechStackModalOpen = false;
  isCreatedModalOpen = false;
  entryModalTitle = 'Entry Level';
  techStackModalTitle = 'Tech Stack';
  createdModalTitle = 'Created';
  placeholderText = 'Search company';
  companyControl = new FormControl('');
  techstacks!: TechStackNameAndId[];

  ngOnInit(): void {
    this.jobService.techstacks$.subscribe((res) => {
      this.techstacks = res.rows;
    });
    this.companyControl.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((val) => {
        this.router.navigate([], {
          queryParams: {
            company: val && val.trim() !== '' ? val.trim() : null,
            page: 1,
          },
          queryParamsHandling: 'merge',
        });
      });
    this.route.queryParamMap.subscribe((paramMap) => {
      if (paramMap.has('company'))
        this.companyControl.setValue(paramMap.get('company'));
    });
  }

  toggleEntryModal() {
    this.isEntryModalOpen = !this.isEntryModalOpen;
    if (this.isEntryModalOpen) {
      this.closeTechStackModal();
      this.closeCreatedModal();
    }
  }
  toggleTechStackModal() {
    this.isTechStackModalOpen = !this.isTechStackModalOpen;
    if (this.isTechStackModalOpen) {
      this.closeEntryModal();
      this.closeCreatedModal();
    }
  }
  toggleCreatedModal() {
    this.isCreatedModalOpen = !this.isCreatedModalOpen;
    if (this.isCreatedModalOpen) {
      this.closeTechStackModal();
      this.closeEntryModal();
    }
  }

  closeEntryModal() {
    this.isEntryModalOpen = false;
  }
  closeTechStackModal() {
    this.isTechStackModalOpen = false;
  }
  closeCreatedModal() {
    this.isCreatedModalOpen = false;
  }
}
