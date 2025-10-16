// かすみ薬局 共通JavaScript

// DOMコンテンツ読み込み完了後に実行
document.addEventListener('DOMContentLoaded', function() {
  
  console.log('JavaScript loaded');
  
  // セキュリティ対策: 外部リンクの安全な処理
  secureExternalLinks();
  
  // 現在のページのナビゲーションをアクティブに
  setActiveNavigation();
  
  // スクロールアニメーション
  initScrollAnimation();
  
  // トップに戻るボタン
  initBackToTop();
  
  // ハンバーガーメニュー
  initMobileMenu();
  
  // キーボードアクセシビリティ
  initKeyboardAccessibility();
  
  // スムーススクロール
  initSmoothScroll();
  
});

// ハンバーガーメニュー
function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav');
  
  console.log('Menu toggle:', menuToggle);
  console.log('Nav:', nav);
  
  if (!menuToggle || !nav) {
    console.error('Menu elements not found');
    return;
  }
  
  // メニュートグルボタンのクリック
  menuToggle.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('Menu toggle clicked');
    
    const isActive = nav.classList.contains('active');
    
    if (isActive) {
      // メニューを閉じる
      closeMenu();
    } else {
      // メニューを開く
      openMenu();
    }
    
    console.log('Menu active:', nav.classList.contains('active'));
  });
  
  // メニューを開く関数
  function openMenu() {
    nav.classList.add('active');
    menuToggle.setAttribute('aria-expanded', 'true');
    menuToggle.setAttribute('aria-label', 'メニューを閉じる');
    document.body.style.overflow = 'hidden';
    
    // アイコンをXに変更
    const spans = menuToggle.querySelectorAll('span');
    spans[0].style.transform = 'rotate(45deg) translateY(9px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translateY(-9px)';
  }
  
  // メニューを閉じる関数
  function closeMenu() {
    nav.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'メニューを開く');
    document.body.style.overflow = '';
    
    // アイコンをリセット
    const spans = menuToggle.querySelectorAll('span');
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
  }
  
  // メニューリンクをクリックしたらメニューを閉じる
  const navLinks = nav.querySelectorAll('a');
  navLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      closeMenu();
    });
  });
  
  // メニュー外をクリックしたらメニューを閉じる
  document.addEventListener('click', function(e) {
    if (nav.classList.contains('active') && 
        !nav.contains(e.target) && 
        !menuToggle.contains(e.target)) {
      closeMenu();
    }
  });
}

// 外部リンクのセキュリティ対策
function secureExternalLinks() {
  const links = document.querySelectorAll('a[href^="http"]');
  links.forEach(function(link) {
    try {
      const url = new URL(link.href);
      if (url.hostname !== window.location.hostname) {
        link.setAttribute('rel', 'noopener noreferrer');
        link.setAttribute('target', '_blank');
      }
    } catch (e) {
      console.error('Invalid URL:', link.href);
    }
  });
}

// キーボードアクセシビリティの向上
function initKeyboardAccessibility() {
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      const nav = document.querySelector('nav');
      const menuToggle = document.querySelector('.menu-toggle');
      if (nav && nav.classList.contains('active')) {
        nav.classList.remove('active');
        document.body.style.overflow = '';
        if (menuToggle) {
          menuToggle.setAttribute('aria-expanded', 'false');
          menuToggle.setAttribute('aria-label', 'メニューを開く');
          menuToggle.focus();
          
          const spans = menuToggle.querySelectorAll('span');
          spans[0].style.transform = 'none';
          spans[1].style.opacity = '1';
          spans[2].style.transform = 'none';
        }
      }
    }
  });
}

// 現在のページのナビゲーションをアクティブに設定
function setActiveNavigation() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('nav a');
  
  navLinks.forEach(function(link) {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });
}

// スクロールアニメーション
function initScrollAnimation() {
  const sections = document.querySelectorAll('section');
  
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);
  
  sections.forEach(function(section) {
    observer.observe(section);
  });
}

// トップに戻るボタン
function initBackToTop() {
  let backToTopButton = document.querySelector('.back-to-top');
  
  if (!backToTopButton) {
    const button = document.createElement('button');
    button.className = 'back-to-top';
    button.innerHTML = '↑';
    button.setAttribute('aria-label', 'ページトップに戻る');
    button.setAttribute('type', 'button');
    document.body.appendChild(button);
    backToTopButton = button;
  }
  
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add('visible');
    } else {
      backToTopButton.classList.remove('visible');
    }
  });
  
  backToTopButton.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// スムーススクロール（アンカーリンク用）
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href !== '') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const offsetTop = target.offsetTop - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
          target.setAttribute('tabindex', '-1');
          target.focus();
        }
      }
    });
  });
}

// フォームのセキュリティ対策（XSS防止）
function sanitizeInput(input) {
  const div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML;
}

// エラーハンドリング
window.addEventListener('error', function(e) {
  console.error('エラーが発生しました:', e.message);
});

// パフォーマンス監視
if ('PerformanceObserver' in window) {
  const perfObserver = new PerformanceObserver(function(list) {
    for (const entry of list.getEntries()) {
      if (entry.duration > 100) {
        console.warn(`パフォーマンス警告: ${entry.name} が ${entry.duration}ms かかりました`);
      }
    }
  });
  
  try {
    perfObserver.observe({ entryTypes: ['measure', 'navigation'] });
  } catch (e) {
    // サポートされていない場合は無視
  }
}
