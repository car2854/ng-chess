import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  @ViewChild('menuRef') menuRef!: ElementRef;

  private svgFiles = [
    'pa1.svg',
    'pa2.svg',
    'pa3.svg',
    'pa4.svg',
    'pa5.svg',
    'pa6.svg',
    'pa7.svg',
    'pa8.svg',
  ];

  ngAfterViewInit(): void {
    setInterval(() => {
      this.createAnimation();
    }, 3000);
  }

  private createAnimation = () => {
    const svgFile = this.getSvgFile();
    const size = 100 + Math.random() * 300;

    const div = this.createDiv(size);

    const svg = this.createSvg(svgFile);

    div.appendChild(svg);

    const duration = 3000 + Math.random() * 5000;
    const rotateAngle = Math.random() * 720 - 360;

    console.log(rotateAngle);

    const animation = div.animate(
      [
        { transform: 'translateY(0px) rotate(0deg)', opacity: 0 },
        {
          transform: `translateY(150vh) rotate(${rotateAngle}deg)`,
          opacity: 1,
        },
      ],
      {
        duration: duration,
        iterations: 1,
        easing: 'linear',
        fill: 'forwards',
      }
    );

    this.menuRef.nativeElement.appendChild(div);

    animation.onfinish = () => div.remove();
  };

  private getSvgFile = () =>
    this.svgFiles[Math.floor(Math.random() * this.svgFiles.length)];
  private createDiv = (size: number) => {
    const div = document.createElement('div');
    div.style.width = `${size}px`;
    div.style.height = `${size}px`;
    div.style.position = 'absolute';
    div.style.top = '-100px';
    div.style.left = Math.random() * (window.innerWidth - 100) + 'px';
    div.style.willChange = 'transform, opacity';
    div.style.zIndex = '-1';
    return div;
  };
  private createSvg = (svgFile: string) => {
    const svg = document.createElement('img');
    svg.src = `assets/animations-pieces/${svgFile}`;
    svg.style.width = '100%';
    svg.style.height = '100%';
    return svg;
  };
}
