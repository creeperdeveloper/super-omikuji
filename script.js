document.addEventListener("DOMContentLoaded", () => {
  // DOM要素
  const themeToggle = document.getElementById("theme-toggle");
  const drawButton = document.getElementById("draw-button");

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

  // おみくじを引くボタン
  if (drawButton) {
    console.log("おみくじボタンが見つかりました");
    drawButton.addEventListener("click", () => {
      console.log("おみくじボタンがクリックされました");
      const omikujiBox = document.getElementById("omikuji-box");
      omikujiBox.classList.add("drawing");

      // 効果音の再生
      const soundEnabled = localStorage.getItem("soundEnabled") === "true";
      if (soundEnabled) {
        const audio = new Audio(
          "https://soundbible.com/grab.php?id=1619&type=mp3"
        );
        audio.volume = 0.3;
        audio.play().catch((e) => console.log("Audio play failed:", e));
      }

      // 2秒後に結果ページへ遷移
      setTimeout(() => {
        // ランダムにおみくじ結果を選択
        const fortunes = getFortuneData();
        const randomIndex = Math.floor(Math.random() * fortunes.length);
        const fortune = fortunes[randomIndex];

        // 結果をローカルストレージに保存
        localStorage.setItem("currentFortune", JSON.stringify(fortune));

        // 結果ページへ遷移
        window.location.href = "result.html";
      }, 2000);
    });
  } else {
    console.log("おみくじボタンが見つかりません");
  }
});

