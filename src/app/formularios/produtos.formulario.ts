import { Validators } from '@angular/forms';

export const PRODUTOS_FORM_CONFIG = {
    marca: [null],
    linha: [null],
    tipo: [null],
    busca: [null, [Validators.maxLength(100)]]
};