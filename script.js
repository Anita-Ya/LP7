// Section 1 & 2 Interactive Script
document.addEventListener('DOMContentLoaded', () => {

  // ========================================================
  // SECTION 2: "एक-एक कर के आए" (Staggered Scroll Animation)
  // ========================================================
  const timelineItems = document.querySelectorAll('.timeline-step-item');
  const alertCallout = document.querySelector('.problem-alert-callout');
  const section2 = document.getElementById('problemTimeline');

  let hasAnimated = false;

  const triggerStepAnimations = () => {
    if (hasAnimated) return;
    hasAnimated = true;

    timelineItems.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add('is-visible');
      }, index * 200); // 200ms delay between each step
    });

    if (alertCallout) {
      setTimeout(() => {
        alertCallout.classList.add('is-visible');
      }, timelineItems.length * 200 + 150);
    }
  };

  // Check using IntersectionObserver
  if ('IntersectionObserver' in window && section2) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          triggerStepAnimations();
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    observer.observe(section2);
  } else {
    // Fallback if observer not supported or immediately visible
    setTimeout(triggerStepAnimations, 300);
  }

  // Interactive Click on Timeline Steps
  timelineItems.forEach((item) => {
    item.addEventListener('click', () => {
      timelineItems.forEach(i => i.classList.remove('timeline-active'));
      item.classList.add('timeline-active');
      
      const node = item.querySelector('.circle-node');
      const card = item.querySelector('.timeline-content-card');
      const tag = item.querySelector('.step-pointer-tag');

      if (node) {
        node.style.transform = 'scale(1.12)';
        setTimeout(() => {
          node.style.transform = '';
        }, 300);
      }

      if (tag) {
        tag.style.transform = 'scale(1.25) translateX(3px)';
        setTimeout(() => {
          tag.style.transform = '';
        }, 300);
      }

      if (card) {
        card.style.transform = 'scale(1.03) translateY(-3px)';
        card.style.boxShadow = '0 12px 30px rgba(63, 107, 69, 0.22)';
        card.style.borderColor = 'rgba(63, 107, 69, 0.5)';
        setTimeout(() => {
          card.style.transform = '';
          card.style.boxShadow = '';
          card.style.borderColor = '';
        }, 350);
      }
    });
  });

  // ========================================================
  // SECTION 8: Form Validation (Exact match to reference)
  // Name: Only letters (no numbers) -> "कृपया केवल अक्षरों में नाम लिखें"
  // Phone: 10 digits starting with 6-9 -> "10 अंकों का सही मोबाइल नंबर डालें (6-9 से शुरू)"
  // ========================================================
  const orderForm = document.getElementById('dentalOrderForm');
  const nameInput = document.getElementById('userName');
  const phoneInput = document.getElementById('userPhone');
  const nameGroup = document.getElementById('nameGroup');
  const phoneGroup = document.getElementById('phoneGroup');

  if (orderForm && nameInput && phoneInput) {
    // Validate Name: only letters (Hindi Devanagari or English) and spaces, length >= 2
    const validateName = () => {
      const val = nameInput.value.trim();
      const nameRegex = /^[A-Za-z\u0900-\u097F\s]{2,50}$/;
      if (!val || !nameRegex.test(val) || /\d/.test(val)) {
        nameGroup.classList.add('has-error');
        return false;
      } else {
        nameGroup.classList.remove('has-error');
        return true;
      }
    };

    // Validate Phone: must be exactly 10 digits starting with 6, 7, 8, or 9
    const validatePhone = () => {
      const val = phoneInput.value.trim();
      const phoneRegex = /^[6-9]\d{9}$/;
      if (!phoneRegex.test(val)) {
        phoneGroup.classList.add('has-error');
        return false;
      } else {
        phoneGroup.classList.remove('has-error');
        return true;
      }
    };

    // Real-time phone numeric filter (prevent non-digits)
    phoneInput.addEventListener('input', () => {
      phoneInput.value = phoneInput.value.replace(/\D/g, '').slice(0, 10);
      if (phoneGroup.classList.contains('has-error')) {
        validatePhone();
      }
    });

    // Real-time name input handler
    nameInput.addEventListener('input', () => {
      if (nameGroup.classList.contains('has-error')) {
        validateName();
      }
    });

    // Validate on blur
    nameInput.addEventListener('blur', () => {
      if (nameInput.value.trim().length > 0) {
        validateName();
      }
    });

    phoneInput.addEventListener('blur', () => {
      if (phoneInput.value.trim().length > 0) {
        validatePhone();
      }
    });

    // On Form Submit
    orderForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const isNameValid = validateName();
      const isPhoneValid = validatePhone();

      if (!isNameValid) {
        nameInput.focus();
        return;
      }

      if (!isPhoneValid) {
        phoneInput.focus();
        return;
      }

      // Populate Thank You Modal
      const enteredName = nameInput.value.trim();
      const enteredPhone = phoneInput.value.trim();
      const randomOrderId = 'DC-' + Math.floor(100000 + Math.random() * 900000);

      const modalCustName = document.getElementById('modalCustName');
      const modalCustPhone = document.getElementById('modalCustPhone');
      const modalOrderId = document.getElementById('modalOrderId');
      const thankyouModal = document.getElementById('thankyouModal');

      if (modalCustName) modalCustName.textContent = enteredName;
      if (modalCustPhone) modalCustPhone.textContent = '+91 ' + enteredPhone;
      if (modalOrderId) modalOrderId.textContent = randomOrderId;

      if (thankyouModal) {
        thankyouModal.classList.add('is-active');
        thankyouModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      }

      orderForm.reset();
      nameGroup.classList.remove('has-error');
      phoneGroup.classList.remove('has-error');
    });
  }

  // ========================================================
  // THANK YOU MODAL CLOSE HANDLERS
  // ========================================================
  const thankyouModal = document.getElementById('thankyouModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalConfirmBtn = document.getElementById('modalConfirmBtn');
  const modalBackdrop = document.getElementById('modalBackdrop');

  const closeModal = () => {
    if (thankyouModal) {
      thankyouModal.classList.remove('is-active');
      thankyouModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  };

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalConfirmBtn) modalConfirmBtn.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && thankyouModal && thankyouModal.classList.contains('is-active')) {
      closeModal();
    }
  });

  // ========================================================
  // SECTION 10: FAQ Accordion Toggle
  // ========================================================
  const faqItems = document.querySelectorAll('.faq-accordion-item');
  faqItems.forEach((item) => {
    const btn = item.querySelector('.faq-question-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        const isCurrentlyActive = item.classList.contains('active');
        // Close other items
        faqItems.forEach((other) => other.classList.remove('active'));
        // Toggle current item
        if (!isCurrentlyActive) {
          item.classList.add('active');
        }
      });
    }
  });
});
