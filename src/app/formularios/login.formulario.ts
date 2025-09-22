import { Validators } from '@angular/forms';

export const LOGIN_FORM_CONFIG = {
    usuario: ['', [Validators.required]],
    senha: ['', [Validators.required]]
};