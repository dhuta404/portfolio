/* =========================================
   Utility Helper
   ========================================= */
function $(id) {
  return document.getElementById(id);
}

/* =========================================
   Contact Form Class
   ========================================= */
class ContactForm {
  constructor(formId) {
    this.form = $(formId);
    this.name = $("name");
    this.email = $("email");
    this.subject = $("subject");
    this.message = $("message");

    this.attachEvents();
  }

  attachEvents() {
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.handleSubmit();
    });
  }

  validate() {
    let errors = [];

    if (this.name.value.trim().length < 2) {
      errors.push("Name must be at least 2 characters.");
    }
    if (!this.email.value.includes("@")) {
      errors.push("Email must contain '@'.");
    }
    if (this.subject.value === "") {
      errors.push("Please select a subject category.");
    }
    if (this.message.value.trim().length < 10) {
      errors.push("Message must be at least 10 characters.");
    }

    return errors;
  }

  handleSubmit() {
    // Remove old messages
    document.querySelectorAll(".error, .confirmation").forEach((el) => el.remove());

    const errors = this.validate();

    if (errors.length > 0) {
      errors.forEach((err) => {
        const p = document.createElement("p");
        p.className = "error";
        p.style.color = "var(--neon-pink)";
        p.textContent = err;
        this.form.appendChild(p);
      });
    } else {
      // Confirmation message
      const confirmation = document.createElement("p");
      confirmation.className = "confirmation";
      confirmation.style.color = "var(--neon-green)";
      confirmation.style.fontWeight = "900";
      confirmation.style.marginTop = "1rem";
      confirmation.textContent = "✅ Signal transmitted successfully!";
      this.form.appendChild(confirmation);

      // Reset form
      this.form.reset();
    }
  }
}

/* =========================================
   Custom Cursor
   ========================================= */
const cursor = document.querySelector(".cursor");
document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

/* =========================================
   Navigation Knobs
   ========================================= */
document.querySelectorAll(".synth-pad").forEach((pad) => {
  pad.addEventListener("click", () => {
    const target = pad.getAttribute("data-target");
    if (target && document.querySelector(target)) {
      document.querySelector(target).scrollIntoView({ behavior: "smooth" });
    }
  });
});

/* =========================================
   Init
   ========================================= */
document.addEventListener("DOMContentLoaded", () => {
  new ContactForm("contact-form");
});
// Add glitch effect to headline on hover
const headline = document.querySelector('.headline');
let glitchInterval;

headline.addEventListener('mouseenter', () => {
  const originalText = headline.textContent;
  let glitchCount = 0;
  
  glitchInterval = setInterval(() => {
    if (glitchCount < 6) {
      headline.textContent = originalText
        .split('')
        .map(char => {
          if (Math.random() > 0.8) {
            const chars = ['█', '▓', '▒', '░', '▀', '▄', '■', '□'];
            return chars[Math.floor(Math.random() * chars.length)];
          }
          return char;
        })
        .join('');
      glitchCount++;
    } else {
      headline.textContent = originalText;
      clearInterval(glitchInterval);
    }
  }, 60);
});

headline.addEventListener('mouseleave', () => {
  clearInterval(glitchInterval);
  headline.textContent = 'NEW MEDIA ART';
});

// Random scan line speed variation
const scanLines = document.querySelectorAll('.scan-lines');
scanLines.forEach(line => {
  const randomDuration = 6 + Math.random() * 4; // 6-10 seconds
  line.style.animationDuration = `${randomDuration}s`;
});

// Tag hover sound effect simulation (visual feedback)
const tags = document.querySelectorAll('.tag');
tags.forEach(tag => {
  tag.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Create brief flash effect
    const flash = document.createElement('div');
    flash.style.position = 'fixed';
    flash.style.top = '0';
    flash.style.left = '0';
    flash.style.width = '100vw';
    flash.style.height = '100vh';
    flash.style.background = 'rgba(0, 212, 255, 0.1)';
    flash.style.pointerEvents = 'none';
    flash.style.opacity = '1';
    flash.style.transition = 'opacity 0.2s ease';
    flash.style.zIndex = '9999';
    
    document.body.appendChild(flash);
    
    setTimeout(() => {
      flash.style.opacity = '0';
    }, 10);
    
    setTimeout(() => {
      flash.remove();
    }, 200);
  });
});