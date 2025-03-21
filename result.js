document.addEventListener('DOMContentLoaded', () => {
  // DOM要素
  const themeToggle = document.getElementById('theme-toggle');
  const fortuneLevel = document.getElementById('fortune-level');
  const fortuneDescription = document.getElementById('fortune-description');
  const fortuneLove = document.getElementById('fortune-love');
  const fortuneMoney = document.getElementById('fortune-money');
  const fortuneWork = document.getElementById('fortune-work');
  const fortuneHealth = document.getElementById('fortune-health');
  const fortuneAdvice = document.getElementById('fortune-advice');
  const luckyColorBox = document.getElementById('lucky-color-box');
  const luckyColorName = document.getElementById('lucky-color-name');
  const luckyItem = document.getElementById('lucky-item');
  // shareButtonの参照を削除
  
  // テーマ切り替え
  const setTheme = (isDark) => {
    if (isDark) {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  // 保存されたテーマを適用
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    setTheme(true);
  }

  // テーマ切り替えボタン
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = document.body.classList.contains('dark');
      setTheme(!isDark);
    });
  }
  
  // パーティクルの初期化
  if (typeof window.particlesJS !== 'undefined') {
    const animationLevel = localStorage.getItem('animationLevel') || '1';
    
    let particleConfig = {
      particles: {
        number: { 
          value: 30, 
          density: { enable: true, value_area: 800 } 
        },
        color: { 
          value: document.body.classList.contains('dark') ? "#8b5cf6" : "#7c3aed" 
        },
        shape: { 
          type: "circle",
          stroke: { width: 0, color: "#000000" },
          polygon: { nb_sides: 5 }
        },
        opacity: { 
          value: 0.3, 
          random: true,
          anim: { enable: true, speed: 0.5, opacity_min: 0.1, sync: false }
        },
        size: { 
          value: 3, 
          random: true,
          anim: { enable: true, speed: 2, size_min: 0.1, sync: false }
        },
        line_linked: { 
          enable: false 
        },
        move: { 
          enable: true, 
          speed: 1, 
          direction: "none", 
          random: true, 
          straight: false,
          out_mode: "out",
          bounce: false
        }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "bubble" },
          onclick: { enable: true, mode: "push" },
          resize: true
        },
        modes: {
          bubble: { distance: 150, size: 5, duration: 2, opacity: 0.8, speed: 3 },
          push: { particles_nb: 4 }
        }
      },
      retina_detect: true
    };
    
    // アニメーションレベルに応じて設定を変更
    if (animationLevel === '0') {
      particleConfig.particles.number.value = 10;
      particleConfig.particles.move.speed = 0.5;
      particleConfig.interactivity.events.onhover.enable = false;
      particleConfig.interactivity.events.onclick.enable = false;
    } else if (animationLevel === '2') {
      particleConfig.particles.number.value = 60;
      particleConfig.particles.move.speed = 2;
      particleConfig.interactivity.modes.push.particles_nb = 8;
    }
    
    window.particlesJS('particles-js', particleConfig);
  }

  // おみくじ結果の表示
  const displayFortuneResult = () => {
    // ローカルストレージから結果を取得
    const fortuneData = JSON.parse(localStorage.getItem('currentFortune'));
    
    if (!fortuneData) {
      window.location.href = 'index.html';
      return;
    }
    
    // 文字色の設定
    const textColor = localStorage.getItem('textColor') || 'inherit';
    document.querySelectorAll('.fortune-content').forEach(el => {
      el.classList.remove('text-color-rainbow', 'text-color-black', 'text-color-white', 'text-color-yellow', 'text-color-purple', 'text-color-green');
      if (textColor !== 'inherit') {
        el.classList.add(`text-color-${textColor}`);
      }
    });
    
    // 結果の表示
    fortuneLevel.textContent = fortuneData.level;
    fortuneLevel.className = fortuneData.className;
    fortuneDescription.textContent = fortuneData.description;
    
    // 表示項目の設定
    const showLove = localStorage.getItem('showLove') !== 'false';
    const showMoney = localStorage.getItem('showMoney') !== 'false';
    const showWork = localStorage.getItem('showWork') !== 'false';
    const showHealth = localStorage.getItem('showHealth') !== 'false';
    const showAdvice = localStorage.getItem('showAdvice') !== 'false';
    
    document.querySelector('.fortune-details').style.display = 
      (showLove || showMoney || showWork || showHealth) ? 'grid' : 'none';
    
    if (showLove) {
      fortuneLove.parentElement.style.display = 'block';
      fortuneLove.textContent = fortuneData.love;
    } else {
      fortuneLove.parentElement.style.display = 'none';
    }
    
    if (showMoney) {
      fortuneMoney.parentElement.style.display = 'block';
      fortuneMoney.textContent = fortuneData.money;
    } else {
      fortuneMoney.parentElement.style.display = 'none';
    }
    
    if (showWork) {
      fortuneWork.parentElement.style.display = 'block';
      fortuneWork.textContent = fortuneData.work;
    } else {
      fortuneWork.parentElement.style.display = 'none';
    }
    
    if (showHealth) {
      fortuneHealth.parentElement.style.display = 'block';
      fortuneHealth.textContent = fortuneData.health;
    } else {
      fortuneHealth.parentElement.style.display = 'none';
    }
    
    if (showAdvice) {
      document.querySelector('.fortune-advice').style.display = 'block';
      fortuneAdvice.textContent = fortuneData.advice;
    } else {
      document.querySelector('.fortune-advice').style.display = 'none';
    }
    
    // ラッキーカラーとアイテム
    luckyColorBox.style.backgroundColor = fortuneData.luckyColor.code;
    luckyColorName.textContent = fortuneData.luckyColor.name;
    luckyItem.textContent = fortuneData.luckyItem;
    
    // 紙吹雪の表示（大吉と超大吉の場合）
    if (fortuneData.level === '大吉' || fortuneData.level === '超大吉') {
      setTimeout(() => {
        const confetti = window.confetti;
        if (typeof confetti !== 'undefined') {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
        }
      }, 500);
    }
    
    // 結果カードのスタイル
    document.querySelector('.fortune-paper').classList.add(fortuneData.bgClassName);
  };
  
  // シェアボタンのコードを削除
  
  // 結果の表示
  displayFortuneResult();
});
