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
      ],
      { relativeLinkResolution: 'legacy' } as ExtraOptions
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
