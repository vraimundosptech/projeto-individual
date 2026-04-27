function verSenha() {
  if (ipt_senha.type === "password") {
    ipt_senha.type = "text";
    olho_senha.classList.replace("bi-eye-slash", "bi-eye");
  } else {
    ipt_senha.type = "password";
    olho_senha.classList.replace("bi-eye", "bi-eye-slash");
  }
}

function verConfirmarSenha() {
    if (ipt_confirmar_senha.type === "password") {
    ipt_confirmar_senha.type = "text";
    olho_confirmar_senha.classList.replace("bi-eye-slash", "bi-eye");
  } else {
    ipt_confirmar_senha.type = "password";
    olho_confirmar_senha.classList.replace("bi-eye", "bi-eye-slash");
  }
}

function usarMascaraSenha() {
    if((ipt_senha.value).length > 0) {
        olho_senha.style.color = 'var(--text-primary)'
        olho_senha.setAttribute('onclick', 'verSenha()')
        olho_senha.style.cursor = 'pointer'
    } else {
        olho_senha.style.color = 'var(--text-muted)'
        olho_senha.removeAttribute('onclick')
        olho_senha.style.cursor = 'auto'
    }
}

function usarMascaraConfirmarSenha() {
    if((ipt_confirmar_senha.value).length > 0) {
        olho_confirmar_senha.style.color = 'var(--text-primary)'
        olho_confirmar_senha.setAttribute('onclick', 'verConfirmarSenha()')
        olho_confirmar_senha.style.cursor = 'pointer'
    } else {
        olho_confirmar_senha.style.color = 'var(--text-muted)'
        olho_confirmar_senha.removeAttribute('onclick')
        olho_confirmar_senha.style.cursor = 'auto'
    }
}
