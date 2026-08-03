// Umami custom event helper — no-ops if script isn't loaded
export function track(event, data) {
  window.umami?.track(event, data);
}
