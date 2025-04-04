console.log("[확장] content.js 실행됨 - 미니멀 변환기");

let helperBox = null;

function createMinimalHelperUI() {
  if (helperBox) return;

  helperBox = document.createElement("div");
  helperBox.style.position = "fixed";
    helperBox.style.top = "260px"; // ✅ 약간 더 아래로 내림
    helperBox.style.right = "20px";
    helperBox.style.zIndex = "9999";
    helperBox.style.padding = "8px 12px";
    helperBox.style.background = "#ffffff";
    helperBox.style.border = "1px solid #dcdcdc";
    helperBox.style.borderRadius = "6px";
    helperBox.style.boxShadow = "0 1px 6px rgba(0, 0, 0, 0.1)";
    helperBox.style.fontFamily = "'Segoe UI', 'Malgun Gothic', sans-serif";
    helperBox.style.display = "flex";
    helperBox.style.alignItems = "center";
    helperBox.style.gap = "8px";
    helperBox.style.width = "300px";


  helperBox.innerHTML = `
    <textarea id="java-helper-input" rows="1" placeholder="코드 붙여넣기"
      style="font-family: monospace; font-size: 12px; padding: 6px; width: 240px; height: 30px;
             border: 1px solid #ccc; border-radius: 4px; resize: none; overflow: hidden;"></textarea>
    <button id="copy-btn"
      style="padding: 6px 12px; font-size: 13px; background: rgb(95, 144, 200); color: white;
             border: none; border-radius: 4px; cursor: pointer;">변환 + 복사</button>
    <button id="close-helper"
      style="background: none; border: none; font-size: 16px; cursor: pointer;">❌</button>
  `;

  document.body.appendChild(helperBox);

  const textarea = document.getElementById("java-helper-input");
  const copyBtn = document.getElementById("copy-btn");
  const closeBtn = document.getElementById("close-helper");

  copyBtn.addEventListener("click", () => {
    const original = textarea.value;
    const updated = original.replace(/public\s+class\s+\w+/, "public class Main");

    if (original !== updated) {
      textarea.value = updated;
      console.log("✅ 클래스명 'Main'으로 자동 변환 완료");
    }

    textarea.select();
    document.execCommand("copy");
    // alert("📋 변환된 코드가 복사되었습니다!");
  });

  closeBtn.addEventListener("click", () => {
    helperBox.remove();
    helperBox = null;
    console.log("🧹 변환기 창 닫힘");
  });
}

function watchLanguageChange() {
  const target = document.querySelector("#language_chosen .chosen-single span");

  if (!target) {
    console.log("❌ 언어 선택 요소를 찾지 못함");
    return;
  }

  let prev = target.textContent;

  const observer = new MutationObserver(() => {
    const curr = target.textContent.trim();
    if (curr !== prev) {
      prev = curr;
      console.log("🌐 언어 변경:", curr);

      if (curr.includes("Java 11")) {
        createMinimalHelperUI();
      } else if (helperBox) {
        helperBox.remove();
        helperBox = null;
        console.log("🧹 Java 11 아님 – 창 숨김");
      }
    }
  });

  observer.observe(target, { characterData: true, childList: true, subtree: true });

  // 진입 시도 Java 11이면 바로 실행
  if (target.textContent.trim().includes("Java 11")) {
    createMinimalHelperUI();
  }
}

window.addEventListener("load", () => {
  setTimeout(watchLanguageChange, 1000);
});
