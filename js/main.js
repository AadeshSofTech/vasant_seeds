// Vision Seeds - Main JavaScript

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
});

// Testimonials Carousel
class TestimonialCarousel {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.testimonial-slide');
        this.totalSlides = this.slides.length;

        if (this.totalSlides > 0) {
            this.init();
        }
    }

    init() {
        // Show first slide
        this.showSlide(0);

        // Auto advance slides every 5 seconds
        setInterval(() => this.nextSlide(), 5000);
    }

    showSlide(index) {
        // Hide all slides
        this.slides.forEach(slide => {
            slide.style.display = 'none';
        });

        // Show current slide
        this.slides[index].style.display = 'block';
        this.currentSlide = index;
    }

    nextSlide() {
        let next = this.currentSlide + 1;
        if (next >= this.totalSlides) {
            next = 0;
        }
        this.showSlide(next);
    }

    prevSlide() {
        let prev = this.currentSlide - 1;
        if (prev < 0) {
            prev = this.totalSlides - 1;
        }
        this.showSlide(prev);
    }
}

// Initialize carousel if testimonials exist
if (document.querySelector('.testimonial-slide')) {
    new TestimonialCarousel();
}

// Product Inquiry Form
function handleInquiryForm(event) {
    event.preventDefault();

    // Get form data
    const form = event.target;
    const formData = new FormData(form);

    // In a real application, this would send data to a server
    console.log('Form submitted:', Object.fromEntries(formData));

    // Show success message
    alert('Thank you for your inquiry! We will contact you soon.');
    form.reset();
}

// Add form submit handler if inquiry form exists
const inquiryForm = document.querySelector('.inquiry-form');
if (inquiryForm) {
    inquiryForm.addEventListener('submit', handleInquiryForm);
}

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Scroll to Top Button
const scrollTopBtn = document.querySelector('.scroll-top');
if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Product Image Modal
function initProductModals() {
    const productImages = document.querySelectorAll('.product-image');
    const modal = document.querySelector('.image-modal');
    const modalImg = document.querySelector('.modal-image');
    const closeBtn = document.querySelector('.modal-close');

    if (!modal || !modalImg || !closeBtn) return;

    productImages.forEach(img => {
        img.addEventListener('click', () => {
            modal.style.display = 'block';
            modalImg.src = img.src;
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Initialize product modals if they exist
if (document.querySelector('.product-image')) {
    initProductModals();
}

// Product Slideshow
class ProductSlideshow {
    constructor(container) {
        this.container = container;
        this.slides = container.querySelectorAll('.slide');
        this.prevBtn = container.querySelector('.prev-btn');
        this.nextBtn = container.querySelector('.next-btn');
        this.currentSlide = 0;
        this.totalSlides = this.slides.length;

        this.init();
    }

    init() {
        if (this.totalSlides <= 1) {
            this.prevBtn.style.display = 'none';
            this.nextBtn.style.display = 'none';
            return;
        }

        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());

        // Auto advance slides every 5 seconds
        setInterval(() => this.nextSlide(), 5000);
    }

    showSlide(index) {
        this.slides[this.currentSlide].classList.remove('active');
        this.currentSlide = index;
        if (this.currentSlide >= this.totalSlides) {
            this.currentSlide = 0;
        } else if (this.currentSlide < 0) {
            this.currentSlide = this.totalSlides - 1;
        }
        this.slides[this.currentSlide].classList.add('active');
    }

    nextSlide() {
        this.showSlide(this.currentSlide + 1);
    }

    prevSlide() {
        this.showSlide(this.currentSlide - 1);
    }
}

// Initialize all product slideshows
document.addEventListener('DOMContentLoaded', function () {
    const slideshows = document.querySelectorAll('.product-slideshow');
    slideshows.forEach(slideshow => new ProductSlideshow(slideshow));

    // Handle product parameter in URL for contact form
    const urlParams = new URLSearchParams(window.location.search);
    const product = urlParams.get('product');
    if (product) {
        const productInput = document.querySelector('#productName');
        if (productInput) {
            productInput.value = product;
        }
    }
});