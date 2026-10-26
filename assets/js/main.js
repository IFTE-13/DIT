document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  /* ==========================================================================
     1. Interactive Tab Switching
     ========================================================================== */
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.content');

  if (tabButtons.length > 0 && tabContents.length > 0) {
    tabButtons.forEach(function (button) {
      button.addEventListener('click', function (event) {
        event.preventDefault();

        // Target content ID from href (e.g., "#content1") or data-target
        const targetId = this.getAttribute('href');
        const targetContent = document.querySelector(targetId);

        if (!targetContent) return;

        // Remove active class from all buttons and contents
        tabButtons.forEach((btn) => btn.classList.remove('active'));
        tabContents.forEach((content) => {
          content.classList.remove('active');
          content.style.display = 'none';
        });

        // Activate selected tab and corresponding panel
        this.classList.add('active');
        targetContent.classList.add('active');
        targetContent.style.display = 'block';
      });
    });
  }

  /* ==========================================================================
     2. Mobile Navbar Auto-Collapse on Link Click
     ========================================================================== */
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  const navbarCollapse = document.querySelector('.navbar-collapse');

  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        // Use Bootstrap collapse if available via jQuery, or simply remove show class
        if (window.jQuery && typeof window.jQuery(navbarCollapse).collapse === 'function') {
          window.jQuery(navbarCollapse).collapse('hide');
        } else {
          navbarCollapse.classList.remove('show');
        }
      }
    });
  });

  /* ==========================================================================
     3. Active Nav Link on Scroll (ScrollSpy)
     ========================================================================== */
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNavLink() {
    const scrollPosition = window.pageYOffset + 120;

    sections.forEach(function (section) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      const matchingLink = document.querySelector(`.navbar-nav a[href="#${sectionId}"]`);

      if (matchingLink) {
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          document.querySelectorAll('.navbar-nav .nav-item').forEach((item) => item.classList.remove('active'));
          matchingLink.parentElement.classList.add('active');
        }
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });

  /* ==========================================================================
     4. Form Submission Handling with Feedback
     ========================================================================== */
  // Free Trial Form in Hero
  const trialForm = document.querySelector('.subscription');
  if (trialForm) {
    trialForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const submitBtn = trialForm.querySelector('.btn-getstarted');
      const originalText = submitBtn ? submitBtn.innerText : 'Get Started';

      if (submitBtn) {
        submitBtn.innerText = 'Creating Account...';
        submitBtn.disabled = true;
      }

      setTimeout(function () {
        alert('Thank you for starting your free trial with DIT! Check your email to confirm your account.');
        trialForm.reset();
        if (submitBtn) {
          submitBtn.innerText = originalText;
          submitBtn.disabled = false;
        }
      }, 700);
    });
  }

  // Contact Form
  const contactForm = document.querySelector('.contact-form');
  const contactFeedback = document.querySelector('.contact-feedback');

  if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const sendBtn = contactForm.querySelector('.btn-send');
      const originalText = sendBtn ? sendBtn.innerText : 'Send Message';

      if (sendBtn) {
        sendBtn.innerText = 'Sending...';
        sendBtn.disabled = true;
      }

      setTimeout(function () {
        if (contactFeedback) {
          contactFeedback.classList.add('success');
          contactFeedback.textContent = 'Thank you! Your message has been sent successfully.';
          contactFeedback.style.display = 'block';
        } else {
          alert('Thank you! Your message has been sent successfully.');
        }

        contactForm.reset();
        if (sendBtn) {
          sendBtn.innerText = originalText;
          sendBtn.disabled = false;
        }

        setTimeout(function () {
          if (contactFeedback) {
            contactFeedback.style.display = 'none';
          }
        }, 5000);
      }, 600);
    });
  }
});