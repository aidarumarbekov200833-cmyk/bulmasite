document.addEventListener('DOMContentLoaded', () => {

    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
    $navbarBurgers.forEach( el => {
        el.addEventListener('click', () => {
            const target = el.dataset.target;
            const $target = document.getElementById(target);
            el.classList.toggle('is-active');
            $target.classList.toggle('is-active');
        });
    });

    const accordionItems = document.querySelectorAll('.faq-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.message-header');
        
        if (header) {
            header.addEventListener('click', () => {
                const body = item.querySelector('.message-body');
                const icon = header.querySelector('.icon i');

                body.classList.toggle('is-hidden');
                
                if (body.classList.contains('is-hidden')) {
                    icon.classList.replace('fa-chevron-up', 'fa-chevron-down');
                } else {
                    icon.classList.replace('fa-chevron-down', 'fa-chevron-up');
                }
                
                accordionItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        const otherBody = otherItem.querySelector('.message-body');
                        const otherIcon = otherItem.querySelector('.message-header .icon i');
                        if (otherBody && !otherBody.classList.contains('is-hidden')) {
                            otherBody.classList.add('is-hidden');
                            if (otherIcon) {
                                otherIcon.classList.replace('fa-chevron-up', 'fa-chevron-down');
                            }
                        }
                    }
                });
            });
        }
    });

    function openModal($el) {
        $el.classList.add('is-active');
    }

    function closeModal($el) {
        $el.classList.remove('is-active');
    }

    function closeAllModals() {
        (document.querySelectorAll('.modal') || []).forEach(($modal) => {
            closeModal($modal);
        });
    }

    (document.querySelectorAll('.modal-trigger') || []).forEach(($trigger) => {
        const modalId = $trigger.dataset.target;
        const $target = document.getElementById(modalId);
        
        $trigger.addEventListener('click', () => {
            openModal($target);
        });
    });

    (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button.is-cancel, .modal-close-button') || []).forEach(($close) => {
        const $target = $close.closest('.modal');
        
        $close.addEventListener('click', () => {
            closeModal($target);
        });
    });

    document.addEventListener('keydown', (event) => {
        if(event.key === "Escape") {
            closeAllModals();
        }
    });

    
    const forms = document.querySelectorAll('form[data-validate="true"]');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); 
            let valid = true;
            
            form.querySelectorAll('.help.is-danger').forEach(help => help.remove());
            form.querySelectorAll('.input.is-danger, .textarea.is-danger').forEach(input => {
                input.classList.remove('is-danger');
            });

            const requiredFields = form.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    valid = false;
                    field.classList.add('is-danger');
                    
                    const control = field.closest('.control');
                    if (control) {
                        const help = document.createElement('p');
                        help.className = 'help is-danger';
                        help.innerText = 'This field is required';
                        control.appendChild(help);
                    }
                }
            });
            
            if (valid) {
                const currentModal = form.closest('.modal');
                if (currentModal) {
                    closeModal(currentModal);
                }
                
                const $successModal = document.getElementById('modal-success');
                if ($successModal) {
                    openModal($successModal);
                }
                
                form.reset();
                
                form.querySelectorAll('.input.is-danger, .textarea.is-danger').forEach(input => {
                    input.classList.remove('is-danger');
                });
            }
        });
    });

    const scrollElements = document.querySelectorAll('.js-fade-in');

    const elementInView = (el, offset = 0) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) - offset
        );
    };

    const displayScrollElement = (element) => {
        element.classList.add('is-visible');
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 100)) {
                displayScrollElement(el);
            }
        })
    }
    
    const animationStyle = document.createElement('style');
    animationStyle.innerHTML = `
    .js-fade-in {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    .js-fade-in.is-visible {
        opacity: 1;
        transform: translateY(0);
    }
    `;
    document.head.appendChild(animationStyle);

    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });
    
    setTimeout(handleScrollAnimation, 100); 

});