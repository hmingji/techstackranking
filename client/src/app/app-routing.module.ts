import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';

//const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: 'rank',
          data: { preload: false },
          loadChildren: () =>
            import('./rank/rank.module').then((m) => m.RankModule),
        },
        { path: '', redirectTo: 'rank', pathMatch: 'full' },
        //add path for module job
        {
          path: 'jobs',
          data: { preload: false },
          loadChildren: () =>
            import('./job/job.module').then((m) => m.JobModule),
        },
      ],
      { relativeLinkResolution: 'legacy' } as ExtraOptions
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
