const navLinks = Array.from(document.querySelectorAll(".nav-link"));
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const dialog = document.querySelector(".work-dialog");
const dialogTitle = document.querySelector("#dialog-title");
const dialogText = document.querySelector("#dialog-text");
const closeDialog = document.querySelector(".dialog-close");
const pageVideos = Array.from(document.querySelectorAll("video"));
const analysisCards = Array.from(document.querySelectorAll(".analysis-card"));

const workCopy = {
  "ai-video": {
    title: "AI 生成视频与短剧片段",
    text: "这个作品集中展示了我围绕 AI 短剧内容生产的完整实践：从脚本理解、分镜拆解、Prompt 设计、素材生成，到剪辑包装和成片优化，也体现了我把内容能力延伸到 AI 产品理解和用户体验观察中的方式。"
  }
};

const setActiveLink = () => {
  const midpoint = window.scrollY + window.innerHeight * 0.38;
  let activeId = sections[0]?.id;

  sections.forEach((section) => {
    if (section.offsetTop <= midpoint) {
      activeId = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle("is-active", link.getAttribute("href") === `#${activeId}`);
  });
};

const pauseOtherVideos = (currentVideo) => {
  pageVideos.forEach((video) => {
    if (video !== currentVideo) {
      video.pause();
    }
  });
};

document.querySelectorAll("[data-open]").forEach((button) => {
  button.addEventListener("click", () => {
    const content = workCopy[button.dataset.open];
    if (!content || !dialog) return;

    dialogTitle.textContent = content.title;
    dialogText.textContent = content.text;
    dialog.showModal();
  });
});

closeDialog?.addEventListener("click", () => dialog.close());

dialog?.addEventListener("click", (event) => {
  const rect = dialog.getBoundingClientRect();
  const outside =
    event.clientX < rect.left ||
    event.clientX > rect.right ||
    event.clientY < rect.top ||
    event.clientY > rect.bottom;

  if (outside) {
    dialog.close();
  }
});

pageVideos.forEach((video) => {
  video.addEventListener("play", () => {
    pauseOtherVideos(video);
  });
});

analysisCards.forEach((card) => {
  const toggle = card.querySelector(".analysis-toggle");
  if (!toggle) return;

  toggle.addEventListener("click", () => {
    const shouldOpenAll = !analysisCards.every((item) => {
      const itemToggle = item.querySelector(".analysis-toggle");
      return itemToggle?.getAttribute("aria-expanded") === "true";
    });

    analysisCards.forEach((item) => {
      const itemToggle = item.querySelector(".analysis-toggle");
      const itemPanel = item.querySelector(".analysis-panel");
      if (!itemToggle || !itemPanel) return;

      itemToggle.setAttribute("aria-expanded", shouldOpenAll ? "true" : "false");
      itemPanel.hidden = !shouldOpenAll;
      item.classList.toggle("is-open", shouldOpenAll);
    });
  });
});

window.addEventListener("scroll", setActiveLink, { passive: true });
window.addEventListener("load", setActiveLink);
