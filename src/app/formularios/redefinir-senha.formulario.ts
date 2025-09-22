import { Validators } from '@angular/forms';

export const REDEFINIR_SENHA_FORM_CONFIG = {
    email: ['', [Validators.required, Validators.email, Validators.maxLength(254)]]
};