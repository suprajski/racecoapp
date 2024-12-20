import { Component } from '@angular/core';
import { MenuComponent } from "../menu/menu.component";
import { BranchSelectionService } from '../branch-selection.service';

@Component({
  selector: 'app-mainpage',
  standalone: true,
  imports: [MenuComponent],
  templateUrl: './mainpage.component.html',
  styleUrl: './mainpage.component.css'
})
export class MainpageComponent {
branch : any;
  
  constructor(private branchSelection: BranchSelectionService) {
    this.branch = branchSelection.getSelectedBranch()?.country;
  }
}
