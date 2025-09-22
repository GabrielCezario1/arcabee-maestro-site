import { Validators } from '@angular/forms';

export const CADASTRO_FORM_CONFIG = {
    nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(60)]],
    sobrenome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(60)]],
    usuario: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern(/^[a-zA-Z0-9._-]+$/)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(254)]],
    senha: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(128), Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d).+$/)]],
    confirmarSenha: ['', [Validators.required]]
};