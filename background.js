// chrome.webNavigation.onCompleted.addListener(async (details) => {
//     const { tabId, frameId, url } = details;
  
//     if (!url.includes("https://www.acmicpc.net/submit/")) return;
  
//     console.log("🧩 submit 페이지 로딩 완료 – 프레임 ID:", frameId);
  
//     await chrome.scripting.executeScript({
//       target: { tabId, frameIds: [frameId] },
//       func: () => {
//         console.log("✅ iframe 내부에서 실행됨!");
//         console.log("window.CodeMirror:", window.CodeMirror);
  
//         if (!window.CodeMirror) return;
  
//         const original = window.CodeMirror.fromTextArea;
//         window.CodeMirror.fromTextArea = function (...args) {
//           const cm = original.apply(this, args);
//           const textarea = args[0];
  
//           if (textarea.id === "source") {
//             console.log("🎯 CodeMirror 인스턴스 후킹 성공!");
  
//             setTimeout(() => {
//               const originalCode = cm.getValue();
//               const updatedCode = originalCode.replace(
//                 /public\\s+class\\s+\\w+/,
//                 "public class Main"
//               );
//               if (originalCode !== updatedCode) {
//                 cm.setValue(updatedCode);
//                 console.log("✅ 클래스명을 'Main'으로 변경 완료!");
//               }
//             }, 300);
//           }
  
//           return cm;
//         };
  
//         console.log("🚀 CodeMirror 후킹 완료");
//       },
//     });
//   }, {
//     url: [{ hostContains: "acmicpc.net" }]
//   });
  