// おみくじデータ
function getFortuneData() {
  return [
    {
      level: "大吉",
      className: "daikichi",
      bgClassName: "bg-daikichi",
      description:
        "素晴らしい運勢です！あなたの努力が実を結び、多くの幸運が訪れるでしょう。積極的に行動することで、さらなる幸運を引き寄せることができます。",
      love: "理想の相手との出会いや、関係の深まりが期待できます。素直な気持ちを伝えましょう。",
      money:
        "予期せぬ収入や、投資の成功が見込めます。ただし浪費には注意しましょう。",
      work: "昇進や評価アップのチャンス！新しいプロジェクトも成功する可能性が高いです。",
      health:
        "健康面も良好です。適度な運動を心がけると、さらに体調が向上するでしょう。",
      advice:
        "チャンスを逃さないよう、アンテナを張り巡らせましょう。今があなたの飛躍のときです。",
      luckyColor: {
        name: "ゴールド",
        code: "#FFD700",
      },
      luckyItem: "鍵",
    },
    {
      level: "中吉",
      className: "chukichi",
      bgClassName: "bg-chukichi",
      description:
        "良い運勢です。努力次第でさらに良い結果につながるでしょう。チャンスを見逃さないよう、アンテナを張っておきましょう。",
      love: "新しい出会いがあるかもしれません。自分から一歩踏み出す勇気を持ちましょう。",
      money:
        "堅実な金運です。計画的な支出を心がければ、徐々に財産が増えていくでしょう。",
      work: "地道な努力が認められる時期です。コツコツと取り組む姿勢が評価されます。",
      health:
        "概ね良好ですが、疲れが溜まりやすい時期です。十分な休息を取りましょう。",
      advice:
        "焦らず着実に進むことが成功への鍵です。日々の小さな進歩を大切にしましょう。",
      luckyColor: {
        name: "シルバー",
        code: "#C0C0C0",
      },
      luckyItem: "本",
    },
    {
      level: "小吉",
      className: "shokichi",
      bgClassName: "bg-shokichi",
      description:
        "まずまずの運勢です。大きな変化はありませんが、日常の小さな幸せを大切にすると良いでしょう。",
      love: "穏やかな関係が続きます。相手の気持ちに寄り添う姿勢が大切です。",
      money: "安定した金運です。無理な買い物は控え、節約を心がけましょう。",
      work: "コツコツと努力を続けることで、徐々に成果が出てきます。焦らず進みましょう。",
      health:
        "特に問題はありませんが、規則正しい生活を心がけると良いでしょう。",
      advice:
        "日常の中の小さな喜びに目を向けることで、心の豊かさを感じられるでしょう。",
      luckyColor: {
        name: "ライトブルー",
        code: "#ADD8E6",
      },
      luckyItem: "ハンカチ",
    },
    {
      level: "吉",
      className: "kichi",
      bgClassName: "bg-kichi",
      description:
        "平穏な運勢です。大きな変化はありませんが、安定した日々を過ごせるでしょう。",
      love: "現状維持の恋愛運です。焦らず自然体でいることが大切です。",
      money: "堅実な金運です。無駄遣いを控えれば問題ありません。",
      work: "日常業務をしっかりこなすことで、信頼を得られるでしょう。",
      health: "健康面は安定していますが、予防を心がけましょう。",
      advice:
        "安定は幸せの基盤です。今の状態に感謝しながら、少しずつ前進しましょう。",
      luckyColor: {
        name: "グリーン",
        code: "#008000",
      },
      luckyItem: "植物",
    },
    {
      level: "末吉",
      className: "suekichi",
      bgClassName: "bg-suekichi",
      description:
        "やや不安定な運勢ですが、慎重に行動すれば問題ありません。物事の優先順位を考えて行動しましょう。",
      love: "誤解が生じやすい時期です。コミュニケーションを大切にしましょう。",
      money: "予期せぬ出費に注意が必要です。計画的な家計管理を心がけましょう。",
      work: "小さなミスに注意しましょう。確認作業を丁寧に行うことが大切です。",
      health: "疲れが溜まりやすい時期です。十分な休息を取りましょう。",
      advice:
        "慎重さが幸運を呼び込みます。急がば回れの精神で物事に取り組みましょう。",
      luckyColor: {
        name: "パープル",
        code: "#800080",
      },
      luckyItem: "腕時計",
    },
    {
      level: "凶",
      className: "kyo",
      bgClassName: "bg-kyo",
      description:
        "やや厳しい運勢ですが、冷静に対処すれば乗り越えられます。慎重な行動を心がけましょう。",
      love: "誤解やすれ違いに注意が必要です。相手の立場に立って考えることが大切です。",
      money:
        "無駄遣いに注意しましょう。衝動買いは控えめにすることをおすすめします。",
      work: "トラブルが発生しやすい時期です。周囲とのコミュニケーションを大切にしましょう。",
      health: "体調を崩しやすい時期です。規則正しい生活を心がけましょう。",
      advice: "困難は成長の機会です。逆境に立ち向かう勇気を持ちましょう。",
      luckyColor: {
        name: "ブラウン",
        code: "#A52A2A",
      },
      luckyItem: "メモ帳",
    },
    {
      level: "大凶",
      className: "daikyo",
      bgClassName: "bg-daikyo",
      description:
        "厳しい運勢ですが、この時期を乗り越えることで大きく成長できるでしょう。慎重に行動し、周囲の助けを借りることも大切です。",
      love: "関係が冷え込みやすい時期です。相手を思いやる気持ちを忘れないようにしましょう。",
      money: "予期せぬ出費に注意が必要です。無理な買い物は控えましょう。",
      work: "困難な状況に直面するかもしれませんが、冷静に対処すれば乗り越えられます。",
      health:
        "体調を崩しやすい時期です。十分な休息と栄養バランスの良い食事を心がけましょう。",
      advice:
        "どんな困難も必ず終わりがあります。今は耐え忍ぶときと考え、内省の時間を大切にしましょう。",
      luckyColor: {
        name: "ホワイト",
        code: "#FFFFFF",
      },
      luckyItem: "お守り",
    },
    {
      level: "超大吉",
      className: "daikichi",
      bgClassName: "bg-daikichi",
      description:
        "絶好調の運勢です！思い切った行動が大きな実りをもたらすでしょう。チャンスを逃さず積極的に行動しましょう。",
      love: "素晴らしい出会いや関係の進展が期待できます。素直な気持ちを伝えましょう。",
      money:
        "臨時収入や昇給のチャンスがあります。将来への投資も吉と出ています。",
      work: "あなたの能力が高く評価される時期です。新しい挑戦も成功するでしょう。",
      health:
        "エネルギッシュに過ごせる時期です。新しい運動習慣を始めるのも良いでしょう。",
      advice:
        "今はあなたの輝く時です。自信を持って前進しましょう。周りの人もあなたを応援しています。",
      luckyColor: {
        name: "レッド",
        code: "#FF0000",
      },
      luckyItem: "ペン",
    },
    {
      level: "特吉",
      className: "chukichi",
      bgClassName: "bg-chukichi",
      description:
        "特別に良い運勢です。今までの努力が実を結び、幸運の波が訪れています。",
      love: "運命的な出会いや、関係の大きな進展が期待できます。積極的に行動しましょう。",
      money:
        "思わぬ臨時収入や、投資の成功が見込めます。ただし浪費は控えましょう。",
      work: "あなたの才能が開花する時期です。新しいアイデアを積極的に提案しましょう。",
      health: "活力に満ちた時期です。新しい趣味や運動を始めるのに最適です。",
      advice:
        "直感を信じて行動することで、さらなる幸運を引き寄せることができるでしょう。",
      luckyColor: {
        name: "オレンジ",
        code: "#FFA500",
      },
      luckyItem: "カバン",
    },
    {
      level: "吉凶混合",
      className: "shokichi",
      bgClassName: "bg-shokichi",
      description:
        "良いことと悪いことが混在する運勢です。物事の両面を見る目を持ちましょう。",
      love: "波乱はありますが、乗り越えることで関係が深まるでしょう。忍耐が大切です。",
      money:
        "収入と支出のバランスに注意が必要です。計画的な家計管理を心がけましょう。",
      work: "困難と成功が交互に訪れる時期です。粘り強く取り組みましょう。",
      health:
        "調子の良い日と悪い日の差が大きいです。体調管理に気を配りましょう。",
      advice:
        "物事には必ず良い面と悪い面があります。バランス感覚を大切にしましょう。",
      luckyColor: {
        name: "イエロー",
        code: "#FFFF00",
      },
      luckyItem: "鈴",
    },
    {
      level: "向上吉",
      className: "kichi",
      bgClassName: "bg-kichi",
      description:
        "徐々に運気が上昇していく運勢です。日々の努力が実を結び始めています。",
      love: "少しずつ関係が深まっていく時期です。焦らず自然な流れに身を任せましょう。",
      money: "堅実に財産が増えていく時期です。コツコツと貯蓄を続けましょう。",
      work: "着実にスキルアップしていく時期です。新しい知識を積極的に吸収しましょう。",
      health: "健康状態が徐々に改善していきます。良い習慣を続けましょう。",
      advice:
        "一歩一歩着実に進むことで、確かな成功を手にすることができるでしょう。",
      luckyColor: {
        name: "ライトグリーン",
        code: "#90EE90",
      },
      luckyItem: "ノート",
    },
    {
      level: "波乱吉",
      className: "suekichi",
      bgClassName: "bg-suekichi",
      description:
        "波乱はあるものの、最終的には良い結果に向かう運勢です。忍耐強く進みましょう。",
      love: "試練を乗り越えることで、より深い絆が生まれるでしょう。誠実さが大切です。",
      money:
        "一時的な困難はありますが、長期的には安定します。計画性を持ちましょう。",
      work: "挫折を経験するかもしれませんが、それが成長につながります。諦めないでください。",
      health:
        "ストレスに注意が必要です。リラックスする時間を意識的に作りましょう。",
      advice: "困難は成功への階段です。逆境に負けない強さを持ちましょう。",
      luckyColor: {
        name: "ターコイズ",
        code: "#40E0D0",
      },
      luckyItem: "地図",
    },
    {
      level: "小凶後吉",
      className: "kyo",
      bgClassName: "bg-kyo",
      description:
        "初めは困難が訪れますが、後半は運気が回復する運勢です。希望を持ち続けましょう。",
      love: "一時的な誤解や離れ離れになる時期があるかもしれませんが、最終的には良い方向に向かいます。",
      money: "予期せぬ出費があるかもしれませんが、後に取り戻せるでしょう。",
      work: "初めは苦労しますが、その経験が後の成功につながります。",
      health: "体調を崩しやすい時期ですが、回復力も高まっています。",
      advice:
        "辛抱強く待つことで、状況は必ず好転します。希望を捨てないでください。",
      luckyColor: {
        name: "ピンク",
        code: "#FFC0CB",
      },
      luckyItem: "手紙",
    },
    {
      level: "平凡",
      className: "kichi",
      bgClassName: "bg-kichi",
      description:
        "特に良くも悪くもない、平穏な運勢です。日常を大切にしましょう。",
      love: "大きな変化はありませんが、安定した関係を築けるでしょう。",
      money:
        "収支のバランスが取れた状態が続きます。無理のない範囲で行動しましょう。",
      work: "日常業務をこなしながら、少しずつスキルアップを目指しましょう。",
      health: "特に問題はありませんが、予防的な健康管理を心がけましょう。",
      advice:
        "平凡な日々の中にこそ、本当の幸せがあります。日常の小さな喜びを大切にしましょう。",
      luckyColor: {
        name: "ベージュ",
        code: "#F5F5DC",
      },
      luckyItem: "カレンダー",
    },
  ];
}
