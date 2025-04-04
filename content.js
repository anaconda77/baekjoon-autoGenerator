window.addEventListener("load", () => {
    const editor = document.querySelector("textarea"); // 또는 특정 에디터 셀렉터
  
    if (!editor) return;
  
    const replaceClassName = () => {
      const originalCode = editor.value;
      const updatedCode = originalCode.replace(
        /public\s+class\s+(\w+)/,
        "public class Main"
      );
      
      if (originalCode !== updatedCode) {
        editor.value = updatedCode;
        console.log("[AutoReplace] 클래스명을 'Main'으로 변경했습니다.");
      }
    };
  
    // // 최초 진입 시 자동 적용
    // replaceClassName();
  
    // 사용자가 입력하는 경우(Cmd+V로 작동) 실시간 적용하고 싶다면:
    editor.addEventListener("input", replaceClassName);
  });
  