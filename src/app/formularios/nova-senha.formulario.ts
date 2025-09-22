import { Validators } from '@angular/forms';

export const NOVA_SENHA_FORM_CONFIG = {
    senha: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(128)]],
    confirmarSenha: ['', [Validators.required]]
};