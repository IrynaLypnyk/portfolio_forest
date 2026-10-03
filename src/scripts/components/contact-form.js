module.exports = function () {
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', async event => {
    event.preventDefault();
    const button = form.querySelector('[type="submit"]');
    button.disabled = true;
    try {
      const response = await fetch(form.action, {
        method: 'POST', body: new URLSearchParams(new FormData(form)),
        signal: AbortSignal.timeout(15000),
      });
      if (!response.headers.get('content-type')?.includes('application/json')) {
        throw new Error('This form requires a PHP server with email delivery configured.');
      }
      const result = await response.json();
      if (!response.ok || result.status !== 'OK') throw new Error(result.mes || 'Could not send your message.');
      alert(result.mes);
      form.reset();
    } catch (error) {
      alert(error.message || 'Could not send your message. Please try again later.');
    } finally { button.disabled = false; }
  });
};
