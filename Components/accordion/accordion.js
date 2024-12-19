function initAccordion() {
    document.querySelectorAll('.accordion').forEach(accordion => {
        accordion.addEventListener('click', () => {
            const output = accordion.nextElementSibling;

            if (output && output.classList.contains('accordion-output')) {
                if (output.style.display === 'block') {
                    output.style.display = 'none';
                } else {
                    output.style.display = 'block';
                }

                accordion.classList.toggle('active');
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.accordion-output').forEach(output => {
        output.style.display = 'none'; 
    });
});


