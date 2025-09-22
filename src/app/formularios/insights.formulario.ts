import { Validators } from '@angular/forms';

export const INSIGHTS_FORM_CONFIG = {
    email: ['', [Validators.required, Validators.email, Validators.maxLength(254)]]
};