/*  Utility Helper */
function $(id) {
  return document.getElementById(id);
}

/* Contact Form Class */
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

/* Custom Cursor */
const cursor = document.querySelector(".cursor");
document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

/* Navigation Knobs */
document.querySelectorAll(".synth-pad").forEach((pad) => {
  pad.addEventListener("click", () => {
    const target = pad.getAttribute("data-target");
    if (target && document.querySelector(target)) {
      document.querySelector(target).scrollIntoView({ behavior: "smooth" });
    }
  });
});

/*  Init */
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

/* GOOGLE MAPS INTEGRATION */

// Map configuration
const MAP_CONFIG = {
  center: { lat: 53.3498, lng: -6.2603 }, // Dublin, Ireland coordinates
  zoom: 12,
  styles: [
    // Cyberpunk dark theme for the map
    { elementType: "geometry", stylers: [{ color: "#1a1a1a" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#0d0d0d" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#11ff99" }] },
    {
      featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [{ color: "#00d4ff" }]
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [{ color: "#ff2e7a" }]
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{ color: "#0f2621" }]
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#2a2a2a" }]
    },
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [{ color: "#1a1a1a" }]
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [{ color: "#3a3a3a" }]
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#0f2621" }]
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [{ color: "#00d4ff" }]
    }
  ]
};

// Initialize Google Map
function initMap() {
  const mapElement = document.getElementById('google-map');
  
  if (!mapElement) {
    console.log('Map element not found - not on contact page');
    return;
  }

  try {
    // Create the map
    const map = new google.maps.Map(mapElement, {
      center: MAP_CONFIG.center,
      zoom: MAP_CONFIG.zoom,
      styles: MAP_CONFIG.styles,
      disableDefaultUI: false,
      zoomControl: true,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: true
    });

    // Add a custom marker
    const marker = new google.maps.Marker({
      position: MAP_CONFIG.center,
      map: map,
      title: "Dhuta404 - Dublin Base",
      animation: google.maps.Animation.DROP
    });

    // Add info window
    const infoWindow = new google.maps.InfoWindow({
      content: `
        <div style="color: #111; font-family: 'Courier New', monospace; padding: 0.5rem;">
          <h3 style="color: #ff2e7a; font-weight: 900; margin-bottom: 0.5rem;">⚡ DHUTA404</h3>
          <p style="margin: 0.25rem 0;"><strong>Location:</strong> Dublin, Ireland</p>
          <p style="margin: 0.25rem 0;"><strong>Email:</strong> dhuta404@hotmail.com</p>
          <p style="margin: 0.25rem 0;"><strong>Status:</strong> <span style="color: #11ff99;">Available</span></p>
        </div>
      `
    });

    // Open info window on marker click
    marker.addListener('click', () => {
      infoWindow.open(map, marker);
    });

    // Animate marker on hover (simulate with click)
    marker.addListener('mouseover', () => {
      marker.setAnimation(google.maps.Animation.BOUNCE);
      setTimeout(() => marker.setAnimation(null), 750);
    });

    console.log('Google Maps initialized successfully');
  } catch (error) {
    console.error('Error initializing Google Maps:', error);
    mapElement.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: center; height: 100%; background: #1a1a1a; color: var(--neon-pink);">
        <p style="font-weight: 900; font-size: 1.2rem;">⚠ MAP SIGNAL LOST</p>
      </div>
    `;
  }
}

// Make initMap globally available for Google Maps API callback
window.initMap = initMap;

// Initialize map when DOM is ready (only if map element exists)
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('google-map')) {
    // Check if Google Maps API is already loaded
    if (typeof google !== 'undefined' && google.maps) {
      initMap();
    }
  }
});

