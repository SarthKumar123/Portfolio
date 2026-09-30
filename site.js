const assets = {
  hero: ["image/webp", ["hero_0.txt", "hero_1.txt", "hero_2.txt"]],
  about: ["image/webp", ["about_0.txt", "about_1.txt", "about_2.txt"]],
  resume: ["application/pdf", ["resume_0.txt", "resume_1.txt"]]
};

async function assetData(name) {
  const [mime, parts] = assets[name];
  const chunks = await Promise.all(
    parts.map(async (part) => {
      const response = await fetch("./" + part);
      if (!response.ok) throw new Error(`Failed to load ${part}`);
      return (await response.text()).trim();
    })
  );
  return `data:${mime};base64,${chunks.join("")}`;
}

(async () => {
  try {
    const [hero, about, resume] = await Promise.all([
      assetData("hero"),
      assetData("about"),
      assetData("resume")
    ]);

    document.querySelectorAll('[data-asset="hero"]').forEach((el) => {
      el.src = hero;
    });

    document.querySelectorAll('[data-asset="about"]').forEach((el) => {
      el.src = about;
    });

    document.querySelectorAll("[data-resume]").forEach((a) => {
      a.href = resume;
      a.download = "Sarth_Kumar_Resume.pdf";
    });
  } catch (error) {
    console.error("Portfolio assets failed to load:", error);
  }
})();

const progress = document.getElementById("progress");
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("navLinks");
const themeBtn = document.getElementById("themeBtn");

window.addEventListener("scroll", () => {
  const d = document.documentElement;
  const max = d.scrollHeight - d.clientHeight;
  progress.style.width = (max ? (d.scrollTop / max) * 100 : 0) + "%";
});

menuBtn.addEventListener("click", () => {
  nav.classList.toggle("open");
  menuBtn.textContent = nav.classList.contains("open") ? "✕" : "☰";
});

nav.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => nav.classList.remove("open"))
);

themeBtn.addEventListener("click", () => {
  document.body.dataset.theme =
    document.body.dataset.theme === "dark" ? "light" : "dark";
});

const obs = new IntersectionObserver(
  (entries) =>
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("is-visible");
    }),
  { threshold: 0.12 }
);

document.querySelectorAll("[data-reveal]").forEach((el) => obs.observe(el));
