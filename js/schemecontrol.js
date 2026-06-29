  const root = document.documentElement;
  const schemeControlButton = document.querySelector(".scheme-control-button");
  const preferredScheme = () => getComputedStyle(root).getPropertyValue("color-scheme");
  schemeControlButton.addEventListener("click", () => {
    root.style.colorScheme = preferredScheme() === "light" ? "dark" : "light";
    localStorage.setItem("scheme_control", preferredScheme());
  } );
  const initSchemeControl = () => root.style.colorScheme = localStorage.getItem("scheme_control") || preferredScheme();

  export { initSchemeControl };
