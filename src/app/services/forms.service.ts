import { Injectable } from "@angular/core";
import { FormGroup, UntypedFormBuilder } from "@angular/forms";

@Injectable({
    providedIn: "root"
})
export class FormService {
    constructor(private builder: UntypedFormBuilder) { }

    construirFormulario(constante: any): FormGroup {
        const config = Object.assign({}, constante);

        for (let chave of Object.keys(config)) {
            if (!Array.isArray(config[chave])) {
                config[chave] = this.construirFormulario(config[chave]);
            }
        }

        return this.builder.group(config);
    }
}