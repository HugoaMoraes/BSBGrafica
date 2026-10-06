/**
 * Arquivo mantido para retrocompatibilidade de cache dos clientes.
 * Redireciona o envio para o canal oficial do WhatsApp da BSB Gráfica.
 */

function sendMmail(event) {
  if (typeof sendWhatsAppMessage === 'function') {
    return sendWhatsAppMessage(event);
  }
}

// Aliases globais
window.sendMmail = sendMmail;
window.sendWhatsAppMessage =
  typeof sendWhatsAppMessage === 'function' ? sendWhatsAppMessage : sendMmail;
