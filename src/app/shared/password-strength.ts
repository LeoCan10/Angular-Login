import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appPasswordStrength]',
  standalone: true
})
export class PasswordStrengthDirective {
  private strengthEl: HTMLElement;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    // Crear un elemento <span> debajo del input
    this.strengthEl = this.renderer.createElement('span');
    this.renderer.setStyle(this.strengthEl, 'fontSize', '12px');
    this.renderer.setStyle(this.strengthEl, 'marginLeft', '5px');
    this.renderer.setStyle(this.strengthEl, 'display', 'block');
    this.renderer.appendChild(this.el.nativeElement.parentNode, this.strengthEl);
  }

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    const strength = this.getStrength(input);

    let color = 'gray';
    if (strength === 'Débil') color = 'red';
    if (strength === 'Media') color = 'orange';
    if (strength === 'Fuerte') color = 'green';

    this.renderer.setStyle(this.strengthEl, 'color', color);
    this.strengthEl.textContent = `Fortaleza: ${strength}`;
  }

  private getStrength(password: string): 'Débil' | 'Media' | 'Fuerte' {
    let score = 0;
    if (password.length >= 6) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 1) return 'Débil';
    if (score === 2) return 'Media';
    return 'Fuerte';
  }
}
