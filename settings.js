document.addEventListener("DOMContentLoaded", () => {
  // DOM要素
  const themeToggle = document.getElementById("theme-toggle");
  const colorOptions = document.querySelectorAll(".color-option");
  const animationLevel = document.getElementById("animation-level");
  const soundEnabled = document.getElementById("sound-enabled");
  const fortuneStyle = document.getElementById("fortune-style");
  const showLove = document.getElementById("show-love");
  const showMoney = document.getElementById("show-money");
  const showWork = document.getElementById("show-work");
  const showHealth = document.getElementById("show-health");
  const showAdvice = document.getElementById("show-advice");
  const saveButton = document.getElementById("save-settings");

  // テーマ切り替え
  const setTheme = (isDark) => {
    if (isDark) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  // 保存されたテーマを適用
  const savedTheme = localStorage.getItem("theme");
  if (
    savedTheme === "dark" ||
    (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    setTheme(true);
  }

  // テーマ切り替えボタン
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const isDark = document.body.classList.contains("dark");
      setTheme(!isDark);
    });
  }

  // パーティクルの初期化
  if (typeof window.particlesJS !== "undefined") {
    const animationLevel = localStorage.getItem("animationLevel") || "1";

    let particleConfig = {
      particles: {
        number: {
          value: 30,
          density: { enable: true, value_area: 800 },
        },
        color: {
          value: document.body.classList.contains("dark")
            ? "#8b5cf6"
            : "#7c3aed",
        },
        shape: {
          type: "circle",
          stroke: { width: 0, color: "#000000" },
          polygon: { nb_sides: 5 },
        },
        opacity: {
          value: 0.3,
          random: true,
          anim: { enable: true, speed: 0.5, opacity_min: 0.1, sync: false },
        },
        size: {
          value: 3,
          random: true,
          anim: { enable: true, speed: 2, size_min: 0.1, sync: false },
        },
        line_linked: {
          enable: false,
        },
        move: {
          enable: true,
          speed: 1,
          direction: "none",
          random: true,
          straight: false,
          out_mode: "out",
          bounce: false,
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "bubble" },
          onclick: { enable: true, mode: "push" },
          resize: true,
        },
        modes: {
          bubble: {
            distance: 150,
            size: 5,
            duration: 2,
            opacity: 0.8,
            speed: 3,
          },
          push: { particles_nb: 4 },
        },
      },
      retina_detect: true,
    };

    // アニメーションレベルに応じて設定を変更
    if (animationLevel === "0") {
      particleConfig.particles.number.value = 10;
      particleConfig.particles.move.speed = 0.5;
      particleConfig.interactivity.events.onhover.enable = false;
      particleConfig.interactivity.events.onclick.enable = false;
    } else if (animationLevel === "2") {
      particleConfig.particles.number.value = 60;
      particleConfig.particles.move.speed = 2;
      particleConfig.interactivity.modes.push.particles_nb = 8;
    }

    window.particlesJS("particles-js", particleConfig);
  }

  // 設定の読み込み
  const loadSettings = () => {
    // 文字色
    const savedTextColor = localStorage.getItem("textColor") || "inherit";
    colorOptions.forEach((option) => {
      if (option.dataset.color === savedTextColor) {
        option.classList.add("active");
      } else {
        option.classList.remove("active");
      }
    });

    // アニメーションレベル
    if (animationLevel) {
      animationLevel.value = localStorage.getItem("animationLevel") || "1";
    }

    // 効果音
    if (soundEnabled) {
      soundEnabled.checked = localStorage.getItem("soundEnabled") === "true";
    }

    // おみくじスタイル
    if (fortuneStyle) {
      fortuneStyle.value =
        localStorage.getItem("fortuneStyle") || "traditional";
    }

    // 表示項目
    if (showLove)
      showLove.checked = localStorage.getItem("showLove") !== "false";
    if (showMoney)
      showMoney.checked = localStorage.getItem("showMoney") !== "false";
    if (showWork)
      showWork.checked = localStorage.getItem("showWork") !== "false";
    if (showHealth)
      showHealth.checked = localStorage.getItem("showHealth") !== "false";
    if (showAdvice)
      showAdvice.checked = localStorage.getItem("showAdvice") !== "false";
  };

  // 文字色の選択
  colorOptions.forEach((option) => {
    option.addEventListener("click", () => {
      colorOptions.forEach((opt) => opt.classList.remove("active"));
      option.classList.add("active");
    });
  });

  // 設定の保存
  if (saveButton) {
    saveButton.addEventListener("click", () => {
      // 文字色
      const activeColorOption = document.querySelector(".color-option.active");
      if (activeColorOption) {
        localStorage.setItem("textColor", activeColorOption.dataset.color);
      }

      // アニメーションレベル
      if (animationLevel) {
        localStorage.setItem("animationLevel", animationLevel.value);
      }

      // 効果音
      if (soundEnabled) {
        localStorage.setItem("soundEnabled", soundEnabled.checked);
      }

      // おみくじスタイル
      if (fortuneStyle) {
        localStorage.setItem("fortuneStyle", fortuneStyle.value);
      }

      // 表示項目
      if (showLove) localStorage.setItem("showLove", showLove.checked);
      if (showMoney) localStorage.setItem("showMoney", showMoney.checked);
      if (showWork) localStorage.setItem("showWork", showWork.checked);
      if (showHealth) localStorage.setItem("showHealth", showHealth.checked);
      if (showAdvice) localStorage.setItem("showAdvice", showAdvice.checked);

      alert("設定を保存しました！");

      // ホームページに戻る
      window.location.href = "index.html";
    });
  }

  // 設定の読み込み
  loadSettings();
});
