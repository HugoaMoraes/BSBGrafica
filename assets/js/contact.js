/**
 * Manipulador de envio de mensagem via WhatsApp para a BSB Gráfica
 * Substitui o envio via EmailJS pelo canal direto de atendimento no WhatsApp.
 */

function sendWhatsAppMessage(event) {
  if (event) {
    event.preventDefault();
  }

  const form = document.querySelector('#contact-form');

  // Validação nativa com a API do navegador (reportValidity)
  if (form && typeof form.reportValidity === 'function') {
    if (!form.reportValidity()) {
      return;
    }
  }

  const sendernameInput = document.querySelector('#sendername');
  const toInput = document.querySelector('#to');
  const subjectInput = document.querySelector('#subject');
  const messageInput = document.querySelector('#message');

  const sendername = sendernameInput ? sendernameInput.value.trim() : '';
  const to = toInput ? toInput.value.trim() : '';
  const subject = subjectInput ? subjectInput.value.trim() : '';
  const message = messageInput ? messageInput.value.trim() : '';

  if (!sendername || !to || !subject || !message) {
    if (form && typeof form.reportValidity === 'function') {
      form.reportValidity();
    }
    return;
  }

  // Número oficial de atendimento da BSB Gráfica
  const phoneNumber = '5561991523982';

  // Mensagem organizada com marcações para WhatsApp (negrito e emojis identificadores)
  // Cabeçalho amigável & profissional
  const whatsappMessage = [
    '👋 *Olá, BSB Gráfica! Gostaria de solicitar um orçamento via site.*',
    '',
    `👤 *Nome:* ${sendername}`,
    `📧 *E-mail:* ${to}`,
    `📌 *Assunto:* ${subject}`,
    '',
    '💬 *Mensagem:*',
    message,
  ].join('\n');

  // Codificação segura para URL
  const encodedText = encodeURIComponent(whatsappMessage);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`;

  // Abre diretamente em nova aba do WhatsApp
  window.open(whatsappUrl, '_blank');

  // Limpa os campos do formulário
  if (form) {
    form.reset();
  } else {
    if (sendernameInput) sendernameInput.value = '';
    if (toInput) toInput.value = '';
    if (subjectInput) subjectInput.value = '';
    if (messageInput) messageInput.value = '';
  }
}

// Aliases globais para retrocompatibilidade
window.sendWhatsAppMessage = sendWhatsAppMessage;
window.sendMmail = sendWhatsAppMessage;

// Vincula o ouvinte de submit ao carregar o DOM
document.addEventListener('DOMContentLoaded', function () {
  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', sendWhatsAppMessage);
  }
});
