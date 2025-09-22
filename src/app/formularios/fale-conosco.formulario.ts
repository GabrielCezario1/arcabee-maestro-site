import { Validators } from '@angular/forms';

export const FALE_CONOSCO_FORM_CONFIG = {
    nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(60)]],
    sobrenome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(60)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(254)]],
    mensagem: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(2000)]]
};