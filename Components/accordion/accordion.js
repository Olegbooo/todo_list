function initAccordion() {
    document.querySelectorAll('.accordion').forEach(accordion => {
        const newAccordion = accordion.cloneNode(true);
        accordion.parentNode.replaceChild(newAccordion, accordion);

        newAccordion.addEventListener('click', (event) => {
            if (event.target.closest('.btn-action')) {
                return;
            }

            const accordionItem = newAccordion.closest('.accordion-item');
            const output = accordionItem.querySelector('.accordion-output');

            if (output) {
                output.style.display = output.style.display === 'block' ? 'none' : 'block';
                newAccordion.classList.toggle('active');
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', initAccordion);

