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
});
