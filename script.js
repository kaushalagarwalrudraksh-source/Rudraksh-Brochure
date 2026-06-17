const states = [
  {
    key: "cover",
    layout: "single",
    label: "Front cover",
    button: "Open brochure",
    panels: ["assets/side-1-panel-3.jpg"]
  },
  {
    key: "first-open",
    layout: "two",
    label: "First fold opened",
    button: "Continue",
    panels: ["assets/side-2-panel-1.jpg", "assets/side-1-panel-1.jpg"]
  },
  {
    key: "inside",
    layout: "full",
    label: "Inside spread",
    button: "Flip brochure",
    panels: ["assets/side-2-panel-1.jpg", "assets/side-2-panel-2.jpg", "assets/side-2-panel-3.jpg"]
  },
  {
    key: "back",
    layout: "full",
    label: "Back side with Get in touch",
    button: "Close brochure",
    panels: ["assets/side-1-panel-1.jpg", "assets/side-1-panel-2.jpg", "assets/side-1-panel-3.jpg"]
  }
];

const stage = document.querySelector(".stage");
const brochure = document.querySelector(".brochure");
const panels = [...document.querySelectorAll(".panel")];
const label = document.querySelector(".state-label");
const dots = [...document.querySelectorAll(".dot")];
const toggle = document.querySelector("[data-action='toggle']");
let index = 0;

function setState(nextIndex) {
  index = (nextIndex + states.length) % states.length;
  const state = states[index];
  stage.dataset.state = state.key;
  brochure.dataset.layout = state.layout;
  label.textContent = state.label;
  toggle.textContent = state.button;
  panels.forEach((panel, panelIndex) => {
    const image = state.panels[panelIndex] || state.panels[state.panels.length - 1];
    panel.style.backgroundImage = `url("${image}")`;
  });
  dots.forEach((dot, dotIndex) => dot.classList.toggle("active", dotIndex === index));
}

document.querySelector("[data-action='prev']").addEventListener("click", () => setState(index - 1));
document.querySelector("[data-action='next']").addEventListener("click", () => setState(index + 1));
toggle.addEventListener("click", () => setState(index === states.length - 1 ? 0 : index + 1));
brochure.addEventListener("click", () => setState(index === states.length - 1 ? 0 : index + 1));

window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight" || event.key === " ") {
    event.preventDefault();
    setState(index + 1);
  }
  if (event.key === "ArrowLeft") {
    event.preventDefault();
    setState(index - 1);
  }
});

setState(0);
