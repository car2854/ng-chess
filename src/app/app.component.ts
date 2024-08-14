import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'chess';

  private router = inject(Router);
  
  public darkMode = signal(true);

  public getClass = () => {
    return (this.router.url === '/main') ? 'hidden' : '';
  }

  public onClickBackButton = () => {
    this.router.navigateByUrl('/main');
  }

  ngOnInit(): void {
    
    const mode = localStorage.getItem('mode') ?? 'dark';
    console.log(mode);
    
    this.darkMode.set(mode === 'dark');

    document.documentElement.setAttribute('data-theme', (this.darkMode()) ? 'dark' : 'light')

  }

  public onClickThemeMode = () => {
    this.darkMode.update((darkMode) => !darkMode);

    document.documentElement.setAttribute('data-theme', (this.darkMode()) ? 'dark' : 'light')
    
    localStorage.setItem('mode', (this.darkMode()) ? 'dark' : 'light');
  }
}
