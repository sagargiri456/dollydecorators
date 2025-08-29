// Add this script for the counter animation on the stats
document.addEventListener('DOMContentLoaded', function() {
  const stats = document.querySelectorAll('.stat__number');
  const speed = 200; // The lower the slower
  
  stats.forEach(stat => {
    const target = parseInt(stat.getAttribute('data-count'));
    let count = 0;
    
    const updateCount = () => {
      const increment = Math.ceil(target / speed);
      
      if (count < target) {
        count += increment;
        if (count > target) count = target;
        stat.textContent = count;
        setTimeout(updateCount, 1);
      } else {
        stat.textContent = target;
      }
    };
    
    // Create an intersection observer to trigger the counter when element is in view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          updateCount();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(stat);
  });
});

// Mobile Navigation Functionality
document.addEventListener('DOMContentLoaded', function() {
  const mobileToggle = document.querySelector('.nav__mobile-toggle');
  const navLinks = document.querySelector('.nav__links');
  const navLinksItems = document.querySelectorAll('.nav__links a');
  
  // Toggle mobile menu
  mobileToggle.addEventListener('click', function() {
    mobileToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.classList.toggle('nav-open');
  });
  
  // Close mobile menu when clicking on a link
  navLinksItems.forEach(link => {
    link.addEventListener('click', function() {
      mobileToggle.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.classList.remove('nav-open');
    });
  });
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', function(e) {
    if (!mobileToggle.contains(e.target) && !navLinks.contains(e.target)) {
      mobileToggle.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.classList.remove('nav-open');
    }
  });
  
  // Smooth scrolling for navigation links
  navLinksItems.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          const headerHeight = document.querySelector('.nav').offsetHeight;
          const targetPosition = targetElement.offsetTop - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
  
  // Hide mobile menu on window resize
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
      mobileToggle.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.classList.remove('nav-open');
    }
  });
});

// Work Gallery Filter Functionality
document.addEventListener('DOMContentLoaded', function() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const workItems = document.querySelectorAll('.work-item');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const filter = this.getAttribute('data-filter');
      
      // Remove active class from all buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      // Add active class to clicked button
      this.classList.add('active');
      
      // Filter work items
      workItems.forEach(item => {
        const category = item.getAttribute('data-category');
        
        if (filter === 'all' || category === filter) {
          item.style.display = 'block';
          item.style.animation = 'fadeIn 0.5s ease-in-out';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
});

// Add fadeIn animation for work items
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  body.nav-open {
    overflow: hidden;
  }
`;
document.head.appendChild(style);