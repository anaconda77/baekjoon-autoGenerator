console.log("[확장] content.js 실행됨 - 백준 스타일 변환기");

function createCodeHelperUI() {
  const helperBox = document.createElement("div");
  helperBox.style.position = "fixed";
  helperBox.style.bottom = "20px";
  helperBox.style.left = "20px"; // 좌측 하단!
  helperBox.style.zIndex = "9999";
  helperBox.style.padding = "16px";
  helperBox.style.background = "#ffffff";
  helperBox.style.border = "1px solid #dcdcdc";
  helperBox.style.borderRadius = "8px";
  helperBox.style.boxShadow = "0 2px 12px rgba(0, 0, 0, 0.08)";
  helperBox.style.fontFamily = "'Segoe UI', 'Malgun Gothic', sans-serif";
  helperBox.style.width = "420px";

  helperBox.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
      <strong style="font-size: 14px;">클래스명 자동 변환기</strong>
      <button id="close-helper" style="border: none; background: none; font-size: 16px; cursor: pointer;">❌</button>
    </div>
    <textarea id="java-helper-input" rows="10" placeholder="여기에 코드를 붙여넣으세요" 
      style="font-family: 'Courier New', monospace; font-size: 13px; white-space: pre; padding: 10px; width: 100%; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; resize: vertical;"></textarea>
    <div style="margin-top: 10px; display: flex; justify-content: flex-end; gap: 8px;">
      <button id="replace-btn" style="padding: 6px 12px; border: 1px solid #ccc; border-radius: 4px; background: #f8f8f8; cursor: pointer;">변환</button>
      <button id="copy-btn" style="padding: 6px 12px; border: 1px solid #ccc; border-radius: 4px; background: #e2eaff; color: #0047ab; font-weight: 500; cursor: pointer;">복사</button>
    </div>
  `;

  document.body.appendChild(helperBox);

  const textarea = document.getElementById("java-helper-input");
  const replaceBtn = document.getElementById("replace-btn");
  const copyBtn = document.getElementById("copy-btn");
  const closeBtn = document.getElementById("close-helper");

  replaceBtn.addEventListener("click", () => {
    const original = textarea.value;
    const updated = original.replace(/public\s+class\s+\w+/, "public class Main");

    if (original !== updated) {
      textarea.value = updated;
      console.log("✅ 클래스명이 'Main'으로 변경되었습니다.");
    } else {
      console.log("ℹ️ 변경할 클래스명이 없습니다.");
    }
  });

  copyBtn.addEventListener("click", () => {
    textarea.select();
    document.execCommand("copy");
  });

  closeBtn.addEventListener("click", () => {
    helperBox.remove();
    console.log("🧹 코드 도우미 UI가 닫혔습니다.");
  });
}

window.addEventListener("load", () => {
  setTimeout(createCodeHelperUI, 1000);
});
