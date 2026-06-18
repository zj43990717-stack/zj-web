const navLinks = Array.from(document.querySelectorAll(".nav-link"));
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const dialog = document.querySelector(".work-dialog");
const dialogTitle = document.querySelector("#dialog-title");
const dialogText = document.querySelector("#dialog-text");
const closeDialog = document.querySelector(".dialog-close");
const videoStack = document.querySelector(".video-stack");
const videoItems = Array.from(document.querySelectorAll(".video-stage video"));
const videoDots = Array.from(document.querySelectorAll(".video-dot"));
const videoPrev = document.querySelector("[data-video-prev]");
const videoNext = document.querySelector("[data-video-next]");
const pageVideos = Array.from(document.querySelectorAll("video"));
let activeVideoIndex = 0;

const workCopy = {
  "ai-video": {
    title: "AI 生成视频与短剧片段",
    text: "这个系列集中呈现我在 AI 视频生成和短剧片段制作中的完整链路能力：从脚本理解、分镜拆解、Prompt 设计、素材生成，到剪辑包装和成片优化，也体现了我对模板沉淀、内容结构和用户使用场景的理解。"
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

const updateVideoStack = (nextIndex) => {
  if (!videoItems.length) return;

  activeVideoIndex = (nextIndex + videoItems.length) % videoItems.length;

  videoItems.forEach((video, index) => {
    video.classList.remove("is-active", "is-next", "is-back");
    video.pause();

    const offset = (index - activeVideoIndex + videoItems.length) % videoItems.length;
    if (offset === 0) {
      video.classList.add("is-active");
      video.removeAttribute("tabindex");
    } else if (offset === 1) {
      video.classList.add("is-next");
      video.setAttribute("tabindex", "-1");
    } else {
      video.classList.add("is-back");
      video.setAttribute("tabindex", "-1");
    }
  });

  videoDots.forEach((dot, index) => {
    dot.classList.toggle("is-active", index === activeVideoIndex);
  });
};

const shiftVideo = (direction) => {
  updateVideoStack(activeVideoIndex + direction);
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

videoPrev?.addEventListener("click", () => shiftVideo(-1));
videoNext?.addEventListener("click", () => shiftVideo(1));

videoDots.forEach((dot) => {
  dot.addEventListener("click", () => {
    updateVideoStack(Number(dot.dataset.videoIndex));
  });
});

pageVideos.forEach((video) => {
  video.addEventListener("play", () => {
    pauseOtherVideos(video);
  });
});

window.addEventListener("scroll", setActiveLink, { passive: true });
window.addEventListener("load", () => {
  setActiveLink();
  updateVideoStack(0);
});
