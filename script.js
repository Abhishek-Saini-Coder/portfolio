// Theme Toggle
const themeToggle = document.getElementById('theme-toggle')
const html = document.documentElement

// Check for saved theme preference or use system preference
const savedTheme = localStorage.getItem('theme')
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

if (savedTheme) {
  html.setAttribute('data-theme', savedTheme)
  updateThemeIcon(savedTheme)
} else if (systemPrefersDark) {
  html.setAttribute('data-theme', 'dark')
  updateThemeIcon('dark')
}

// Theme toggle click handler
themeToggle.addEventListener('click', () => {
  const currentTheme = html.getAttribute('data-theme')
  const newTheme = currentTheme === 'light' ? 'dark' : 'light'
  
  html.setAttribute('data-theme', newTheme)
  localStorage.setItem('theme', newTheme)
  updateThemeIcon(newTheme)
})

// Update theme icon
function updateThemeIcon(theme) {
  const icon = themeToggle.querySelector('i')
  icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun'
}

// Experience Slider
const experienceTrack = document.querySelector('.experience-track')
const experiencePrevButton = document.querySelector('.experience-slider .slider-nav.prev')
const experienceNextButton = document.querySelector('.experience-slider .slider-nav.next')
let experienceCurrentPosition = 0
let experienceCardWidth = document.querySelector('.experience-card')?.offsetWidth || 0
const experienceGap = 30 // Gap between cards

function updateExperienceSliderPosition() {
  if (experienceTrack) {
    experienceTrack.style.transform = `translateX(${experienceCurrentPosition}px)`
  }
}

if (experiencePrevButton) {
  experiencePrevButton.addEventListener('click', () => {
    const maxPosition = 0
    experienceCurrentPosition = Math.min(experienceCurrentPosition + experienceCardWidth + experienceGap, maxPosition)
    updateExperienceSliderPosition()
  })
}

if (experienceNextButton) {
  experienceNextButton.addEventListener('click', () => {
    const minPosition = -(experienceCardWidth + experienceGap) * (experienceTrack.children.length - 3)
    experienceCurrentPosition = Math.max(experienceCurrentPosition - experienceCardWidth - experienceGap, minPosition)
    updateExperienceSliderPosition()
  })
}

// Project Slider
const projectTrack = document.querySelector('.project-track')
const projectPrevButton = document.querySelector('.project-slider .slider-nav.prev')
const projectNextButton = document.querySelector('.project-slider .slider-nav.next')
let projectCurrentPosition = 0
let projectCardWidth = document.querySelector('.project-card')?.offsetWidth || 0
const projectGap = 32 // Gap between project cards (2rem = 32px)

function updateProjectSliderPosition() {
  if (projectTrack) {
    projectTrack.style.transform = `translateX(${projectCurrentPosition}px)`
  }
}

if (projectPrevButton) {
  projectPrevButton.addEventListener('click', () => {
    const maxPosition = 0
    projectCurrentPosition = Math.min(projectCurrentPosition + projectCardWidth + projectGap, maxPosition)
    updateProjectSliderPosition()
  })
}

if (projectNextButton) {
  projectNextButton.addEventListener('click', () => {
    const minPosition = -(projectCardWidth + projectGap) * (projectTrack.children.length - 1)
    projectCurrentPosition = Math.max(projectCurrentPosition - projectCardWidth - projectGap, minPosition)
    updateProjectSliderPosition()
  })
}

// Update sliders on window resize
window.addEventListener('resize', () => {
  // Update experience slider
  const newExperienceCardWidth = document.querySelector('.experience-card')?.offsetWidth || 0
  if (newExperienceCardWidth && experienceCardWidth) {
    const experienceScale = newExperienceCardWidth / experienceCardWidth
    experienceCurrentPosition = experienceCurrentPosition * experienceScale
    experienceCardWidth = newExperienceCardWidth
    updateExperienceSliderPosition()
  }
  
  // Update project slider
  const newProjectCardWidth = document.querySelector('.project-card')?.offsetWidth || 0
  if (newProjectCardWidth && projectCardWidth) {
    const projectScale = newProjectCardWidth / projectCardWidth
    projectCurrentPosition = projectCurrentPosition * projectScale
    projectCardWidth = newProjectCardWidth
    updateProjectSliderPosition()
  }
})

// Handle project image loading
document.querySelectorAll('.project-image img').forEach(img => {
  img.addEventListener('load', function() {
    this.classList.add('loaded')
  })

  img.addEventListener('error', function() {
    // Fallback to a placeholder if image fails to load
    this.src = 'https://via.placeholder.com/800x600?text=Project+Preview'
    this.classList.add('loaded')
  })
}) 