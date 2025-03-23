// 轮播功能
const carousel = (() => {
  const slides = document.querySelectorAll('.carousel-slide');
  const indicators = document.querySelector('.carousel-indicators');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  let currentIndex = 0;
  let autoPlayInterval;

  // 初始化轮播
  function init() {
    createIndicators();
    updateSlide();
    startAutoPlay();
    addEventListeners();
  }

  // 创建指示器
  function createIndicators() {
    slides.forEach((_, index) => {
      const indicator = document.createElement('div');
      indicator.classList.add('indicator');
      if (index === 0) indicator.classList.add('active');
      indicator.addEventListener('click', () => goToSlide(index));
      indicators.appendChild(indicator);
    });
  }

  // 更新幻灯片显示
  function updateSlide() {
    slides.forEach((slide, index) => {
      slide.style.display = index === currentIndex ? 'block' : 'none';
    });
    updateIndicators();
  }

  // 更新指示器状态
  function updateIndicators() {
    const allIndicators = document.querySelectorAll('.indicator');
    allIndicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === currentIndex);
    });
  }

  // 切换到指定幻灯片
  function goToSlide(index) {
    currentIndex = index;
    updateSlide();
  }

  // 上一张
  function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlide();
  }

  // 下一张
  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlide();
  }

  // 自动播放
  function startAutoPlay() {
    autoPlayInterval = setInterval(nextSlide, 5000);
  }

  // 停止自动播放
  function stopAutoPlay() {
    clearInterval(autoPlayInterval);
  }

  // 添加事件监听
  function addEventListeners() {
    prevBtn.addEventListener('click', () => {
      stopAutoPlay();
      prevSlide();
      startAutoPlay();
    });

    nextBtn.addEventListener('click', () => {
      stopAutoPlay();
      nextSlide();
      startAutoPlay();
    });

    // 鼠标悬停时暂停自动播放
    const carousel = document.querySelector('.carousel-container');
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);
  }

  return {
    init
  };
})();

// 初始化轮播
document.addEventListener('DOMContentLoaded', () => {
  carousel.init();
});

// 教育经历时间轴功能
const educationTimeline = (() => {
  const timelineItems = document.querySelectorAll('.timeline-item');
  const timelineContainer = document.querySelector('.timeline-container');

  // 初始化时间轴
  function init() {
    animateTimeline();
    addHoverEffects();
    setupResponsive();
  }

  // 时间轴动画
  function animateTimeline() {
    timelineItems.forEach((item, index) => {
      const delay = index * 300;
      setTimeout(() => {
        item.style.opacity = 1;
        item.style.transform = 'translateX(0)';
      }, delay);
    });
  }

  // 添加悬停效果
  function addHoverEffects() {
    timelineItems.forEach(item => {
      const status = item.querySelector('.status');
      const details = item.querySelector('.school-details');

      if (item.classList.contains('completed')) {
        item.addEventListener('mouseenter', () => {
          details.style.transform = 'scale(1.02)';
          status.style.color = 'var(--accent-color)';
        });

        item.addEventListener('mouseleave', () => {
          details.style.transform = 'scale(1)';
          status.style.color = '#666';
        });
      }
    });
  }

  // 响应式布局设置
  function setupResponsive() {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    handleResponsiveChange(mediaQuery);
    mediaQuery.addEventListener('change', handleResponsiveChange);
  }

  function handleResponsiveChange(mediaQuery) {
    if (mediaQuery.matches) {
      timelineContainer.style.paddingLeft = '20px';
    } else {
      timelineContainer.style.paddingLeft = '0';
    }
  }

  return {
    init
  };
})();

// 初始化时间轴
document.addEventListener('DOMContentLoaded', () => {
  educationTimeline.init();
});
