import { AbstractControl, ValidatorFn } from "@angular/forms";

export function validarSenhasIguais(campoSenha: string, campoConfirmacao: string): ValidatorFn {
    return (grupo: AbstractControl) => {
        const senha = grupo.get(campoSenha)?.value ?? '';
        const confirmacao = grupo.get(campoConfirmacao)?.value ?? '';
        if (!senha || !confirmacao) return null;
        return senha === confirmacao ? null : { senhasDiferentes: true };
    };
}