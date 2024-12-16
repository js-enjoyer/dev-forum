import { Routes } from '@angular/router';
import { HomeComponent } from './main/home/home.component';
import { UsersComponent } from './main/users/users.component';
import { TagsComponent } from './main/tags/tags.component';
import { CreateComponent } from './main/create/create.component';

export const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'questions', children: [
        //{ path: '', redirectTo: 'browse', pathMatch: 'full' },
        {path: 'create', component: CreateComponent},
        //{path: 'search', component: SearchComponent},
        //{path: ':id/details', component: DetailsComponent},

    ]},
    {path: 'users', component: UsersComponent},
    {path: 'tags', component: TagsComponent},
    // {
    //     path: 'profile',
    //     component: ProfileComponent, // Parent ProfileComponent
    //     children: [
    //         { path: '', redirectTo: 'about', pathMatch: 'full' }, // Default to 'about'
    //         { path: 'about', component: ProfileAboutComponent },
    //         { path: 'questions', component: ProfileQuestionsComponent },
    //         { path: 'answers', component: ProfileAnswersComponent },
    //         { path: 'saves', component: ProfileSavesComponent },
    //         { path: 'edit', component: ProfileEditComponent }
    //     ]
    // },
    //{ path: '**', redirectTo: '/home', pathMatch: 'full' }
];